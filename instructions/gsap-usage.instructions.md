# Instrucciones de Motion — **GSAP‑Only**

## 0) Objetivo

* Todo efecto/animación (reveal, parallax, smooth, hover avanzado, splits, counters, etc.) **debe** implementarse con **GSAP** (y sus plugins).
* No usar Framer Motion, CSS keyframes (salvo utilidades ultra básicas), ni librerías de scroll alternativas.

---

## 1) Reglas de uso (obligatorias)

1. **GSAP como única fuente de verdad**

   * Declarar/actualizar estados visuales con `gsap.to|from|fromTo` y plugins.
   * Evitar CSS transitions para el mismo prop que anima GSAP.

2. **Plugins permitidos**
   Registrar **solo** desde `@/lib/motion/gsap` y reutilizar:

   * `ScrollSmoother`, `ScrollTrigger`, `SplitText`, `Flip`, `CustomEase`, `TextPlugin`,
   * `MotionPathPlugin`, `MorphSVGPlugin`, `DrawSVGPlugin`, `Observer`, `InertiaPlugin`, `Draggable`, `EasePack` (Rough/ExpoScale/SlowMo).

3. **Contexto + Cleanup siempre**

   * En componentes React usar `gsap.context()` (o `useGSAP`) y limpiar en un `return () => ctx.revert()` (y desregistrar `matchMedia` si aplica).

4. **Gating de rendimiento/accesibilidad**

   * Respetar **PRM** (prefers‑reduced‑motion), **Save‑Data**, **touch** y **desktop** antes de animar.
   * Si `PRM` → mostrar estado final sin animación.

5. **ScrollSmoother como smooth por defecto**

   * Toda lógica de parallax/scroll debe usar `ScrollSmoother` + `ScrollTrigger` (ya registrado).
   * No usar Lenis/Locomotive.

6. **No SSR en efectos**

   * Animaciones solo en **client components** (`"use client"`).
   * Imports dinámicos para piezas pesadas si es necesario.

---

## 2) Estructura de implementación

**2.1 Registro único de plugins**

* Usar **exclusivamente** `@/lib/motion/gsap` (ya tienes el archivo) para registrar GSAP y plugins.
* Importar desde ahí:
  `import { gsap, ScrollTrigger, ScrollSmoother, useGSAP } from "@/lib/motion/gsap"`

**2.2 Patrón base en componentes**

* Siempre:

  * refs para los elementos a animar,
  * `useEffect`/`useGSAP` con `gsap.context`,
  * cleanup.

**2.3 Tokens de motion (consistencia)**

* Duraciones/curvas centralizadas (usa tus CSS vars o constantes TS):

  * `--motion-dur-fast: 200ms`, `--motion-dur-med: 300ms`, `--motion-dur-page: 600ms`
  * `--motion-ease-smooth: cubic-bezier(0.16,1,0.3,1)`
    En GSAP, definir equivalentes:
    `const EASE = "power3.out";  const DFAST=0.2; const DMED=0.3; const DPG=0.6;`

---

## 3) Patrones aprobados (reutilizables)

**3.1 Reveal tipográfico (Hero/Headings)**

* `SplitText` → `from(chars, { yPercent:120, opacity:0, stagger:0.02, duration:0.6, ease:"power3.out" })`
* Subcopy → `from(el, { y:14, opacity:0, duration:0.45 })`
* Gatear por PRM; si PRM → `split.revert()` y set visible.

**3.2 Parallax sutil**

* Texto/imagenes: `yPercent` entre `-4` y `+6`, `scrub:true`, `start:"top bottom"`, `end:"bottom top"`.
* Fuegos artificiales no: parallax **muy** ligero.

**3.3 ScrollSmoother**

* Instanciar 1 sola vez en un “shell” (layout/App).
* Efectos locales con `ScrollTrigger` (no crear múltiples Smoothers).

**3.4 Cursor light / inertia (desktop)**

* `Observer`/listeners + `gsap.quickTo` con `InertiaPlugin` opcional.
* Opacidad muy baja; desactivar en móvil/PRM/Save‑Data.

**3.5 Flip (transformaciones de layout)**

* Para transiciones (ej. H1 → logo): `Flip.getState()`, mutar DOM, `Flip.from(state, { ease:"power2.inOut", duration:0.6 })`.

**3.6 Lines/Orbits (SVG)**

* `DrawSVGPlugin` para strokes, `MotionPathPlugin` para trayectorias.
* Duraciones largas, loops lentos; sin distraer.

**3.7 Textos dinámicos**

* `TextPlugin` para cambios sutiles (nunca “typewriter” agresivo por defecto).

---

## 4) Accesibilidad & Rendimiento

* **PRM**: si `true`, no animar. Dejar estado final (sin motion).
* **Save‑Data**: desactivar partículas, cursor‑light, grandes timelines.
* **Touch**: reducir densidades y efectos costosos.
* **Eficiencia**:

  * Evitar animar `width/height/top/left`; preferir `transform/opacity`.
  * Usar `will-change: transform` solo en elementos animados y durante el motion.
  * Timelines cortos; reciclar instancias cuando sea posible.
