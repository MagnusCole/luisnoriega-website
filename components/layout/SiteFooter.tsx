"use client";
import Link from "next/link";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative min-h-screen flex flex-col items-center justify-center text-center border-t border-border bg-black text-white"
    >
      {/* Nombre gigante */}
      <h2
        className="font-black uppercase tracking-tight leading-[0.9] [text-wrap:balance]"
        style={{
          fontSize: "clamp(3rem, 8vw, 8rem)",
          WebkitTextStrokeWidth: "0.5px",
          WebkitTextStrokeColor: "rgba(255,255,255,0.15)",
        }}
      >
        Luis Noriega
      </h2>

      {/* Subtexto */}
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Construyendo entre la materia y el infinito.
      </p>

      {/* Enlaces */}
      <div className="mt-10 flex gap-6 text-base">
        <Link href="/" className="underline-offset-4 hover:underline">Inicio</Link>
        <Link href="/about" className="underline-offset-4 hover:underline">Sobre mí</Link>
        <Link href="/contact" className="underline-offset-4 hover:underline">Contacto</Link>
      </div>

      {/* Línea inferior */}
      <div className="absolute bottom-6 w-full text-sm text-muted-foreground">
        <p>© {year} Luis Noriega. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
