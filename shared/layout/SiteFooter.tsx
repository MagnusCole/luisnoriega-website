"use client";
import Link from "next/link";
import { useFooterReveal } from "@/shared/motion";
import { scrollToSection } from "@/shared/motion/scrollers/scrollAnimations";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const { rootRef, titleRef, linksRef, bottomRef } = useFooterReveal();

  return (
    <footer
      ref={rootRef}
      role="contentinfo"
      className="relative min-h-screen flex flex-col items-center justify-center text-center border-t border-border bg-black text-white"
    >
  {/* Fondo limpio: sin partículas */}
      {/* Barra de progreso de scroll (decorativa) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden"
      >
        <div
          className="h-full bg-white/70 origin-left transform-gpu"
          style={{ transform: "scaleX(var(--scroll-progress, 0))" }}
        />
      </div>
      {/* Nombre gigante */}
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

      {/* CTA + Navegación secundaria */}
      <div ref={linksRef} className="mt-10 flex flex-col items-center gap-4 text-base">
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
          <button type="button" onClick={() => scrollToSection('#hero')} className="underline-offset-4 hover:underline">Inicio</button>
          <button type="button" onClick={() => scrollToSection('#bio')} className="underline-offset-4 hover:underline">Bio</button>
          <button type="button" onClick={() => scrollToSection('#projects')} className="underline-offset-4 hover:underline">Proyectos</button>
          <button type="button" onClick={() => scrollToSection('#books')} className="underline-offset-4 hover:underline">Libros</button>
          <button type="button" onClick={() => scrollToSection('#certifications')} className="underline-offset-4 hover:underline">Certificaciones</button>
          <button type="button" onClick={() => scrollToSection('#contact')} className="underline-offset-4 hover:underline">Contacto</button>
        </nav>
      </div>

      {/* Línea inferior */}
      <div ref={bottomRef} className="absolute bottom-6 w-full text-sm text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <p>© {year} Luis Noriega. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-white/50">Hecho con ❤️ por Luis</span>
            <span className="text-white/30">·</span>
            <Link href="/sitemap.xml" className="underline-offset-4 hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
