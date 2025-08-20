Excelente 👌 Te aterrizo **dónde entra todo** y **cómo se integra** con tu stack actual, para que quede como un sistema operable (UX → UI → Motion → 3D) y no piezas sueltas.

# 1) Mapa de integración (Sección → UX → UI → Motion/3D)

| Sección                 | Objetivo UX                           | UI/Componentes                                                            | Motion (GSAP)                                                                | 3D / Firma                                                                        |
| ----------------------- | ------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Hero**                | Impacto en 3s + dirección clara       | `Section`, `HeadlineXL`, `Subhead`, `MagneticButton`, `KPIBar` (opcional) | SplitType (chars) + stagger; reveal por capas; **route-enter mask**          | **DealflowOrbit** (canvas puro) al 60–80% scroll; fallback estático en mobile/PRM |
| **Who I Am**            | Humanizar + credenciales              | `TwoCol` (foto + copy), `Badge`, `Link`                                   | fade-up suave; foto con parallax 10–15%; hover sutil en links                | No necesario                                                                      |
| **Why**                 | Manifiesto breve (máx. 3 frases)      | `FullBleedText`, `QuoteCard`                                              | word-by-word stagger + luminancia de fondo; pin corto (ScrollTrigger)        | **Partículas** (shader ligero o canvas 2D) con opacidad baja                      |
| **What I Do**           | Claridad de oferta (Holding + AQXION) | `Card` x2–3 con `Icon`, `CTA`                                             | cards: scale 1.02 + shadow morph; grid reveal por filas                      | **SpinTetra** (Three) como acento (desktop-only)                                  |
| **Portfolio**           | Prueba de ejecución                   | `CaseCard` (poster), `Gallery`, `VideoLoop`                               | cada case: timeline local (reveal img → caption → KPI); snap entre secciones | **FloatingIco** (Three) solo en el primer case                                    |
| **Insights** (opcional) | Autoridad intelectual                 | `PostList`, `Tag`, `Pagination`                                           | list item slide + fade; hover underline-grow                                 | No necesario                                                                      |
| **Contact / CTA**       | Conversión a conversación             | `Form` (RHForm+Zod), `Modal`, `MagneticButton`                            | CTA glow + micro-magnetic; success state con confetti ligero (canvas 2D)     | No necesario                                                                      |

> PRM = `prefers-reduced-motion` guard.

---

# 2) Arquitectura de carpetas (App Router)

```
app/
  layout.tsx
  page.tsx                    // Hero + secciones home
  (routes)/
    about/page.tsx
    work/page.tsx
    insights/page.tsx
    contact/page.tsx
  components/
    primitives/               // Container, Section, Grid, Typography
    ui/                       // Button, Card, Input, Modal, Badge, Link, MagneticButton, Counter
    blocks/                   // Hero, WhoIAm, Why, WhatIDo, Portfolio, Insights, Contact
    motion/                   // useLenis, useMaskTransition, useSplitType, timelines/
    three/                    // SpinTetra, FloatingIco, providers
    canvas/                   // DealflowOrbit (canvas puro), particles2d
  lib/
    seo/next-seo.config.ts
    og/route.tsx
    a11y/prm.ts               // prefers-reduced-motion helpers
    motion/gsap.ts            // registro de plugins, guards
    tokens/                   // colors.ts, spacing.ts, shadows.ts (para Tailwind v4)
```

---

# 3) Sistema de Motion (único con GSAP)

## 3.1 Inicialización y guards

```ts
// lib/motion/gsap.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isReady = false;
export function initGSAP() {
  if (isReady) return gsap;
  if (typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  isReady = true;
  return gsap;
}

// lib/a11y/prm.ts
export const PRM = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
```

## 3.2 Smooth scroll (Lenis) + ScrollTrigger

```ts
// components/motion/useLenis.ts
"use client";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGSAP } from "@/lib/motion/gsap";

export function useLenis() {
  useEffect(() => {
    const gsap = initGSAP();
    const lenis = new Lenis({ smoothWheel: true, syncTouch: true });
    function raf(time:number){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    return () => { lenis.destroy(); };
  }, []);
}
```

## 3.3 Route transition con **máscara GSAP (clip-path)**

```ts
// components/motion/useMaskTransition.ts
"use client";
import { useEffect } from "react";
import { initGSAP } from "@/lib/motion/gsap";

export function useMaskTransition(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const gsap = initGSAP();
    const el = ref.current; if (!el) return;
    gsap.fromTo(el,
      { clipPath: "circle(0% at 50% 50%)" },
      { clipPath: "circle(150% at 50% 50%)", duration: 0.8, ease: "power3.out" }
    );
  }, [ref]);
}
```

## 3.4 Tipografía XXL con SplitType + stagger

```ts
// components/motion/useSplitHeading.ts
"use client";
import SplitType from "split-type";
import { useEffect } from "react";
import { initGSAP } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export function useSplitHeading(selector:string) {
  useEffect(() => {
    if (PRM()) return;
    const gsap = initGSAP();
    const split = new SplitType(selector, { types: "chars" });
    gsap.from(split.chars, { yPercent: 120, opacity: 0, stagger: 0.02, duration: 0.7, ease: "power3.out" });
    return () => split.revert();
  }, [selector]);
}
```

