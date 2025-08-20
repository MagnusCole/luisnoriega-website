"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-background/70 border-b border-border/60 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="font-black tracking-tight text-lg uppercase"
          aria-label="Inicio"
        >
          Luis Noriega
        </Link>

        {/* Navegación */}
        <nav aria-label="Principal">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                href="#about"
                className="hover:opacity-70 transition-opacity"
              >
                Sobre mí
              </Link>
            </li>
            <li>
              <Link
                href="#projects"
                className="hover:opacity-70 transition-opacity"
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className="hover:opacity-70 transition-opacity"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
