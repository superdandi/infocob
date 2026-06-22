<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# INFOCOB — Project Context

## Stack
- **Next.js** 16.2.9 (App Router, SSG with `output: "export"`)
- **React** 19.2.4
- **TypeScript** ^5
- **Tailwind CSS** ^4 (via PostCSS, `@import "tailwindcss"`, no config file)
- **lucide-react** ^1.20.0

## Key decisions
- All pages are client components where i18n or interactivity is needed
- `TranslationsProvider` wraps the entire app for ES/EN i18n (~260 keys)
- Static export to `out/`, deployed to GitHub Pages at `/infocob` base path
- Chatbot uses Gemini → Groq → OpenRouter fallback chain (NOT Crisp/tawk.to)
- `glow-border::before` must have `pointer-events: none` or it intercepts clicks on children
- `basePath: "/infocob"` in next.config.ts — all routes and assets are prefixed

## Critical files
- `src/app/globals.css` — Theme, glassmorphism, animations
- `src/lib/TranslationsProvider.tsx` — i18n context
- `src/lib/ChatContext.tsx` — Global chat state
- `src/app/layout.tsx` — Root layout with all providers
- `next.config.ts` — Static export + basePath
