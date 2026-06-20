# Manual de implementación: Chatbot en INFOCOB

## Contexto

El REVIEW.md identifica el chatbot en el sitio como la mejora #1 de mayor impacto. No solo atiende visitantes, sino que **demuestra que sabes hacerlo** — es tu propia vitrina tecnológica.

---

## Opciones evaluadas

| Opción | Tipo | Costo | Widget UI | Automatización | Offline/IA | Privacidad |
|--------|------|-------|-----------|----------------|------------|------------|
| **Crisp** (⭐ recomendada) | SaaS | Gratis (2 agentes) | Excelente | Reglas + KB | Chatbot básico incluido | UE hosts |
| **tawk.to** | SaaS | Gratis ∞ | Aceptable | Triggers + KB | Chatbot básico | USA hosts |
| **transformers.js** | On-device | $0 (CDN) | Tú la armas | Ilimitada | IA real en navegador | 100% local |

---

## Recomendación principal: Crisp

**Por qué Crisp gana para INFOCOB:**

1. **Widget limpio y moderno** — no desentona con el diseño glass-premium del sitio. tawk.to se siente de 2015.
2. **Gratis para 2 agentes** — sos solo vos, sobra.
3. **Reglas de automatización sin código** — podés configurar respuestas automáticas para horarios fuera de oficina, saludar con un mensaje personalizado, derivar a WhatsApp si no hay nadie disponible.
4. **Knowledge Base integrada** — podés cargar artículos ("¿Cuánto cuesta un sitio web?", "¿Qué incluye el hosting?") y Crisp los sugiere automáticamente al visitante.
5. **Mobile apps** — atendés desde el celular si es necesario.
6. **Hosting en UE** — mejor para cumplir con regulaciones de datos.

### Limitaciones de Crisp gratis
- El chatbot "Crisp AI" avanzado (resPUESTAS con IA generativa) es de pago (~€15/mes).
- Las reglas automáticas y KB son gratuitas y cubren el 80% de los casos.

---

## Arquitectura propuesta

```
Visitante → Widget Crisp flotante
                │
                ├── Horario laboral → Mensaje personalizado + opciones rápidas
                │                        │
                │                        └── "Cotizar sitio web" → prefill + enlace WhatsApp
                │                        └── "Ver servicios" → enlace /servicios
                │                        └── "Hablar con Daniel" → te notifica
                │
                └── Fuera de horario → Captura de email + "Te escribimos mañana"
                                         │
                                         └── Opcional: derivar a WhatsApp con mensaje automático
```

---

## Implementación paso a paso (Crisp)

### 1. Crear cuenta en Crisp

1. Ir a https://crisp.chat
2. Registrar con email (`dcobosm@gmail.com` o el que uses para INFOCOB)
3. Verificar email
4. Elegir plan **Free** (no requiere tarjeta)

### 2. Obtener Website ID

1. Dashboard → Website Settings → **Website ID**
2. Es un string como `"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"`
3. Copiarlo para el paso siguiente

### 3. Componente React para Crisp

Crear `src/components/ChatWidget.tsx`:

```tsx
"use client";

import { useEffect } from "react";

const CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

declare global {
  interface Window {
    $crisp: unknown[];
    CRISP_WEBSITE_ID: string | undefined;
  }
}

export default function ChatWidget() {
  useEffect(() => {
    if (!CRISP_WEBSITE_ID || window.$crisp) return;

    window.$crisp = [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script and reset
      document.querySelectorAll('script[src="https://client.crisp.chat/l.js"]')
        .forEach((el) => el.remove());
      delete window.$crisp;
      delete window.CRISP_WEBSITE_ID;
    };
  }, []);

  return null;
}
```

### 4. Integrar en layout.tsx

Agregar `<ChatWidget />` antes del cierre de `</body>` (o dentro del provider tree):

```tsx
// src/app/layout.tsx
import ChatWidget from "@/components/ChatWidget";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <TranslationsProvider>
          <ThemeProvider>
            {children}
            <ChatWidget />
          </ThemeProvider>
        </TranslationsProvider>
      </body>
    </html>
  );
}
```

### 5. Variable de entorno

Crear `.env.local` (para dev) y agregar a GitHub Secrets (para prod):

```
NEXT_PUBLIC_CRISP_WEBSITE_ID=tu-website-id-aqui
```

