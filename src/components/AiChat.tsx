"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODELS = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-1.5-pro"];
const API_VERSIONS = ["v1", "v1beta"];

const SYSTEM_PROMPT = `Eres el asistente virtual de INFOCOB Computación, empresa fundada por Daniel Cobos en Talca, Chile, desde 2008. Respondes preguntas sobre sus servicios. Sos directo, amable, y respondés siempre en español. Tu objetivo es ayudar al visitante y convertirlo en lead.

SERVICIOS:
- Desarrollo Web: sitios modernos, landing pages, e-commerce. Desde $250.000 (básico) hasta $500.000+ (profesional). Incluye hosting y dominio el primer año.
- Integración de IA: chatbots, asistentes virtuales, automatización de procesos.
- Productos Digitales: plataformas web, APIs, sistemas de gestión, PWAs.
- Consultoría Técnica: arquitectura web, migraciones, SEO técnico.
- Soporte Técnico: mantención de sitios, soporte informático presencial y remoto.

COBERTURA: Talca y Región del Maule. También trabajo remoto para todo Chile.

Si preguntan por precios, da siempre rangos: sitios web desde $250.000, profesionales desde $500.000, e-commerce desde $800.000.
Si preguntan por tiempo de desarrollo: entre 1 y 3 semanas.
Si es algo muy específico o quiere contratar, decile que Daniel atiende personalmente y puede contactarlo por WhatsApp al +56 9 8286 4145 o al email dcobosm@gmail.com.

IMPORTANTE: Respondé solo preguntas relacionadas a INFOCOB y sus servicios. Si algo no lo sabés, decí que se comunique con Daniel directamente.`;

const RATE_LIMIT_MS = 3000;

type Message = {
  role: "user" | "model";
  text: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastReq = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const now = Date.now();
    if (now - lastReq.current < RATE_LIMIT_MS) {
      setError("Esperá un momento antes de enviar otro mensaje.");
      return;
    }
    setInput("");
    setError(null);
    const userMsg: Message = { role: "user", text };
    const updatedConv = [...conversation, userMsg];
    setConversation(updatedConv);
    setLoading(true);

    try {
      const isFirstTurn = conversation.length === 0;
      let contents: { role: string; parts: { text: string }[] }[];

      if (isFirstTurn) {
        contents = [
          { role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n${text}` }] },
        ];
      } else {
        contents = updatedConv.map((m, i) => ({
          role: m.role,
          parts: [{ text: i === 0 ? `${SYSTEM_PROMPT}\n\n---\n\n${m.text}` : m.text }],
        }));
      }

      let data: { candidates?: { content?: { parts?: { text?: string }[] } }[] } | null = null;
      let lastErr: string | null = null;
      const body = JSON.stringify({ contents, generationConfig: { temperature: 0.7, maxOutputTokens: 512 } });

      for (const version of API_VERSIONS) {
        for (const model of MODELS) {
          for (const method of ["generateContent", "streamGenerateContent"]) {
            lastReq.current = Date.now();
            const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:${method}?key=${encodeURIComponent(API_KEY!)}`;
            const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body });

            if (res.ok) {
              const text = await res.text();
              try {
                data = JSON.parse(text);
              } catch {
                lastErr = `Modelo "${model}" respondió sin JSON`;
                continue;
              }
              break;
            }
            const errBody = await res.text();
            lastErr = `${version}/${model}:${method} → ${res.status}: ${errBody.slice(0, 150)}`;
          }
          if (data) break;
        }
        if (data) break;
      }

      if (!data) {
        throw new Error(lastErr ?? "Todos los modelos fallaron");
      }
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!reply) throw new Error("Respuesta vacía de Gemini");
      setConversation((prev) => [...prev, { role: "model", text: reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error desconocido";
      console.error("[AiChat]", msg);
      setError(msg);
      setConversation((prev) => [
        ...prev,
        { role: "model", text: msg.startsWith("Límite") || msg.startsWith("Error 429")
          ? "El servicio está temporalmente sobrecargado. Esperá un momento y probá de nuevo, o contactame directo por WhatsApp."
          : "Ocurrió un error. Probá de nuevo o escribime a WhatsApp al +56 9 8286 4145." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const displayMessages: Message[] = [
    { role: "model", text: "👋 ¡Hola! Soy el asistente virtual de INFOCOB. Preguntame sobre desarrollo web, chatbots con IA, productos digitales o cualquier servicio." },
    ...conversation,
  ];

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-[100] w-[360px] max-[400px]:right-2 max-[400px]:w-[calc(100%-16px)] glass-card shadow-2xl shadow-black/30 animate-fade-in overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 120px)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <span className="font-heading font-semibold text-sm text-text">Asistente INFOCOB</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg text-text-muted hover:text-text hover:bg-white/5 transition"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            {displayMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-bg"
                      : "bg-white/5 text-text border border-border/50"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-border/50 px-3.5 py-2 rounded-xl text-sm text-text-muted">
                  <span>Escribiendo</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>.</span>
                  <span className="animate-pulse" style={{ animationDelay: "0.9s" }}>.</span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-3">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={API_KEY ? "Escribí tu mensaje..." : "API key no configurada"}
                disabled={!API_KEY}
                className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-border text-text placeholder:text-text-muted/40 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 disabled:opacity-40"
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || !API_KEY}
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
