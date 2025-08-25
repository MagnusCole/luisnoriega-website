"use client";

import { useEffect, useRef, useState } from "react";
import { scrollToSection } from "@/shared/motion/scrollers/scrollAnimations";

export function SiteHeader() {
  // Pre-calculate initial state to avoid first paint mismatch
  const [scrolled, setScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > 32);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          const next = window.scrollY > 32;
            // Only set state if value changes to avoid unnecessary re-renders
          setScrolled(prev => (prev !== next ? next : prev));
          ticking.current = false;
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once in case of late mount after scroll
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={
        `fixed top-0 left-0 right-0 z-50
         before:content-[''] before:absolute before:left-0 before:right-0 before:bottom-0 before:h-px
         before:bg-white/10 before:opacity-0
         ${scrolled ? 'backdrop-blur-md bg-black/70 before:opacity-100' : 'bg-black/0'}
         transition-[background-color,backdrop-filter] duration-300 ease-out
         will-change-[background-color,backdrop-filter]
      `
      }
      style={{ borderBottom: '1px solid transparent' }}
    >
      <div className="container flex items-center justify-center h-16 sm:h-20">
  {/* Navegación minimal sólo enlaces (oculta visualmente pero accesible) */}
  <nav aria-label="Navegación principal" className="flex visually-hidden">
          <ul className="flex items-center gap-10 text-sm tracking-wide">
            <li>
              <a
                href="#portfolio"
                onClick={(e)=>{e.preventDefault();scrollToSection('#portfolio');}}
                className="transition-opacity duration-200 text-white/90 hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
              >
                Portfolio
              </a>
            </li>
            <li>
              <a
                href="/quien-es-luis-noriega"
                className="transition-opacity duration-200 text-white/90 hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
              >
                Sobre mí
              </a>
            </li>
            <li>
              <a
                href="mailto:luis@aqxion.com"
                className="transition-opacity duration-200 text-white/90 hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
