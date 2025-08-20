# luisnoriega.com — MVP (Hero mínimo)

Next.js 15 (App Router) + React 19 + TypeScript + TailwindCSS + GSAP (ScrollTrigger). Sitio reducido a un Hero animado, monocromo y accesible.

## Rutas activas

- `/` Home (única vista)
- `/og` Open Graph image (route handler)
- `/robots.txt` Robots
- `/sitemap.xml` Sitemap

Rutas legacy (about, work, contact, portafolio, API lead) fueron eliminadas para dejar el proyecto mínimo.

## Desarrollo

```powershell
npm run dev
```

Abrir http://localhost:3000

## Build

```powershell
npm run build ; npm run start
```

## Stack actual

- UI: TailwindCSS utility-first
- App Router: Next.js 15 (TypeScript estricto)
- Motion: GSAP 3 + ScrollTrigger (registro centralizado en `lib/motion/gsap`)
- A11y/Perf: PRM y helpers (`lib/a11y/prm`) para gating de animaciones y decoraciones
- Canvas: `components/canvas/Particles2D` (ligero, DPR-aware) con fondo cósmico (`components/motion/CosmicBackground`)
- UI mínima: `components/ui/Button`, `components/ui/MagneticButton`
- Analytics: Plausible via script tag en `app/layout.tsx` (configurar dominio)

No se usa Lenis ni contratos de motion en esta versión mínima.

## Archivos clave

- `app/page.tsx`: Renderiza solo `<Hero />`
- `components/Hero.tsx`: Hero con GSAP (SplitType on-demand, reveal y parallax sutil)
- `components/motion/CosmicBackground.tsx` y `components/canvas/Particles2D.tsx`: fondo de partículas
- `lib/motion/gsap.ts`: inicialización GSAP/ScrollTrigger
- `lib/a11y/prm.ts`: PRM/isTouch/isDesktop helpers

## Personalización rápida

- Copys del Hero: editar `components/Hero.tsx`
- Intensidad de fondo/partículas: `CosmicBackground.tsx` / `Particles2D.tsx`
- Tipografía/tema: `app/globals.css` y clases Tailwind in-file

## TODO breve

- Opcional: reintroducir `/api/lead` y CRM (HubSpot/Resend/n8n) cuando se amplíe el MVP
- Añadir CI básica (typecheck + lint + Lighthouse/axe) cuando se estabilice
