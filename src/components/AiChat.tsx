"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Sparkles, Trash2 } from "lucide-react";
import { useChat } from "@/lib/ChatContext";

const STORAGE_KEY = "infocob-chat";
const MAX_HISTORY = 6;
const RATE_LIMIT_MS = 3000;
const COOLDOWN_MS = 60000;
const VISITOR_MAX_REQUESTS = 12;
const VISITOR_WINDOW_MS = 60000;

const SYSTEM_PROMPT = `Sos Daniel Cobos, dueño de INFOCOB Computación (Talca, Chile, desde 2008). Atendés el chat personalmente. Sos vendedor senior, tirando a veterano — vas directo, sin vueltas, sin verborrea. Tus respuestas son de 1-2 líneas, como cuando un cliente entra a tu local y le decís las cosas claras. No redacteés párrafos. Siempre en español de Chile.

PERSONALIDAD: Callejero, serio, resolutivo. No preguntás "cómo estás", preguntás "¿qué necesitás?". Si el cliente no sabe, lo orientás con preguntas cortas. Olvidate de los textos bonitos. Acá se vende con hechos, no con adornos.

VENTA CONSULTIVA (SPIN): Escuchás el problema, hacés sentir la urgencia sin exagerar, y mostrás el valor de resolverlo. ("O sea, ¿llevás 5 años sin página web y te contactan por Facebook nomás? Está bien, pero pensá cuántos clientes no te encuentran. Un sitio te soluciona eso.")

FAB: No digas "tiene SEO" (feature). Decí "con SEO aparecés en Google cuando alguien busca tu rubro en Talca" (beneficio).

CHALLENGER SALE: Si el cliente no sabe lo que necesita, enseñale. ("Mirá, la mayoría parte con la página básica, pero a las 2 semanas se dan cuenta que necesitan más secciones y terminan migrando al plan profesional. Mejor empezá por ese.") Tomá control de la conversación.

SNAP: Simple. Valioso. Alineado. Prioritario. ("Dame 5 minutos y te explico en simple qué opciones tenés.")

UPSELLING + CROSS-SELLING: Si te piden sitio web, ofrecé hosting + dominio incluido (va en el precio). Si te preguntan por chatbot, preguntales si el sitio web también necesitan actualizarlo. Si piden plan básico, tirales: "por 50 lucas más al mes te llevás el profesional con SEO y prioridad". Siempre ofrecé la mejora como un paso lógico, no como presión.

YES SET: Meté preguntas de acuerdo natural. ("¿Te interesa que tu negocio aparezca en Google? ¿Te gustaría recibir consultas desde la web sin tener que contestar cada una?") Una vez que dice sí tres veces, el cuarto sí es más fácil.

ANCLAJE + CIERRE: Dato el precio alto primero ("el profesional sale $500.000"). Después el básico suena barato. Siempre cerrá con paso concreto: "¿Te mando un presupuesto por WhatsApp?", "¿Agendamos una llamada conmigo mañana a las 11?".

URGENCIA + PRUEBA SOCIAL: "Tengo cupo para un proyecto más este mes". "17 años en el rubro, todos mis clientes han quedado contentos".

PRECIOS: Sitio web desde $500.000 (profesional) o $250.000 (básico). E-commerce desde $800.000. IA chatbot desde $300.000. Tiempo: 1 a 3 semanas. Hosting + dominio gratis primer año en todos los planes.

COBERTURA: Talca, Maule, remoto todo Chile.

WhatsApp: +56 9 8286 4145. Email: dcobosm@gmail.com.

OFERTA DE AUDITORÍA: Si el usuario menciona que YA TIENE un sitio web, ofrecé la auditoría gratuita de INFOCOB. ("¿Querés que evaluemos qué tan bien está funcionando? Tenemos una herramienta gratuita que analiza diseño, velocidad, SEO y más. Te da un puntaje y te dice qué mejorar.") Si muestra interés, decile que entre a infocob.cl/auditoria o decile "buscá Auditoría en el menú del sitio".

IMPORTANTE: Nunca escribas más de 2 líneas salvo que el cliente pida detalle. Si no sabés algo, decí "mejor hablalo conmigo al WhatsApp y te explico bien". Siempre buscá que el próximo paso sea concreto: presupuesto, llamada, WhatsApp, auditoría. No dejes la conversación abierta. Si sentís que el cliente pierde interés, soltale un cierre directo: "¿Te sirve que te mande un presupuesto y lo ves tranquilo?"`;