No olvidar agregar al workflow de GitHub Actions como variable de entorno.

### 6. Configurar reglas automáticas en Crisp Dashboard

Una vez conectado, desde el dashboard de Crisp:

1. **Mensaje de bienvenida**:
   - Settings → Chatbox → Auto-messages → Welcome message
   - Texto sugerido: *"👋 Hola, soy Daniel de INFOCOB. ¿En qué puedo ayudarte? Puedo contarte sobre nuestros servicios de desarrollo web, chatbots con IA o productos digitales."*

2. **Opciones rápidas (Suggested Articles)**:
   - Activar "Suggest articles from Knowledge Base"
   - Crear artículos en Knowledge Base (ver sección siguiente)

3. **Fuera de horario**:
   - Settings → Availability → "Out of hours" → activar
   - Mensaje: *"Estoy fuera del horario laboral, pero déjame tu consulta y te respondo en la mañana. También puedes escribirme directo a WhatsApp."*
   - Activar captura de email

4. **Integración WhatsApp**:
   - Settings → Chatbox → Auto-messages → Triggers
   - Crear trigger: si el visitante escribe "whatsapp" o "urgencia" → mostrar enlace a WhatsApp

### 7. Knowledge Base (FAQ automático)

Desde el dashboard: Website Settings → Knowledge Base

Artículos sugeridos para crear:

| Artículo | Contenido breve |
|----------|----------------|
| **¿Cuánto cuesta un sitio web?** | Desde $250.000 (básico) hasta $500.000 (profesional). Incluye hosting y dominio el primer año. |
| **¿Qué incluye el hosting?** | Hosting rápido, SSL gratuito, copias de seguridad, soporte técnico. |
| **¿Hacen chatbots con IA?** | Sí, integramos chatbots inteligentes a tu web o WhatsApp. Consulta por tu caso. |
| **¿Cuánto tiempo toma desarrollar un sitio?** | Entre 1 y 3 semanas, depende de la complejidad. |
| **Zona de cobertura** | Talca y toda la Región del Maule. También trabajo remoto para todo Chile. |

Cada artículo puede tener 1-2 párrafos + enlace a la página de servicios correspondiente.

---

## Alternativa económica: tawk.to

Si preferís algo 100% gratuito sin límite de agentes (aunque seas solo vos):

### Setup
1. Registrar en https://tawk.to
2. Obtener el código snippet del dashboard
3. Mismo patrón de componente React que Crisp, cambiando el script URL y las variables

### Componente tawk.to

```tsx
"use client";

import { useEffect } from "react";

const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID;
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID;

declare global {
  interface Window {
    Tawk_API?: unknown;
    Tawk_LoadStart?: Date;
  }
}

export default function TawkWidget() {
  useEffect(() => {
    if (!TAWK_PROPERTY_ID || !TAWK_WIDGET_ID || window.Tawk_API) return;

    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);
  }, []);

  return null;
}
```

### Pros de tawk.to
- 100% gratuito, agentes ilimitados
- Built-in knowledge base
- Chat triggers automáticos
- Mobile app

### Contras de tawk.to
- Widget visualmente más pesado y menos moderno que Crisp
- La personalización CSS es limitada en el plan gratis
- Los datos se alojan en USA
- La interfaz de dashboard se siente abarrotada

---

## Opción avanzada: transformers.js (on-device AI chatbot)

**No recomendado como chatbot principal del sitio.** Pero sí como **página demo separada** (`/chatbot-demo`) que demuestra capacidad técnica.

### Qué es

