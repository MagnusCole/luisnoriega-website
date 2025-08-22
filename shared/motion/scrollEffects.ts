"use client";
import { useEffect, useRef } from 'react';
import { PRM } from '@/lib/a11y/prm';

// Single intersection observer for all [data-reveal]
let globalObserver: IntersectionObserver | null = null;
const revealed = new WeakSet<Element>();

function getObserver() {
  if (globalObserver) return globalObserver;
  globalObserver = new IntersectionObserver((entries) => {
    for (const e of entries) {
      const el = e.target as HTMLElement;
      if (e.isIntersecting) {
        if (!revealed.has(el)) {
          // apply delay via attribute if present
          const delayAttr = el.getAttribute('data-reveal-delay');
          if (delayAttr) {
            const delay = parseInt(delayAttr, 10);
            if (!Number.isNaN(delay)) {
              el.style.transitionDelay = delay + 'ms';
            }
          }
          el.classList.add('is-in');
          revealed.add(el);
        }
        globalObserver?.unobserve(el);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 });
  return globalObserver;
}

export function useScrollReveal() {
  const scopeRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (PRM()) return; // respect reduced motion
    const root = scopeRef.current;
    if (!root) return;
    // Assign automatic delays for groups before observing
    const groups = root.querySelectorAll<HTMLElement>('[data-reveal-group]');
    groups.forEach(group => {
      const base = parseInt(group.getAttribute('data-reveal-group-base') || '0', 10) || 0;
      const step = parseInt(group.getAttribute('data-reveal-group-step') || '120', 10) || 120;
      let i = 0;
      group.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
        if (!el.hasAttribute('data-reveal-delay')) {
          el.setAttribute('data-reveal-delay', String(base + i * step));
        }
        i++;
      });
    });
    const observer = getObserver();
    const nodes = root.querySelectorAll<HTMLElement>('[data-reveal]');
    nodes.forEach(n => observer.observe(n));
    return () => {
      nodes.forEach(n => observer.unobserve(n));
    };
  }, []);
  return scopeRef;
}

// Parallax management: single rAF loop mutating transforms based on speed
let ticking = false;
const parallaxItems = new Set<{ el: HTMLElement; speed: number }>();

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const vh = window.innerHeight;
    parallaxItems.forEach(({ el, speed }) => {
      const rect = el.getBoundingClientRect();
      const dy = rect.top - vh * 0.5; // center-based offset
      const translateY = dy * speed;
      el.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0)`;
    });
    ticking = false;
  });
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', onScroll, { passive: true });
}

export function useParallax(speed = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (PRM()) return; // disable parallax for reduced motion
    const el = ref.current;
    if (!el) return;
    parallaxItems.add({ el, speed });
    return () => {
      parallaxItems.forEach(item => { if (item.el === el) parallaxItems.delete(item); });
    };
  }, [speed]);
  return ref;
}

// Scroll progress bar update
if (typeof window !== 'undefined') {
  const updateProgress = () => {
    const doc = document.documentElement;
    const scrolled = (doc.scrollTop || document.body.scrollTop);
    const height = (doc.scrollHeight - doc.clientHeight);
    const progress = height > 0 ? scrolled / height : 0;
    doc.style.setProperty('--scroll-progress', progress.toString());
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  requestAnimationFrame(updateProgress);
}
