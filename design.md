# INFOCOB — Design System

## Brand

| Propiedad | Valor |
|---|---|
| Nombre | INFOCOB |
| Eslogan | diseño de nuevos productos digitales |
| Rubro | Desarrollo Web · IA · Productos Digitales |
| Fundación | 12 noviembre 2008 |
| Fundador | Daniel Cobos Mansilla |
| Ubicación | Talca, Región del Maule, Chile |
| Contacto | +56 9 8 28 64 145 / dcobosm@gmail.com |

## Paleta de Colores

| Token | Rol | Hex | RGB |
|---|---|---|---|
| `--color-bg` | Fondo principal | `#0b0d17` | rgb(11,13,23) |
| `--color-bg-secondary` | Fondo secundario | `#111827` | rgb(17,24,39) |
| `--color-card` | Glass card | `rgba(15,23,42,0.6)` | con backdrop-blur |
| `--color-accent` | Acento primario (cian) | `#00d4ff` | rgb(0,212,255) |
| `--color-accent-secondary` | Acento secundario (índigo) | `#6366f1` | rgb(99,102,241) |
| `--color-brand` | Rojo marca original | `#ba112a` | rgb(186,17,42) |
| `--color-text` | Texto principal | `#f1f5f9` | rgb(241,245,249) |
| `--color-text-muted` | Texto secundario | `#94a3b8` | rgb(148,163,184) |
| `--color-border` | Bordes glass | `rgba(255,255,255,0.08)` | — |
| `--color-success` | Éxito/CTA | `#10b981` | rgb(16,185,129) |

### Uso del rojo original (#ba112a)

El rojo #ba112a se usa **exclusivamente** como acento de herencia de marca:
- Trazos del circuito en el logo SVG
- Hover states de enlaces en el footer (como guiño sutil)
- Nombre "INFOCOB" en el hero (primera aparición)
- NO se usa en CTAs, cards, botones principales ni fondos

## Tipografía

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Cuerpo | Inter | 300–700 | Texto general, párrafos |
| Títulos | Plus Jakarta Sans | 500–800 | Headings, hero, secciones |
| Monospace | JetBrains Mono | 400–600 | Código, terminal, fechas |

## Logo (SVG)

El logo original (GIF 420×200, fondo blanco) consiste en:

- Patrón de circuito impreso (traces, nodos, vías) en rojo #ba112a
- Texto "INFOCOB computación" en rojo #ba112a sobre fondo blanco

### Versión modernizada para el nuevo sitio

- Trazos de circuito simplificados, vectoriales, en #ba112a con opacidad variable
- Texto "INFOCOB" en blanco/platino, sans-serif bold
- Subtítulo "diseño de nuevos productos digitales" en cian #00d4ff
- Fondo transparente (se monta sobre el fondo oscuro del sitio)
- Tamaño responsive: 180px ancho en desktop, 140px en mobile

## Glassmorphism

```css
.glass {
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.glass-card {
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

## Efectos Decorativos

### 1. Grid Background
Patrón de puntos sutiles en el fondo, similar al original pero más tenue:
- 40px spacing
- Puntos de 1px, rgba(255,255,255,0.03)

### 2. ProximityGlow (adaptado de vizcoso)
Brillo sutil en cards al acercarse al centro del viewport:
- Color: rgba(99,102,241, 0.15) (índigo tenue)
- Suave, sin saturar

### 3. Borde gradiente animado
Algunas cards clave tienen borde con gradiente sutil que rota:
- De cian #00d4ff a índigo #6366f1
- Animación de 4s linear infinite (solo en hover si se desea)

### 4. Transiciones suaves
- `transition-all duration-300 ease-out` en cards y botones
- `hover:translate-y-[-2px]` en glass cards para efecto de elevación

### 5. Scanline (opcional, muy sutil)
Línea horizontal tenue que barre la pantalla en 8s, al 5% de opacidad blanca

## Componentes UI

### Botones
- **Primario**: bg cian (#00d4ff), texto oscuro, hover brightness 110%
- **Secundario**: glass, borde sutil, hover con glow
- **Outline**: transparente con borde, hover con relleno

### Navbar
- Sticky, glass effect al scrollear
- Logo izquierda, links derecha
- WhatsApp flotante (fijo abajo-derecha en mobile y desktop)
- Active section highlight con línea cian

### Footer
- Fondo sólido semi-oscuro
- Logo + tagline + enlaces + copyright
- Redes sociales: Instagram, WhatsApp, Email (íconos lucide)

### Cards de servicios
- Glass card con ícono grande (lucide) y título
- Efecto hover: glow sutil en borde
- CTA "Cotizar" o "Ver más"

## Arquitectura del Sitio

| Ruta | Página | Propósito |
|---|---|---|
| `/` | Inicio | Hero + servicios principales + CTA contacto |
| `/servicios` | Servicios | Desarrollo web, IA, productos digitales |
| `/portafolio` | Portafolio | Proyectos (se llena cuando haya casos) |
| `/sobre-mi` | Sobre mí | Historia, valores, misión, visión (contenido original) |
| `/contacto` | Contacto | Formulario + WhatsApp + email + ubicación |

## Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Next.js | ^15.2.0 | SSG (output: export) |
| React | ^19.0.0 | UI |
| TypeScript | ^5.7.0 | Tipado |
| Tailwind CSS | ^4.1.0 | Estilos |
| shadcn/ui | ^4.11.0 | Componentes base |
| lucide-react | ^1.18.0 | Iconos |
| GitHub Pages | — | Hosting |
| GitHub Actions | — | CI/CD |

## Estrategia Revenue

1. **Lead magnets**: Cada servicio tiene CTA directo a WhatsApp
2. **WhatsApp flotante**: Siempre visible, botón verde fijo
3. **Formulario de contacto**: Con captura de datos básicos
4. **Contenido de autoridad**: Sección Sobre Mí con historia real (desde 2008)
5. **SEO**: Meta tags por página, Open Graph, estructura semántica
6. **Velocidad**: SSG → carga instantánea, mejora conversión

---

## Referencias Visuales

- **Vibe**: https://cruip.com (clean tech landing pages)
- **Glassmorphism**: https://ui.glass/generator
- **Paleta original**: #ba112a (rojo INFOCOB heritage)
