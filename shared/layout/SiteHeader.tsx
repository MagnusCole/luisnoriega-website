"use client";

import { useEffect, useState } from "react";
import { scrollToSection } from "@/shared/motion/scrollers/scrollAnimations";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      data-scrolled={scrolled}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "backdrop-blur-xl bg-background/80 border-b border-border/40 shadow-lg shadow-background/10"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("#hero")}
          className={`font-light tracking-tight text-lg uppercase transition-all duration-300 hover:scale-105 ${
            scrolled ? "text-foreground" : "text-white drop-shadow-lg"
          }`}
          aria-label="Ir al inicio"
        >
          LN
        </button>

        {/* Navegación */}
        <nav aria-label="Principal">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <button
                onClick={() => scrollToSection("#bio")}
                className={`transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? "text-foreground/80 hover:text-foreground" 
                    : "text-white/80 hover:text-white drop-shadow-lg"
                }`}
              >
                About
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("#projects")}
                className={`transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? "text-foreground/80 hover:text-foreground" 
                    : "text-white/80 hover:text-white drop-shadow-lg"
                }`}
              >
                Work
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("#books")}
                className={`transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? "text-foreground/80 hover:text-foreground" 
                    : "text-white/80 hover:text-white drop-shadow-lg"
                }`}
              >
                Books
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("#contact")}
                className={`transition-all duration-300 hover:scale-105 ${
                  scrolled 
                    ? "text-foreground/80 hover:text-foreground" 
                    : "text-white/80 hover:text-white drop-shadow-lg"
                }`}
              >
                Contact
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