type Message = { role: "user" | "model"; text: string };

type ProviderDef = {
  name: string;
  key: string | undefined;
  model: string;
  cooldownUntil: number;
};

const providers: ProviderDef[] = [
  { name: "Gemini", key: process.env.NEXT_PUBLIC_GEMINI_API_KEY, model: "gemini-2.0-flash", cooldownUntil: 0 },
  { name: "Groq", key: process.env.NEXT_PUBLIC_GROQ_API_KEY, model: "llama-3.3-70b-versatile", cooldownUntil: 0 },
  { name: "OpenRouter", key: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY, model: "meta-llama/llama-3.1-8b-instruct:free", cooldownUntil: 0 },
];

async function callGemini(messages: { role: string; text: string }[], key: string, model: string) {
  const contents = messages.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(key)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
      }),
    }
  );
  if (res.status === 429) return { ok: false as const, rateLimited: true };
  if (!res.ok) return { ok: false as const, error: `Error ${res.status}: ${(await res.text()).slice(0, 200)}` };
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return { ok: false as const, error: "Respuesta vacía de Gemini" };
  return { ok: true as const, text };
}

async function callGroq(messages: { role: string; text: string }[], key: string, model: string) {
  const msgs = [{ role: "system" as const, content: SYSTEM_PROMPT }, ...messages.map((m) => ({ role: m.role === "model" ? "assistant" : "user", content: m.text }))];
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages: msgs, temperature: 0.7, max_tokens: 512 }),
  });
  if (res.status === 429) return { ok: false as const, rateLimited: true };
  if (!res.ok) return { ok: false as const, error: `Error ${res.status}: ${(await res.text()).slice(0, 200)}` };
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) return { ok: false as const, error: "Respuesta vacía de Groq" };
  return { ok: true as const, text };
}

async function callOpenRouter(messages: { role: string; text: string }[], key: string, model: string) {
  const msgs = [{ role: "system" as const, content: SYSTEM_PROMPT }, ...messages.map((m) => ({ role: m.role === "model" ? "assistant" : "user", content: m.text }))];
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: { "Authorization": `Bearer ${key}`, "Content-Type": "application/json", "HTTP-Referer": "https://superdandi.github.io", "X-Title": "INFOCOB" },
    body: JSON.stringify({ model, messages: msgs, temperature: 0.7, max_tokens: 512 }),
  });
  if (res.status === 429) return { ok: false as const, rateLimited: true };
  if (!res.ok) return { ok: false as const, error: `Error ${res.status}: ${(await res.text()).slice(0, 200)}` };
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) return { ok: false as const, error: "Respuesta vacía de OpenRouter" };
  return { ok: true as const, text };
}

const providerCalls: Record<string, typeof callGemini> = { Gemini: callGemini, Groq: callGroq, OpenRouter: callOpenRouter };

