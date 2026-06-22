# INFOCOB — Diseño & Desarrollo Digital

[![Deploy to GitHub Pages](https://github.com/superdandi/infocob/actions/workflows/deploy.yml/badge.svg)](https://github.com/superdandi/infocob/actions/workflows/deploy.yml)

Sitio web corporativo de [INFOCOB](https://superdandi.github.io/infocob), agencia de diseño y desarrollo digital fundada el 12 de noviembre de 2008 en Talca, Región del Maule, Chile.

Construido con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS v4**. Generación estática (SSG) desplegada en GitHub Pages.

---

## Capturas

| Hero | Servicios | Chat IA |
|------|-----------|---------|
| Hero con 3 CTAs, estadísticas y circuito animado de fondo | Cards glass con íconos, items y botón WhatsApp + Ver detalle | Modal premium 640px con IA multi-proveedor |

---

## Características

### 🎨 Frontend
- **Diseño glassmorphism** con fondo de circuito animado (SVG 24 traces + 25 donuts)
- **Tema oscuro/claro** con persistencia en localStorage
- **Animaciones controladas**: 3 estados (forzado/desactivado/automático) con detección `prefers-reduced-motion`
- **Revelación al scroll** vía IntersectionObserver (`animate-fade-up`)
- **Responsive** adaptable a todos los dispositivos
- **Transiciones suaves** entre páginas (`animate-fade-in`)

### 🌐 i18n
- Español e inglés completo (~260 claves de traducción)
- Detección automática del navegador
- Persistencia del idioma en localStorage

### 🤖 Chatbot IA Multi-Proveedor
- Chat modal premium centrado (640px, overlay full-screen)
- Cadena de fallback automática: **Gemini → Groq → OpenRouter**
- Cada proveedor con cooldown independiente de 60s
- Límite de 12 mensajes por minuto por visitante (rolling window en memoria)
- **Prompt de ventas senior**: metodologías SPIN, FAB, Challenger, SNAP + upselling, cross-selling, yes set, anclaje y cierre
- Sistema de presupuestos integrado (conoce los planes y puede cotizar)
- Captura de leads vía Web3Forms y WhatsApp

### 📋 SiteAudit — Auditoría de Sitio Web
- 30 preguntas en 7 categorías (diseño, contenido, SEO, rendimiento, seguridad, mobile, conversión)
- Scoring interactivo con resultados en tiempo real
- Reporte HTML descargable con email + nombre
- Upsells por categoría débil
- Lead capturado automáticamente en Web3Forms

### 📄 Páginas
- **Inicio** (`/`): Hero + ClientesCarousel (12 logos) + ServiciosHome (4 cards) + CasosExito (3 casos) + Testimonios + CTA
- **Servicios** (`/servicios`): Desarrollo Web, Integración de IA, Productos Digitales, Consultoría Técnica, Soporte Técnico
- **Planes** (`/planes`): Básico ($250K), Profesional ($450K), E-commerce ($700K)
- **Portafolio** (`/portafolio`): Galería de proyectos
- **Blog** (`/blog`): 4 artículos SEO-friendly con slugs, tags, listado y detalle
- **Auditoría** (`/auditoria`): SiteAudit interactivo
- **Contacto** (`/contacto`): Formulario dual (Web3Forms + WhatsApp)
- **Sobre mí** (`/sobre-mi`): Historia desde 2008
- **SEO Local** (`/zona/[slug]`): 4 landing pages con Schema LocalBusiness y FAQ

### 📊 Analytics & Conversión
- **Google Analytics 4** con 10 eventos personalizados (chat, auditoría, contacto, planes)
- **Microsoft Clarity** para grabaciones de sesión y heatmaps
- **Cookie Consent GDPR** banner con Aceptar/Rechazar (GA4 y Clarity solo si acepta)
- **Exit-intent popup** con lead magnet de auditoría (1 vez por sesión)
- **Sticky CTA mobile** (brand red) abre el chat
- **WhatsApp flotante** fijo en desktop y mobile

### 🧩 Componentes
- `AnimateOnScroll` — Revelación al scroll con IntersectionObserver
- `AnimationToggle` — Control de animaciones 3 estados
- `AiChat` — Modal de chatbot multi-proveedor
- `SiteAudit` — Cuestionario interactivo de 30 preguntas
- `ClientesCarousel` — Marquee horizontal con 12 logos
- `CasosExito` — Cards con métricas, desafío, solución, resultados
- `TestimonialsSection` — Testimonios con avatar circular
- `CookieConsent` — Banner GDPR con persistencia
- `ExitPopup` — Popup de salida con lead magnet
- `WhatsAppFloat` — Botón flotante WhatsApp
- `StickyCtaMobile` — CTA flotante mobile para chat

---

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | 16.2.9 | Framework React, SSG |
| React | 19.2.4 | UI |
| TypeScript | ^5 | Tipado estático |
| Tailwind CSS | ^4 | Estilos utilitarios |
| lucide-react | ^1.20.0 | Iconos SVG |
| class-variance-authority | ^0.7.1 | Variantes de componentes |
| tailwind-merge | ^3.6.0 | Fusión de clases Tailwind |
| ESLint | ^9 | Linting |
| GitHub Pages | — | Hosting estático |
| GitHub Actions | — | CI/CD |

---

## Estructura del proyecto

```
infocob/
├── public/                    # Archivos estáticos (imágenes, favicon)
├── src/
│   ├── app/                   # Páginas (App Router)
│   │   ├── auditoria/         # SiteAudit interactivo
│   │   ├── blog/              # Blog (listado + detalle)
│   │   ├── contacto/          # Formulario de contacto
│   │   ├── planes/            # Página de precios
│   │   ├── portafolio/        # Galería de proyectos
│   │   ├── servicios/         # Servicios detallados
│   │   ├── sobre-mi/          # Historia y valores
│   │   ├── zona/              # Landing pages SEO local
│   │   ├── layout.tsx         # Layout raíz
│   │   ├── page.tsx           # Página de inicio
│   │   ├── globals.css        # Estilos globales + tema
│   │   ├── error.tsx          # Error boundary
│   │   ├── not-found.tsx      # Página 404
│   │   └── loading.tsx        # Estado de carga
│   ├── components/            # Componentes React
│   │   ├── AiChat.tsx         # Chatbot multi-proveedor
│   │   ├── AnimateOnScroll.tsx # Animación al scroll
│   │   ├── AnimationToggle.tsx # Control de animaciones
│   │   ├── CasosExito.tsx     # Casos de éxito
│   │   ├── CircuitDrawAnimation.tsx # Circuito SVG
│   │   ├── ClientesCarousel.tsx # Carrusel de logos
│   │   ├── CookieConsent.tsx  # Banner GDPR
│   │   ├── ExitPopup.tsx      # Popup de salida
│   │   ├── Hero.tsx           # Hero principal
│   │   ├── Navbar.tsx         # Navegación
│   │   ├── ServiciosHome.tsx  # Servicios en homepage
│   │   ├── SiteAudit.tsx      # Auditoría interactiva
│   │   ├── WhatsAppFloat.tsx  # Botón WhatsApp flotante
│   │   └── ...                # (24 componentes total)
│   ├── data/                  # Datos estáticos
│   └── lib/                   # Utilidades, contextos, i18n
│       ├── locales/           # Traducciones ES/EN
│       ├── ChatContext.tsx     # Estado global del chat
│       ├── ThemeProvider.tsx   # Tema oscuro/claro
│       └── TranslationsProvider.tsx # i18n context
├── next.config.ts             # Configuración Next.js
├── tailwind.config.ts         # Configuración Tailwind
└── postcss.config.mjs         # PostCSS
```

---

## Empezar

### Prerrequisitos

- Node.js 20+ (recomendado 24)
- npm

### Instalación

```bash
git clone https://github.com/superdandi/infocob.git
cd infocob
npm install
```

### Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
cp .env.example .env.local
```

| Variable | Requerida | Descripción |
|---|---|---|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Sí | Google Gemini API (chat IA primario) |
| `NEXT_PUBLIC_GROQ_API_KEY` | Sí | Groq API (fallback chat IA) |
| `NEXT_PUBLIC_OPENROUTER_API_KEY` | Sí | OpenRouter API (tercer fallback) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Sí | Access Key Web3Forms (formulario → email) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics Measurement ID |
| `NEXT_PUBLIC_CLARITY_ID` | No | Microsoft Clarity Project ID |

### Desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

### Producción

```bash
npm run build
npm start
```

Genera exportación estática en `out/`.

---

## Despliegue

Automatizado con GitHub Actions. Al pushear a `main`:

1. `actions/checkout@v6`
2. `actions/setup-node@v6` con Node 24
3. `npm install`
4. `npm run build` con secrets como env vars
5. `actions/configure-pages@v6`
6. `actions/upload-pages-artifact@v5` (sube `out/`)
7. `actions/deploy-pages@v5`

**URL**: [https://superdandi.github.io/infocob](https://superdandi.github.io/infocob)

### Configurar secrets en GitHub

Settings → Secrets and variables → Actions → New repository secret:

- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `OPENROUTER_API_KEY`
- `WEB3FORMS_KEY`
- `GA_ID` (opcional)
- `CLARITY_ID` (opcional)

---

## APIs Externas

| Servicio | Propósito | Plan | Límites |
|---|---|---|---|
| **Google Gemini** | Chat IA principal | Gratis (60 req/min) | 60 requests/minuto |
| **Groq** | Fallback chat IA | Gratis | 30 req/min, 14,400 req/día |
| **OpenRouter** | Tercer fallback chat IA | Gratis con registro | Varía por modelo |
| **Web3Forms** | Email desde formularios | Gratis (250/mes) | 250 formularios/mes |
| **Google Analytics 4** | Tracking de visitas | Gratis | 10M hits/mes |
| **Microsoft Clarity** | Grabaciones de sesión | Gratis | Ilimitado |

---

## Licencia

© 2008–2026 INFOCOB. Todos los derechos reservados.

---

## Créditos

- **Daniel Cobos Mansilla** — Fundador y desarrollador
- **Next.js** — Framework
- **Tailwind CSS** — Estilos
- **Lucide** — Iconos
- **Google Gemini** — IA conversacional
- **Groq** — Inferencia rápida
- **OpenRouter** — Fallback multi-modelo
