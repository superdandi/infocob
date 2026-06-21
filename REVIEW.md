# Review del sitio INFOCOB

## ¿Se entiende bien qué vendemos?

Sí. El Hero dice «Productos digitales / impulsados por IA» con subtítulo «Sitios web y soluciones digitales a tu servicio». Sitios web primero, chatbots como complemento natural. Hero tiene 3 CTAs: chat IA (primario), auditoría (secundario), servicios (terciario). La navegación y servicios refuerzan el catálogo completo.

## Estado actual vs reviews anteriores

### Resuelto

| Item | Estado | Detalle |
|---|---|---|
| Chatbot IA multi-proveedor | ✅ | Gemini + Groq + OpenRouter con fallback automático y cooldown individual. Modal premium centrado 640px. Trigger desde Hero y Navbar. |
| Prompt de ventas senior | ✅ | SPIN + FAB + Challenger + SNAP + upselling + cross-selling + yes set + anclaje + cierre. Respuestas de 1-2 líneas. |
| Per-visitor rate limit | ✅ | 12 msg/min rolling window + 3s entre mensajes + 60s cooldown por proveedor. |
| Blog / SEO | ✅ | 4 artículos: guía Talca, web vs redes, precios Chile, chatbot WhatsApp. SEO-friendly con slugs y tags. |
| CTA agresivo | ✅ | Hero: chat (primario), auditoría (secundario), servicios (terciario). Cada servicio con cotizar por WhatsApp. |
| Precios visibles | ✅ | En chatbot: rangos $250.000-$800.000. En servicios: "desde $X". |
| WhatsApp diferenciado | ✅ | Cada servicio tiene mensaje de cotización único vía `t("whatsapp.cotizar", {title})`. |
| Chatbot como demo viva | ✅ | El asistente IA es prueba tecnológica funcionando en producción. Servicio de IA lo destaca. |
| i18n completo | ✅ | ES/EN con ~215 translation keys. |
| Circuit animation | ✅ | 24 traces + 25 donuts, viewBox corregido, opacidades unificadas. |
| Reduced motion | ✅ | Toggle 3 estados (enabled/disabled/auto). |
| Brand red audit | ✅ | 10 oportunidades implementadas en 13 archivos. |
| Hero title/subtitle | ✅ | 2 líneas, sitios web primero. |
| Servicios cards limpiados | ✅ | De 4 a 3 items por tarjeta. Más escaneables. |
| IA service actualizado | ✅ | Destaca chatbot funcionando en este sitio. |
| **Lead magnet + captura de email** | ✅ | Auditoría interactiva: 30 preguntas, captura email + nombre para descargar reporte HTML con score, desglose, áreas de mejora y CTA. PDF autogenerado sin dependencias. |
| **Formulario de contacto** | ✅ | Página /contacto con form (nombre, email, mensaje) que enruta a WhatsApp. Info de contacto, mapa embed. |
| **Auditoría de sitio web** | ✅ | Herramienta interactiva gratuita. 7 categorías, 30 preguntas, scoring, desglose, upsells por categoría, PDF descargable, CTA a WhatsApp. |

### Pendiente (por impacto)

| Item | Impacto | Estado |
|---|---|---|
| Casos de éxito con métricas | Alto | ❌ «Cliente X: pasó de 100 a 500 visitas/día». Resultados venden. |
| Analytics | Alto | ❌ Sin tracking. No sabemos qué funciona ni de dónde vienen los leads. |
| Formulario → email directo | Alto | ✅ Web3Forms integrado. Form POSTea a email + botón WhatsApp secundario. Leads fríos capturados. |
| Lead de auditoría → email | Alto | ✅ Al descargar PDF, lead (nombre, email, score, desglose) enviado a Web3Forms. |
| Pricing page / planes | Medio | ❌ Los precios están solo en el chatbot. Una página «Planes» filtraría mejor. |
| Prueba social con fotos | Medio | ❌ Testimonios genéricos. Fotos de clientes reales darían mucha más confianza. |
| SEO local más agresivo | Bajo | ⚠️ Blog ayuda, pero faltan landing pages por keyword tipo «diseño web Talca». |

---

## Lo que más me gusta hoy

1. **Auditoría interactiva** — herramienta gratuita que captura leads calificados. Quien completa 30 preguntas y descarga el PDF ya está interesado en mejorar su sitio.
2. **Chatbot modal premium con 3 proveedores** — eliminamos el floating widget barato. Modal centrado que se siente parte del diseño. Gemini → Groq → OpenRouter con cooldown individual. El sistema no se cae.
3. **Vendedor senior en el prompt** — tono directo con SPIN, FAB, Challenger, upsell y cierre. Ofrece la auditoría cuando detecta que el usuario ya tiene sitio web.
4. **Per-visitor rate limit** — 12 msg/min como capa extra antes de tocar proveedores.
5. **Circuit animation + glass cards** — identidad única. Premium.
6. **Lead capture integrado** — la auditoría ya captura email + nombre. No hace falta un lead magnet separado.

---

## Capacidad de convertir / lograr ventas: 7.5/10

Subió de 6.5/10 a 7.5/10. Mejoras clave:

- ✅ **Auditoría como lead magnet** — captura leads calificados con email + nombre. Quien completa la evaluación ya está en modo "quiero mejorar mi sitio".
- ✅ **Chatbot con upselling** — prompt de ventas senior + oferta de auditoría cuando corresponde.
- ✅ **Formulario de contacto** — canal alternativo a WhatsApp.

Todavía:

- ❌ **Sin analytics** → volamos a ciegas
- ❌ **Sin casos de éxito con números** → falta prueba social contundente
- ❌ **Sin pricing page** → leads sin presupuesto claro requieren más fricción

---

## Próximas mejoras recomendadas (por orden)

### 1. Casos de éxito con métricas
Agregar 2-3 casos al portafolio con formato: logo + nombre + resultado numérico. Ej: «Clínica X: +40% consultas vía web en 3 meses».

### 2. Analytics

### 3. Pricing page
Página «Planes» con 3 tiers (Básico/Profesional/E-commerce) con precios y qué incluye cada uno. Filtra leads y acelera el cierre.

### 4. Testimonios con foto
Pedir a 3-5 clientes una foto selfie + frase. Ponerlas en la sección testimonios con nombre y rubro real.

### 5. SEO local dedicado
Landing pages por keyword: «diseño web Talca», «página web Maule», «crear sitio web Chile». Cada una con contenido único y CTA local.

---

## Conclusión

El sitio está **sólido como portafolio corporativo y mejorando como máquina de ventas**. La auditoría fue el cambio más impactante de esta ronda: es un lead magnet funcional que califica prospectos sin fricción. El chatbot multi-proveedor garantiza disponibilidad 24/7.

**Nota global: 8/10 como sitio web corporativo. 8/10 como máquina de ventas.** Los siguientes pasos (casos de éxito, analytics, pricing page) son los que van a mover la aguja en conversión.