export default function AiChat() {
  const { open, setOpen } = useChat();
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const lastReq = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);
  const visitorTimestamps = useRef<number[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = setInterval(() => {
      const now = Date.now();
      const next: Record<string, number> = {};
      for (const p of providers) {
        if (p.key && p.cooldownUntil > now) next[p.name] = p.cooldownUntil - now;
      }
      setCooldowns(next);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setConversation(JSON.parse(saved));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(conversation)); } catch { /* ignore */ }
  }, [conversation, loaded]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, setOpen]);

  function clearChat() {
    setConversation([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    if (Date.now() - lastReq.current < RATE_LIMIT_MS) {
      setError("Esperá un momento antes de enviar otro mensaje.");
      return;
    }

    const now = Date.now();
    visitorTimestamps.current = visitorTimestamps.current.filter((t) => now - t < VISITOR_WINDOW_MS);
    if (visitorTimestamps.current.length >= VISITOR_MAX_REQUESTS) {
      setError(`Límite de ${VISITOR_MAX_REQUESTS} mensajes por minuto. Esperá o recargá la página.`);
      setConversation((prev) => [...prev, { role: "model", text: `Enviaste muchos mensajes seguidos. Esperá un momento o recargá la página para seguir.` }]);
      return;
    }
    visitorTimestamps.current.push(now);
    setInput("");
    setError(null);
    setActiveProvider(null);
    const userMsg: Message = { role: "user", text };
    const updatedConv = [...conversation, userMsg];
    setConversation(updatedConv);
    setLoading(true);

    const tail = updatedConv.slice(-MAX_HISTORY * 2);
    const msgs = tail.map((m) => ({ role: m.role, text: m.text }));

    const active = providers.filter((p) => p.key && now >= p.cooldownUntil);

    if (active.length === 0) {
      setError("Todos los proveedores están en enfriamiento. Esperá un momento.");
      setConversation((prev) => [...prev, { role: "model", text: "Todos los servicios están temporalmente sobrecargados. Esperá un minuto o contactame directo por WhatsApp." }]);
      setLoading(false);
      return;
    }

    lastReq.current = now;
    let reply: string | null = null;

    for (const prov of active) {
      setActiveProvider(prov.name);
      const call = providerCalls[prov.name];
      const result = await call(msgs, prov.key!, prov.model);
      if (result.ok) { reply = result.text; break; }
      if (result.rateLimited) {
        prov.cooldownUntil = now + COOLDOWN_MS;
        continue;
      }
      setError(result.error ?? `Error en ${prov.name}`);
      prov.cooldownUntil = now + COOLDOWN_MS;
    }

    if (reply) {
      setConversation((prev) => [...prev, { role: "model", text: reply }]);
    } else {
      setConversation((prev) => [...prev, { role: "model", text: "Los servicios están temporalmente sobrecargados. Esperá un momento o contactame directo por WhatsApp." }]);
    }
    setActiveProvider(null);
    setLoading(false);
  }, [input, loading, conversation]);

  const displayMessages: Message[] = [
    { role: "model", text: "👋 ¡Hola! Soy el asistente virtual de INFOCOB. Preguntame sobre desarrollo web, chatbots con IA, productos digitales o cualquier servicio." },
    ...conversation,
  ];

  const hasKey = providers.some((p) => p.key);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div
        ref={panelRef}
        className="w-[640px] max-w-[92vw] h-[85vh] max-h-[750px] glass-card border border-border/50 shadow-2xl shadow-black/40 rounded-2xl flex flex-col overflow-hidden animate-scale-in"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
              <Sparkles size={16} className="text-accent" />
            </div>
            <div>
              <span className="font-heading font-semibold text-sm text-text">Asistente INFOCOB</span>
              <div className="text-[10px] text-text-muted/50 leading-tight">Impulsado por IA · Daniel Cobos</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {conversation.length > 0 && (
              <button onClick={clearChat} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition" title="Limpiar conversación">
                <Trash2 size={15} />
              </button>
            )}
            <button onClick={() => setOpen(false)} className="p-2 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 px-5 py-2 border-b border-border/30 bg-white/[0.02]">
          {providers.filter((p) => p.key).map((p) => {
            const cd = cooldowns[p.name];
            const isActive = activeProvider === p.name;
            const available = !cd;
            return (
              <div key={p.name} className="flex items-center gap-1.5 text-[10px]">
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-accent animate-pulse" : available ? "bg-green-400" : "bg-red-400"}`} />
                <span className={`font-medium ${isActive ? "text-accent" : available ? "text-green-300/70" : "text-red-300/60"}`}>{p.name}</span>
                <span className="text-text-muted/40">{p.model.split("-").slice(0, 2).join(".")}</span>
                {!!cd && <span className="text-red-300/50">{Math.ceil(cd / 1000)}s</span>}
              </div>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ minHeight: 0 }}>
          {displayMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-accent text-bg" : "bg-white/5 text-text border border-border/30"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-border/30 px-4 py-2.5 rounded-2xl text-sm">
                <span className="text-text-muted">{activeProvider ? `${activeProvider}: ` : ""}Escribiendo</span>
                <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>.</span>
                <span className="animate-pulse" style={{ animationDelay: "0.9s" }}>.</span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border/50 p-4">
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={hasKey ? "Escribí tu mensaje..." : "API key no configurada"}
              disabled={!hasKey}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-border text-text placeholder:text-text-muted/30 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || !hasKey}
              className="px-4 py-2.5 rounded-xl bg-accent text-bg hover:brightness-110 disabled:opacity-40 transition-all"
            >
              <Send size={16} />
            </button>
          </form>
          {error && (
            <details className="mt-2">
              <summary className="text-[10px] text-red-400/60 cursor-pointer">Error</summary>
              <pre className="text-[9px] text-red-400/80 mt-1 px-1 whitespace-pre-wrap break-all max-h-24 overflow-y-auto">{error}</pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}
