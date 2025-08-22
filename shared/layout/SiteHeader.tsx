"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/shared/motion/scrollers/scrollAnimations";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      data-scrolled={scrolled}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "backdrop-blur-md bg-black/60 border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 sm:h-20">
        {/* Logo minimalista */}
        <button
          onClick={() => scrollToSection("#hero")}
          className={`font-light tracking-wider text-xl transition-all duration-200 ${
            scrolled ? "text-white" : "text-white"
          } hover:opacity-70`}
          aria-label="Ir al inicio"
        >
          LN
        </button>

        {/* Navegación simplificada */}
        <nav aria-label="Navegación principal">
          <ul className="flex items-center gap-8 text-sm">
            <li>
              <a
                href="#portfolio"
                onClick={(e)=>{e.preventDefault();scrollToSection('#portfolio');}}
                className={`transition-opacity duration-200 ${
                  scrolled ? "text-white/90" : "text-white/90"
                } hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm`}
              >
                Trabajo
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e)=>{e.preventDefault();scrollToSection('#contact');}}
                className={`transition-opacity duration-200 ${
                  scrolled ? "text-white/90" : "text-white/90"
                } hover:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-sm`}
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
