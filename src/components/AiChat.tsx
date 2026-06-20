"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Sparkles, Trash2 } from "lucide-react";

const STORAGE_KEY = "infocob-chat";
const MAX_HISTORY = 2;
const RATE_LIMIT_MS = 3000;
const COOLDOWN_MS = 60000;

const SYSTEM_PROMPT = `Eres el asistente virtual de INFOCOB Computación, empresa fundada por Daniel Cobos en Talca, Chile, desde 2008. Respondes preguntas sobre sus servicios. Sos directo, amable, y respondés siempre en español. Tu objetivo es ayudar al visitante y convertirlo en lead.

SERVICIOS:
- Desarrollo Web: sitios modernos, landing pages, e-commerce. Desde $250.000 (básico) hasta $500.000+ (profesional). Incluye hosting y dominio el primer año.
- Integración de IA: chatbots, asistentes virtuales, automatización de procesos.
- Productos Digitales: plataformas web, APIs, sistemas de gestión, PWAs.
- Consultoría Técnica: arquitectura web, migraciones, SEO técnico.
- Soporte Técnico: mantención de sitios, soporte informático presencial y remoto.

COBERTURA: Talca y Región del Maule. También trabajo remoto para todo Chile.

Si preguntan por precios, da siempre rangos: sitios web desde $250.000, profesionales desde $500.000, e-commerce desde $800.000. Si preguntan por tiempo de desarrollo: entre 1 y 3 semanas. Si es algo muy específico o quiere contratar, decile que Daniel atiende personalmente y puede contactarlo por WhatsApp al +56 9 8286 4145 o al email dcobosm@gmail.com.

IMPORTANTE: Respondé solo preguntas relacionadas a INFOCOB y sus servicios. Si algo no lo sabés, decí que se comunique con Daniel directamente.`;

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

const providerCalls: Record<string, typeof callGemini> = { Gemini: callGemini, Groq: callGroq };

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const [cooldowns, setCooldowns] = useState<Record<string, number>>({});
  const lastReq = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

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
    setInput("");
    setError(null);
    setActiveProvider(null);
    const userMsg: Message = { role: "user", text };
    const updatedConv = [...conversation, userMsg];
    setConversation(updatedConv);
    setLoading(true);

    const tail = updatedConv.slice(-MAX_HISTORY * 2);
    const msgs = tail.map((m) => ({ role: m.role, text: m.text }));

    const now = Date.now();
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

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-[100] w-[360px] max-[400px]:right-2 max-[400px]:w-[calc(100%-16px)] glass-card shadow-2xl shadow-black/30 animate-fade-in overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 120px)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <span className="font-heading font-semibold text-sm text-text">Asistente INFOCOB</span>
            </div>
            <div className="flex items-center gap-1">
              {conversation.length > 0 && (
                <button onClick={clearChat} className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition" title="Limpiar conversación">
                  <Trash2 size={14} />
                </button>
              )}
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition">
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-1.5 border-b border-border/30 bg-white/[0.02]">
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

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {displayMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] px-3.5 py-2 rounded-xl text-sm leading-relaxed ${msg.role === "user" ? "bg-accent text-bg" : "bg-white/5 text-text border border-border/50"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-border/50 px-3.5 py-2 rounded-xl text-sm">
                  <span className="text-text-muted">{activeProvider ? `${activeProvider}: ` : ""}Escribiendo</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.9s" }}>.</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-3">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={hasKey ? "Escribí tu mensaje..." : "API key no configurada"}
                disabled={!hasKey}
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-border text-text placeholder:text-text-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || !hasKey}
                className="p-2 rounded-xl bg-accent text-bg hover:brightness-110 disabled:opacity-40 transition-all"
              >
                <Send size={16} />
              </button>
            </form>
            {error && (
              <details className="mt-1.5">
                <summary className="text-[10px] text-red-400/60 cursor-pointer">Error</summary>
                <pre className="text-[9px] text-red-400/80 mt-1 px-1 whitespace-pre-wrap break-all max-h-24 overflow-y-auto">{error}</pre>
              </details>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[100] flex items-center justify-center w-14 h-14 rounded-full bg-accent text-bg shadow-lg shadow-accent/25 hover:scale-110 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 animate-fade-in"
        aria-label="Abrir chat"
      >
        <MessageCircle size={24} />
      </button>
    </>
  );
}
