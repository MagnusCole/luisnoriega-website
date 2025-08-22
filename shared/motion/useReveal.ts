"use client";
import { useEffect, useRef } from 'react';

interface Options {
  once?: boolean;
  rootMargin?: string;
  threshold?: number | number[];
  className?: string; // class added when visible
}

export function useReveal<T extends HTMLElement>(opts: Options = {}) {
  const { once = true, rootMargin = '0px 0px -5% 0px', threshold = 0.1, className = 'reveal-in' } = opts;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let observed = true;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.classList.add(className);
          if (once) {
            io.unobserve(el);
            observed = false;
          }
        }
      });
    }, { root: null, rootMargin, threshold });
    io.observe(el);
    return () => { if (observed) io.unobserve(el); io.disconnect(); };
  }, [once, rootMargin, threshold, className]);

  return ref;
}