[transformers.js](https://huggingface.co/docs/transformers.js) permite correr modelos de IA directamente en el navegador usando WebGPU/WASM. Sin servidor, sin API key, 100% privado.

### Limitantes para producción

| Aspecto | Realidad |
|---------|----------|
| Modelos | Solo los chicos (<500MB). Nada como GPT-4 o Claude. |
| Velocidad | Lento en CPUs sin WebGPU. En celulares, casi inusable. |
| Primer carga | Descarga del modelo (segundos a minutos). |
| Consistencia | Las respuestas pueden ser pobremente alineadas sin fine-tuning. |

### Para qué SÍ sirve

- **Página demo `/chatbot-demo`** donde el visitante chatea con un asistente local y ve que sabés de IA.
- **Mostrar expertise técnica** en entrevistas o propuestas.
- **Prototipado rápido** de ideas sin backend.

### Idea de implementación

```
/ruta                Propósito
/chatbot-demo        Demo de IA local con transformers.js (explica que es on-device, privado)
/                    Widget Crisp como chat principal de atención al cliente
```

### Stack técnico para la demo

```
React + transformers.js + modelo pequeño (ej. microsoft/Phi-3-mini-4k-instruct via WASM,
o DistilBERT para clasificación de intenciones)
```

### Código base para `/chatbot-demo`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
// import { pipeline } from "@huggingface/transformers";

export default function ChatbotDemo() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "¡Hola! Soy un asistente de IA que corre 100% en tu navegador. Tus datos no salen de tu dispositivo. Pregúntame sobre desarrollo web, chatbots o productos digitales." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // Aquí iría la llamada al pipeline de transformers.js
    // Por ahora es placeholder
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Esta es una respuesta de demostración. Con transformers.js implementado, aquí respondería el modelo de IA en tiempo real.",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="font-heading text-3xl font-bold text-text mb-2">
        Chatbot IA Demo
      </h1>
      <p className="text-text-muted text-sm mb-8">
        Este asistente corre 100% en tu navegador usando transformers.js.
        Ningún dato sale de tu dispositivo.
      </p>

      <div className="glass-card p-4 h-[400px] overflow-y-auto mb-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-accent text-bg"
                  : "bg-white/10 text-text"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 px-4 py-2 rounded-xl text-sm text-text-muted">
              Escribiendo...
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
        className="flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribí tu mensaje..."
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-border text-text placeholder:text-text-muted/50 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-xl bg-accent text-bg font-medium text-sm hover:brightness-110 disabled:opacity-50 transition-all"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
```

### Dependencias necesarias

```bash
npm install @huggingface/transformers
```

Advertencia: el bundle aumenta ~200-400KB por el runtime WASM. La descarga del modelo ocurre bajo demanda (puede ser 100MB+ la primera vez).

---

## Tabla comparativa final

| Criterio | Crisp | tawk.to | transformers.js |
|----------|-------|---------|-----------------|
| Setup | 15 min | 10 min | 1-2 días |
| Widget UI | ✅ Excelente | ⚠️ Aceptable | ❌ La armás vos |
| Automatización sin código | ✅ Sí | ✅ Sí | ❌ No |
| Knowledge Base | ✅ Sí | ✅ Sí | ❌ No |
| Mobile app | ✅ Sí | ✅ Sí | ❌ No |
| Captura de leads offline | ✅ Sí | ✅ Sí | ❌ No |
| IA real | 💰 Paga (~€15/mes) | 💰 Paga | ✅ Gratis, on-device |
| Privacidad | Bueno (UE) | Regular (USA) | Excelente (local) |
| Demo de expertise | 🟡 Muestra que usás chatbots | 🟡 Ídem | 🟢 Muestra IA real en navegador |
| Costo mensual | $0 | $0 | $0 (+ CDN) |
| **Recomendación** | **⭐ Principal** | **Alternativa** | **Demo separada** |

---

## Roadmap sugerido

### Fase 1 (esta semana)
- [ ] Crear cuenta Crisp
- [ ] Agregar `ChatWidget.tsx` al proyecto
- [ ] Configurar mensaje de bienvenida y opciones rápidas
- [ ] Crear artículos de Knowledge Base (FAQ)

### Fase 2 (próxima semana)
- [ ] Monitorear conversaciones durante 1 semana
- [ ] Ajustar respuestas automáticas según preguntas reales
- [ ] Agregar trigger para derivar a WhatsApp cuando sea necesario

### Fase 3 (opcional, mediano plazo)
- [ ] Evaluar Crisp AI (pago) si hay volumen
- [ ] Crear página `/chatbot-demo` con transformers.js como showcase técnico
- [ ] Publicar caso de estudio: "cómo implementamos el chatbot en INFOCOB"

---

## Conclusión

| Si querés... | Elegí... |
|--------------|----------|
| Un chatbot que atienda clientes YA | **Crisp** — 15 min, gratis, se ve bien |
| Algo 100% gratuito sin límites | **tawk.to** — más features, menos bonito |
| Demostrar que sabés IA de verdad | **transformers.js** — como página demo aparte |
| Una combinación poderosa | **Crisp (principal) + transformers.js (demo)** |
