"use client";
import { useEffect, useRef } from "react";
import { gsap, initGSAP } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export default function BuyBuildScale() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => { initGSAP(); }, []);
  useEffect(() => {
  if (PRM() || !ref.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.from(".bbs-node", { y: 20, opacity: 0, duration: 0.4, stagger: 0.08 })
        .from(".bbs-line", { scaleX: 0, transformOrigin: "left", duration: 0.5 }, "<0.05")
        .from(".bbs-kpi", { opacity: 0, y: 8, duration: 0.3, stagger: 0.05 }, "<0.1");
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={ref} className="container py-16">
      <h2 className="h3">Tesis: Buy → Build → Scale</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
        <div className="bbs-node">
          <h3 className="h5">Buy</h3>
          <p className="text-muted-foreground mt-2">PYMES rentables, due diligence, estructura.</p>
          <p className="bbs-kpi caption mt-1">Dealflow calificado</p>
        </div>
        <div className="bbs-line h-px bg-white/20 w-full" />
        <div className="bbs-node">
          <h3 className="h5">Build</h3>
          <p className="text-muted-foreground mt-2">Operación, procesos, tecnología, cultura.</p>
          <p className="bbs-kpi caption mt-1">Mejora operativa</p>
        </div>
        <div className="bbs-line h-px bg-white/20 w-full" />
        <div className="bbs-node">
          <h3 className="h5">Scale</h3>
          <p className="text-muted-foreground mt-2">Crecimiento orgánico y M&A táctico.</p>
          <p className="bbs-kpi caption mt-1">Valor compuesto</p>
        </div>
      </div>
    </section>
  );
}
