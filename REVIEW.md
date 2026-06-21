# Review del sitio INFOCOB

## ¿Se entiende bien qué vendemos?

Sí. El Hero ahora dice «Productos digitales / impulsados por IA» con subtítulo «Sitios web y soluciones digitales a tu servicio». Sitios web primero, chatbots como complemento natural. La navegación, servicios y CTA refuerzan el catálogo completo.

## Estado actual vs review anterior

### Cosas que atacamos y están resueltas

| Item | Estado | Detalle |
|---|---|---|
| Chatbot en el sitio | ✅ | Gemini + Groq + OpenRouter con fallback automático. Modal premium centrado (640px, estilo ChatGPT). Trigger desde Hero y Navbar. |
| Blog / SEO | ✅ | 4 artículos: guía Talca, web vs redes, precios Chile, chatbot WhatsApp. SEO-focused con slugs y tags. |
| CTA más agresivo | ✅ | Hero: "Habla con nuestro asistente IA" (primario), "Cotiza tu proyecto" (secundario). |
| Precios visibles | ✅ | En chatbot: rangos $250.000-$800.000. En servicios: "desde $X" en descripciones. |
| WhatsApp diferenciado | ✅ | Cada servicio tiene mensaje de cotización único via `t("whatsapp.cotizar", {title})`. |
| Chatbot como demo viva | ✅ | El asistente IA es prueba tecnológica funcionando en producción. |
| i18n completo | ✅ | ES/EN con ~55 translation keys. |
| Circuit animation | ✅ | 24 traces + 25 donuts, viewBox corregido, opacidades unificadas. |
| Reduced motion | ✅ | Toggle 3 estados (enabled/disabled/auto). |
| Brand red audit | ✅ | 10 oportunidades implementadas en 13 archivos. |
| Hero title/subtitle | ✅ | Corregido a 2 líneas, sitios web primero. |

### Lo que sigue pendiente (por impacto)

| Item | Impacto | Estado |
|---|---|---|
| Casos de éxito con métricas | Alto | ❌ «Cliente X: pasó de 100 a 500 visitas/día». Resultados venden. |
| Lead magnet + captura de email | Alto | ❌ Guía gratuita a cambio de email. Permite follow-up y nutrición. |
| Formulario de contacto (no WhatsApp) | Alto | ❌ Hay leads fríos que no quieren WhatsApp. Un form simple ayuda. |
| Analytics | Medio | ❌ Sin tracking. No sabemos qué funciona ni de dónde vienen los leads. |
| Pricing page / planes | Medio | ❌ Los precios están solo en el chatbot. Una página «Planes» filtraría mejor. |
| Prueba social con fotos | Medio | ❌ Testimonios genéricos. Fotos de clientes reales darían mucha más confianza. |
| SEO local más agresivo | Bajo | ⚠️ Blog ayuda, pero faltan landing pages por keyword tipo «diseño web Talca». |

---

## Lo que más me gusta hoy

1. **Chatbot modal premium** — eliminamos el floating widget barato. Ahora es un modal centrado que se siente parte del diseño, no un accesorio.
2. **Fallback 3 proveedores** — Gemini → Groq → OpenRouter con cooldown individual. El sistema no se cae aunque uno esté rate-limited.
3. **Vendedor senior en el prompt** — el tono cambió de asistente genérico a vendedor directo con SPIN, FAB, Challenger, upsell y cierre.
4. **Per-visitor rate limit** — 12 msg/min como capa extra antes de tocar los proveedores.
5. **Circuit animation + glass cards** — identidad única. Premium.
6. **Servicios limpiados a 3 items** — más escaneables, menos ruido.

---

## Capacidad de convertir / lograr ventas: 6.5/10

Subió de 5/10 a 6.5/10. Mejoró significativamente por el chatbot (genera leads 24/7, demuestra expertise en IA, cierra con paso concreto). Pero todavía:

- ❌ **No hay captura de email** → leads fríos se pierden
- ❌ **No hay casos de éxito con números** → falta prueba social contundente
- ❌ **No hay analytics** → volamos a ciegas
- ❌ **No hay lead magnet** → nada a cambio del contacto

---

## Próximas mejoras recomendadas (por orden)

### 1. Lead magnet + formulario email
Una guía gratuita "Cómo elegir el sitio web ideal para tu negocio" a cambio del email. Implementar con un modal simple en Hero + página de contacto. Data en localStorage o servicio gratuito como Formspree.

### 2. Casos de éxito con métricas
Agregar 2-3 casos al portafolio con formato: logo + nombre + resultado numérico. Ej: «Clínica X: +40% consultas vía web en 3 meses».

### 3. Analytics
Google Analytics 4 o Plausible. Entender qué canales traen leads, qué páginas convierten, cuánto usa la gente el chatbot.

### 4. Pricing page
Página «Planes» con 3 tiers (Básico/Profesional/E-commerce) con precios y qué incluye cada uno. Filtra leads y acelera el cierre.

### 5. SEO local dedicado
Landing pages por keyword: «diseño web Talca», «página web Maule», «crear sitio web Chile». Cada una con contenido único y CTA local.

### 6. Testimonios con foto
Pedir a 3-5 clientes una foto selfie + frase. Ponerlas en la sección testimonios con nombre y rubro real.

---

## Conclusión

El sitio está **mucho más sólido que en la primera revisión**. El chatbot es el cambio más impactante: no solo genera leads, sino que es una vitrina tecnológica funcionando. La limpieza de servicios, el modal premium y el prompt de ventas cerraron brechas importantes.

**Nota global: 8/10 como sitio web corporativo. 6.5/10 como máquina de ventas.** Los siguientes pasos (lead magnet, casos de éxito, analytics) son los que realmente van a mover la aguja en conversión.
