## Checklist anti-drift

- [ ] PRM respetado (Lenis off, SplitType/3D off bajo `prefers-reduced-motion`)
- [ ] Pin único por bloque (no más de 1 `ScrollTrigger` con `pin: true` por sección)
- [ ] Sin 3D duplicado en la misma sección (SpinTetra/FloatingIco)
- [ ] Route-mask ≤ 800ms (medido; sin lag innecesario)
- [ ] Navbar mantiene Home / Portafolio / Hablemos visibles
- [ ] Lighthouse móvil ≥ 90; axe sin críticos
- [ ] No hay imports directos de `gsap`/`gsap/ScrollTrigger` fuera de `lib/motion/gsap`
- [ ] No hay imports de `three` fuera de `components/three/*`

## Resumen del cambio

## Evidencia rápida
- Lighthouse / axe (enlace o captura)
- Tamaños de bundle y First Load JS
- Eventos de Plausible relevantes

## Notas
- Referencia: `docs/min-spec.md` y `instructions/*.md`