## 3.5 Scroll reveals (patrón base)

```ts
// components/motion/timelines/reveal.ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function reveal(el: HTMLElement, opts?: {y?:number, duration?:number}) {
  const y = opts?.y ?? 40, duration = opts?.duration ?? 0.6;
  gsap.fromTo(el, { y, opacity: 0 }, {
    y: 0, opacity: 1, duration, ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" }
  });
}
```

---

# 4) Firma de interacción y 3D

## 4.1 **Dealflow Orbit** (canvas puro, sin Three)

* **Cuándo**: aparece a mitad del Hero o al final, **lazy** y **desktop-only**.
* **Qué**: nodos (Etapas: Buscar → Evaluar → Comprar → Escalar) orbitando; hover muestra tooltip; click abre modal/case.
* **Performance**: ≤ 80 KB JS, requestAnimationFrame con throttling en blur, pausar en `PRM()`.

## 4.2 **SpinTetra / FloatingIco** (Three.js + R3F)

* **Reglas**:

  * `dynamic import()` + `suspense fallback`.
  * Texturas ≤ 256–512px, materiales estándar, sin sombras pesadas.
  * `drei/PerformanceMonitor` para bajar calidad si FPS cae < 30.
* **Uso**: micro-acento en What I Do (SpinTetra) y primer case del Portfolio (FloatingIco).

---

# 5) UX system (cómo se decide cada micro-interacción)

## 5.1 Jerarquía de feedback

* **Nivel 1 (descubrimiento):** reveals y parallax sutil (200–300 ms).
* **Nivel 2 (acción):** hover/press con `scale(1.02)` + shadow morph (150–200 ms).
* **Nivel 3 (navegación):** route transition con máscara (700–900 ms total).
* **Nivel 4 (narrativa):** pin + scroll-driven (0.6–1.2 s por escena, nunca bloquear input).

## 5.2 Reglas de accesibilidad de motion

* Si `PRM()` → desactivar Lenis, fallbacks estáticos (sin SplitType), 3D pausado.
* Todos los motion hooks chequean PRM antes de ejecutar.

---

# 6) Tokens y Tailwind v4 (fuente única de verdad)

Ejemplo de tokens (JS) + uso en Tailwind v4 (via `@theme` en `globals.css`):

```css
/* globals.css */
@theme {
  --color-bg: #0a0b0e;
  --color-fg: #e6e6e6;
  --color-accent: #5ca7ff; /* o dorado #e2c86b */
  --radius-xl: 1.25rem;
  --shadow-soft: 0 10px 30px rgba(0,0,0,.25);
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px; --space-6: 24px; --space-8: 32px; --space-12: 48px; --space-16: 64px;
  --font-sans: "InterVariable", ui-sans-serif, system-ui;
}
```

Uso:

```tsx
<div className="max-w-[1440px] mx-auto px-6 md:px-8">
  <h1 className="font-[var(--font-sans)] text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-[-0.01em] text-[color:var(--color-fg)]">BUY. BUILD. SCALE.</h1>
</div>
```

---

# 7) Budgets y criterios de aceptación (Awwwards-ready)

* **CWV (mobile):** LCP ≤ 1.8s, CLS ≤ 0.05, INP ≤ 200 ms.
* **JS inicial:** ≤ 150 KB gz (sin Three/GSAP pesados en first paint).
* **Assets 3D:** ≤ 1.5 MB por escena, lazy, desktop-only.
* **Imágenes críticas:** AVIF/WebP, ≤ 150 KB cada una.
* **A11Y:** axe sin críticos; foco visible; navegación por teclado; `aria-*`.
* **PRM:** 100% respetado.
* **QA real:** iPhone medio y Android medio (Chrome/SAF) ≥ 30 FPS en escenas motion/3D.

---

# 8) Orden de implementación (sin sorpresas)

1. **Estructura & tokens** → `primitives` + layout + tipografía XXL.
2. **Hero (sin 3D)** → copy final + SplitType + mask transition.
3. **What I Do / Portfolio** → cards + timelines GSAP.
4. **Dealflow Orbit (canvas)** → lazy + PRM + test de FPS.
5. **SpinTetra / FloatingIco (Three)** → lazy + desktop-only + monitor.
6. **Forms (RHForm+Zod)** + estados de éxito/error.
7. **SEO/OG** + JSON‑LD, Lighthouse mobile ≥ 90.

---

## Con esto:

* La **UX** vive en `blocks/` + reglas de feedback (sección 5).
* Los **diseños** se codifican con `primitives` + tokens (sección 6).
* Los **efectos y transiciones** se gestionan con hooks GSAP reutilizables (sección 3).
* Los **objetos 3D y partículas** están encapsulados y fuertemente guardados por PRM, lazy y desktop-only (sección 4).