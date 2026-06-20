"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash";

const SYSTEM_PROMPT = `Eres el asistente virtual de INFOCOB Computación, empresa fundada por Daniel Cobos en Talca, Chile, desde 2008. Respondes preguntas sobre sus servicios. Sos directo, amable, y respondés siempre en español. Tu objetivo es ayudar al visitante y convertirlo en lead.

SERVICIOS:
- Desarrollo Web: sitios modernos, landing pages, e-commerce. Desde $250.000 (básico) hasta $500.000+ (profesional). Incluye hosting y dominio el primer año.
- Integración de IA: chatbots, asistentes virtuales, automatización de procesos.
- Productos Digitales: plataformas web, APIs, sistemas de gestión, PWAs.
- Consultoría Técnica: arquitectura web, migraciones, SEO técnico.
- Soporte Técnico: mantención de sitios, soporte informático presencial y remoto.

COBERTURA: Talca y Región del Maule. También trabajo remoto para todo Chile.

Si preguntan por precios, d siempre rangos: sitios web desde $250.000, profesionales desde $500.000, e-commerce desde $800.000.

Si preguntan por tiempo de desarrollo: entre 1 y 3 semanas.

Si es algo muy específico o quiere contratar, decile que Daniel atiende personalmente y puede contactarlo por WhatsApp al +56 9 8286 4145 o al email dcobosm@gmail.com.

IMPORTANTE: Respondé solo preguntas relacionadas a INFOCOB y sus servicios. Si algo no lo sabés, decí que te comuniques con Daniel directamente.`;

type Message = {
  role: "user" | "model";
  text: string;
};

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "👋 ¡Hola! Soy el asistente virtual de INFOCOB. Preguntame sobre desarrollo web, chatbots con IA, productos digitales o cualquier servicio." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    try {
      const history = [...messages, { role: "user" as const, text }];
      const contents = [
        { role: "user" as const, parts: [{ text: SYSTEM_PROMPT }] },
        ...history.map((m) => ({
          role: m.role as "user" | "model",
          parts: [{ text: m.text }],
        })),
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 512,
              topP: 0.9,
            },
          }),
        }
      );

      if (!res.ok) {
        const errBody = await res.text();
        throw new Error(`Gemini API error: ${res.status} — ${errBody}`);
      }

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Lo siento, no pude procesar tu consulta. ¿Podrías repetirla o contactar directamente a Daniel por WhatsApp?";
      setMessages((prev) => [...prev, { role: "model", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Ocurrió un error al procesar tu mensaje. Por favor intentá de nuevo o contactame directo por WhatsApp al +56 9 8286 4145." },
      ]);
    } finally {
      setLoading(false);
    }
  }

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
            {messages.map((msg, i) => (
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
                  <span className="animate-pulse">Escribiendo</span>
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
