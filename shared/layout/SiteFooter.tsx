"use client";
import Link from "next/link";
import { scrollToSection } from "../motion/scrollers/scrollAnimations";

export function SiteFooter() {
  const year = new Date().getFullYear();
  // Unified reveal system via data attributes

  return (
    <footer
      role="contentinfo"
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Título minimalista */}
      <h2
        className="font-light uppercase leading-[0.9] [text-wrap:balance]"
        style={{
          fontSize: "clamp(3rem, 8vw, 8rem)",
          WebkitTextStrokeWidth: "0.5px",
          WebkitTextStrokeColor: "rgba(255,255,255,0.25)",
        }}
      >
        FIN
      </h2>

      {/* Navegación minimalista */}
  <div className="mt-10 flex flex-col items-center gap-4 text-base">
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80" aria-label="Navegación de secciones">
          <a href="#hero" onClick={(e)=>{e.preventDefault();scrollToSection('#hero');}} className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm">Inicio</a>
          <a href="#portfolio" onClick={(e)=>{e.preventDefault();scrollToSection('#portfolio');}} className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm">Portfolio</a>
          <a href="mailto:luis@aqxion.com" className="inline-flex items-center gap-1 rounded-full px-4 py-1.5 bg-white text-black font-medium hover:opacity-85 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60">
            Contacto
          </a>
        </nav>
      </div>

      {/* Footer mínimo */}
  <div className="absolute bottom-8 w-full">
        <div className="flex flex-col items-center gap-4 text-xs text-white/40">
          <p>© {year} Luis Noriega</p>
          <div className="flex items-center gap-3">
            <span className="text-white/50">Hecho con ❤️ por Luis</span>
            <span className="text-white/30">·</span>
            <Link href="/sitemap.xml" className="hover:text-white/60 transition-colors">
              Sitemap
            </Link>
            <span className="text-white/30">·</span>
            <Link href="/facts" className="hover:text-white/60 transition-colors">
              Datos verificados
            </Link>
            <span className="text-white/30">·</span>
            <span className="text-white/40">Lima, Perú · luisnoriega.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
