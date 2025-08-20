# Motion System & QA

## Jerarquía de Interacciones
- Nivel 1 (descubrimiento): reveals suaves (200–300ms)
- Nivel 2 (acción): hover/press con scale(1.02) + shadow morph
- Nivel 3 (navegación): transición de ruta con máscara (700–900ms)
- Nivel 4 (narrativa): scroll-driven (0.6–1.2s), nunca bloquear input

## Tecnologías
- GSAP 3 + ScrollTrigger
- SplitType (titulares stagger por caracteres)
- Lenis (smooth scroll, guardado con prefers-reduced-motion)
- Three.js (lazy, desktop-only, ≤1.5MB escena)

## Firma de Interacción
- **Dealflow Orbit**: canvas puro, representa etapas M&A
  - Orbitas = Buscar → Evaluar → Comprar → Escalar
  - Lazy-load, desktop-only
  - Fallback estático en mobile/PRM

## Performance Budgets
- LCP ≤ 1.8s
- CLS ≤ 0.05
- INP ≤ 200 ms
- JS inicial ≤ 150 KB (gz)
- Imágenes críticas ≤ 150 KB
- Assets 3D ≤ 1.5 MB

## Accesibilidad
- Contraste AA mínimo
- Foco visible en todos los elementos interactivos
- Skip-link en header
- PRM respetado (animaciones off o estáticas)
