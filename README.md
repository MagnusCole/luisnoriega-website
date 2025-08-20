# luisnoriega.com — MVP

Next.js 15 (App Router) + TailwindCSS + GSAP (ScrollTrigger) + Lenis. Enfocado en autoridad M&A y conversión de leads.

## Rutas

- `/` Home con Hero animado y propuesta Buy → Build → Scale
- `/about` Sobre Luis
- `/ma-lab` Metodología y casos
- `/aqxion` Vehículo de inversión
- `/vender` Formulario de lead (envía a `/api/lead`)
- `/contacto` Información de contacto

## Desarrollo

```powershell
npm run dev
```

Abrir http://localhost:3000

## Build

```powershell
npm run build ; npm run start
```

## Analytics

- Vercel Analytics (`@vercel/analytics`)
- Plausible via script tag (configurar dominio en producción)

## Stack de motion

- GSAP 3 (singleton y registro centralizado en `lib/motion/gsap`)
- ScrollTrigger (desde el wrapper anterior)
- Lenis (suave, PRM-aware, sincronizado con ScrollTrigger)

## TODO corto plazo

- Integrar CRM (HubSpot/Resend/n8n) en `/api/lead`
- Afinar budgets de motion por contratos (`lib/motion/contracts`)
- Lighthouse/axe baseline y CI
