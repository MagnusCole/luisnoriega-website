"use client";
import TextScramble from "@/components/ui/TextScramble";
import { useEffect, useState } from "react";
import { PRM } from "@/lib/a11y/prm";

export default function Manifesto() {
  const lines = [
    "No construyo proyectos. Construyo futuros.",
    "Mi misión es expandir la conciencia humana.",
    "Mi obra es el puente entre ciencia y espíritu.",
  ];
  const [index, setIndex] = useState(0);
  const reduce = PRM();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 2800);
    return () => clearInterval(id);
  }, [reduce, lines.length]);

  return (
    <section className="relative border-t border-border">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(113,92,255,0.18),transparent_70%)]" aria-hidden />
      <div className="container relative py-20 md:py-28">
        <h2 className="h3">Manifiesto</h2>
        <p className="mt-8 text-2xl md:text-3xl font-semibold leading-relaxed [text-shadow:0_0_12px_rgba(255,255,255,0.15)]">
          <TextScramble text={lines[index]} />
        </p>
      </div>
    </section>
  );
}
