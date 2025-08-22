"use client";
import Link from "next/link";
import { useFooterReveal } from "../motion";
import { scrollToSection } from "../motion/scrollers/scrollAnimations";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { rootRef, titleRef, linksRef, bottomRef } = useFooterReveal();

  return (
    <footer
      ref={rootRef}
      role="contentinfo"
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden"
    >
      {/* Título minimalista */}
      <h2
        ref={titleRef}
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
      <div ref={linksRef} className="mt-10 flex flex-col items-center gap-4 text-base">
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80" aria-label="Navegación de secciones">
          <a href="#hero" onClick={(e)=>{e.preventDefault();scrollToSection('#hero');}} className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm">Inicio</a>
          <a href="#portfolio" onClick={(e)=>{e.preventDefault();scrollToSection('#portfolio');}} className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm">Portfolio</a>
          <a href="#contact" onClick={(e)=>{e.preventDefault();scrollToSection('#contact');}} className="underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm">Contacto</a>
        </nav>
      </div>

      {/* Footer mínimo */}
      <div ref={bottomRef} className="absolute bottom-8 w-full">
        <div className="flex flex-col items-center gap-4 text-xs text-white/40">
          <p>© {year} Luis Noriega</p>
          <div className="flex items-center gap-3">
            <span className="text-white/50">Hecho con ❤️ por Luis</span>
            <span className="text-white/30">·</span>
            <Link href="/sitemap.xml" className="hover:text-white/60 transition-colors">
              Sitemap
            </Link>
            <span className="text-white/30">·</span>
            <span>Lima, Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