* **Cleanup estricto**: matar `ScrollTrigger`/`matchMedia`/timelines al desmontar.

---

## 5) Do / Don’t

**Do**

* `gsap.context` en cada componente animado.
* `ScrollTrigger.refresh()` solo tras cambios estructurales.
* `matchMedia` de GSAP para variantes responsive.

**Don’t**

* No mezclar **Framer Motion** ni otras librerías de scroll.
* No keyframes CSS para props ya animados por GSAP.
* No “eases locos” por defecto; mantener `power3.out`, `expo.out` sutil.

---

## 6) QA de motion (Checklist antes de merge)

1. ¿Respeta PRM/Save‑Data/touch?
2. ¿Solo usa GSAP y plugins registrados?
3. ¿Hay `gsap.context()` y cleanup?
4. ¿Props animadas son `transform/opacity`?
5. ¿Duraciones/eases siguen tokens del sistema?
6. ¿ScrollSmoother único, sin duplicados?
7. ¿No afecta Core Web Vitals? (comprobar CLS/LCP)
8. ¿Funciona sin errores en Safari iOS/Android Chrome?

---

## 7) Naming/Convenciones

* Refs: `headlineRef`, `subRef`, `ctaRef`, `imgRef`.
* Timelines: `tlHero`, `tlAbout`, `tlSectionX`.
* Triggers: `trigger: ".hero"` o `trigger: sectionRef.current`.
* Data‑attrs para estados: `data-scrolled`, `data-revealed`.

---

## 8) Plantillas de efectos a usar (descriptivo)

* **Hero reveal**: SplitText (chars) + subcopy + CTAs con pequeños offsets.
* **Sección About**: fade + y en los bloques, parallax muy leve de heading.
* **Grid de proyectos**: hover con `y: -4 ~ -8`, `scale: 1.02`, sombra sutil; reveal secuencial al entrar al viewport.
* **Footer gigante**: timeline al entrar, con título fade + letter‑spacing normalize, scroll cue final.

---

## 9) Seguridad en Next.js

* Todos los componentes que animan: `"use client"`.
* Imports que dependan del `window` → dinámicos (`ssr:false`) si hace falta.
* Nunca llamar GSAP en SSR.

---

## 10) Ejecución por fases (roadmap de motion)

1. **Fundación**: ScrollSmoother global + PRM gating.
2. **Hero**: SplitText + reveal + scroll cue.
3. **About**: reveal + parallax leve.
4. **Work/Showcase**: reveals por card + hover micro.
5. **CTA final/Footer**: cierre con fade/scale sobrio.

---

## 11) Resumen anti‑mix (reglas rápidas)

- Si GSAP anima un target/propiedad, no usar CSS `transition`/`animation` sobre ese mismo target/propiedad.
- Evitar Framer Motion u otras libs de scroll. Stack único: GSAP + plugins registrados en `lib/motion/gsap`.
- React solo si es necesario: refs + efectos + listeners. Sin estado/JSX extra si el snippet solo hace side‑effects.

---

## 12) Estructura de snippets (obligatoria)

- Ubicación: `components/motion/<dominio>/NombreDelSnippet.tsx`.
- Imports: siempre desde `@/lib/motion/gsap` y helpers A11y desde `@/lib/a11y/prm`.
- Gating: comprobar `PRM()` y `navigator.connection?.saveData` antes de animar.
- Cleanup: `tween/tl.kill()`, `trigger.kill()`, `split.revert()`, `removeEventListener()`.
- Devolver `null` si el snippet solo aplica efectos (sin UI propia).

Tips con ScrollSmoother + ScrollTrigger:
- Parallax: `start: "top bottom"`, `end: "bottom top"`, `scrub: 0.3–0.8`, `immediateRender: false` en `fromTo`.
- Pin: `anticipatePin: 1`, `pinSpacing: true`.
- Consistencia: `invalidateOnRefresh: true` y `ScrollTrigger.refresh()` tras crear triggers y en `resize`.

---

## 13) Snippets actuales (referencia en repo)

- Parallax + reveal (Hero): `components/motion/hero/TitleRevealParallax.tsx`
- Hover premium (Hero): `components/motion/hero/HoverLuxuryTitle.tsx`
- Smoother global: `components/motion/SmoothScroller.tsx`

Todos siguen: imports centralizados, gating PRM/Save‑Data y cleanup estricto.

---

## 14) Checklist por snippet (crear/modificar)

- [ ] En `components/motion/<dominio>/` y retorna `null` si es solo efecto.
- [ ] Imports desde `lib/motion/gsap` (no del paquete directo).
- [ ] Gated por `PRM()` y `Save‑Data` antes de animar.
- [ ] No hay CSS `transition`/`animation` para las mismas props/targets.
- [ ] ScrollTrigger compatible con Smoother (start/end/scrub/anticipatePin/invalidateOnRefresh).
- [ ] `ScrollTrigger.refresh()` tras creación y en `resize` si afecta el layout.
- [ ] Cleanup completo: `kill/revert/removeEventListener`.
