# quality.instructions.md — System Prompt para **Mantener la Calidad del Proyecto**

> **Propósito:** Garantizar que el proyecto `luisnoriega.com` mantenga un estándar de **calidad mundial**, accesible, consistente y digno de Awwwards.  
> **Meta:** Que cualquier agente LLM o humano siga las mismas reglas para no comprometer estética, accesibilidad ni orden.

---

## 1) Convenciones de Layout
- Siempre debe existir un **skip-link** en `layout.tsx` que apunte a `<main id="contenido">`.  
- Solo **un `<h1>` por página**.  
- El `<header>` debe ser sticky con borde visible al hacer scroll (`header[data-scroll="true"]`).  
- El `<footer>` es minimal, sin navegación redundante.  

---

## 2) SEO y Metadata
- Prohibido incluir valores `undefined` en JSON-LD.  
- `sitemap.xml` solo debe listar rutas reales (no legacy).  
- `robots.txt` siempre enlaza al sitemap correcto.  
- Cada página define `title` y `description` en `metadata`.  
- OG/Twitter images deben estar siempre configuradas.  

---

## 3) Accesibilidad
- Todo `<a>` tiene `aria-label` si el texto no es autodescriptivo.  
- Botones con loading → usar `aria-busy`.  
- Feedback dinámico → usar `aria-live="polite"`.  
- Navegación principal → `<nav aria-label="Principal">`.  
- Tokens de color (`globals.css`) deben respetar contraste **AA mínimo**.  

---

## 4) Motion (Animaciones)
- Animaciones siempre condicionadas por `PRM()` (prefers-reduced-motion).  
- Duraciones estándar:  
  - Hover/Focus: ≤200ms.  
  - Reveals (texto/hero): 400–600ms.  
  - Page transitions: ≤900ms.  
- GSAP siempre importado desde `lib/motion/gsap.ts`.  
- Framer Motion solo para microinteracciones (hover, fade), nunca scroll.  

---

## 5) QA Continua
- Ejecutar `npm run qa` en cada commit (lint + typecheck + depcruise).  
- Ejecutar `npm run analyze:deps` semanalmente para detectar imports innecesarios.  
- Nuevas rutas → actualizar `sitemap.xml` y `metadata`.  
- Nuevas animaciones → revisar accesibilidad (PRM + performance).  

---

## 6) Estructura y Orden
- Componentes globales (Header, Footer, Navigation) → `components/layout/`.  
- UI atómica (botones, inputs, cards) → `components/ui/`.  
- Animaciones/motion patterns → `components/motion/`.  
- Canvas/WebGL → `components/canvas/`.  
- Helpers y funciones puras → `lib/`.  
- Prompts y reglas de IA → `instructions/`.  
- Assets estáticos (logos, imágenes) → `public/`.  

---

## 7) Optimización Continua
- **Cada sprint**:  
  - Revisar dependencias (`npm run unused`).  
  - Eliminar archivos huérfanos.  
  - Validar Lighthouse/axe (>95 en SEO + A11y).  
- **Al agregar código nuevo**:  
  - ¿Está en la carpeta correcta?  
  - ¿Cumple naming convention?  
  - ¿Cumple con accesibilidad mínima?  

---

### ✅ Checklist rápido
- [ ] Skip-link y `<main>` presentes.  
- [ ] Metadata y JSON-LD válidos.  
- [ ] SEO + A11y >95 en Lighthouse.  
- [ ] Animaciones gateadas por PRM.  
- [ ] Estructura de carpetas respetada.  
- [ ] QA (`npm run qa`) en verde.  

---

**Fin — Este archivo define el estándar de calidad obligatorio.**
