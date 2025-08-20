"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Particles2D from "@/components/canvas/Particles2D";

gsap.registerPlugin(ScrollTrigger);

export default function Why() {
  const ref = useRef<HTMLElement | null>(null);
  const headRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const ctx = gsap.context(() => {
      if (headRef.current && !reduce) {
        const split = new SplitType(headRef.current, { types: "words" });
        gsap.from(split.words, { yPercent: 120, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" });
      }
      if (isDesktop && !reduce && ref.current) {
        ScrollTrigger.create({ trigger: ref.current, start: "top top+=10%", end: "+=120%", pin: true, pinSpacing: true });
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-border py-20 md:py-28">
      <Particles2D className="absolute inset-0" opacity={0.08} density={0.06} speed={0.25} />
      <div className="container relative">
        <h2 ref={headRef} className="h2 max-w-4xl">
          Construimos holdings que trascienden generaciones. Compramos empresas sanas, las profesionalizamos y las hacemos crecer.
        </h2>
        <p className="body mt-6 max-w-2xl text-muted-foreground">
          Disciplina operativa, tecnología y capital inteligente. Ejecutamos playbooks probados para mejorar márgenes, procesos y gobierno.
        </p>
        <blockquote className="mt-10 border-l-2 border-border pl-6 text-lg">
          &ldquo;Buy then Build con ejecución obsesiva. Sin promesas vacías. Resultados compuestos.&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
