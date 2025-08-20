# Min Spec (fuente de verdad)

Esta especificación congela límites para UX, Motion y 3D. Los agentes y PRs deben referenciar este documento.

## Navegación visible
- Navbar sólo expone: Home, Portafolio, Hablemos (ancla `#hablemos`).
- Máximo 3–4 ítems para foco.

## Motion budgets
- Microinteracciones: 200–300 ms.
- Transiciones de página: ≤ 800 ms.
- Pinning: máximo 1 pin por bloque/escena.
- Respetar `prefers-reduced-motion`: desactivar Lenis, SplitType y 3D.

## 3D y firmas
- 3D sólo desktop, lazy, una instancia por bloque.
- Peso por escena ≤ 1.5 MB; sin texturas > 512px.

## Accesibilidad y performance
- Skip-link activo; foco visible.
- Contrast AA mínimo.
- Imágenes críticas AVIF/WebP; LCP ≤ 1.8s móvil; INP ≤ 200 ms; CLS ≤ 0.05.

## Telemetría mínima (Plausible)
- `cta:hero:ver-portafolio`, `cta:hero:lead-gen-b2b`.
- `motion:route-transition`, `motion:dealflow-orbit:visible`, `motion:spin-tetra:mounted`.

## Referencias
- Ver `/instructions/*.md` y este `min-spec.md` como fuente de verdad.
