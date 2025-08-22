import { gsap } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

/**
 * Aplica reveal básico a una lista de elementos (fade + translate Y)
 */
export function applyReveal(elements: Element[] | NodeListOf<Element>, opts?: { stagger?: number }) {
  if (PRM()) return;
  const list = Array.from(elements).filter(Boolean);
  gsap.set(list, { opacity: 0, y: 20, willChange: 'transform, opacity' });
  gsap.to(list, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    stagger: opts?.stagger ?? 0.06,
    clearProps: 'will-change'
  });
}

/**
 * Crea animación de subrayado "draw" en hover usando pseudo-elemento via data attr.
 * Requiere que el elemento tenga position: relative en CSS.
 */
export function decorateLinkUnderline(el: HTMLElement) {
  if (!el) return;
  el.classList.add('link-underline');
}

/**
 * Anima respiración sutil para chips/badges.
 */
export function breathe(element: HTMLElement, options?: { amplitude?: number; duration?: number }) {
  if (PRM()) return;
  const amp = options?.amplitude ?? 0.08;
  const dur = options?.duration ?? 2;
  gsap.to(element, {
    opacity: 1 - amp,
    repeat: -1,
    yoyo: true,
    duration: dur,
    ease: 'sine.inOut'
  });
}
