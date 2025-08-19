"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Counter from "@/components/ui/Counter";

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioStories() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        document.querySelectorAll<HTMLElement>(".story").forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top top+=10%",
            end: "+=120%",
            pin: true,
            pinSpacing: true,
          });
          gsap.fromTo(
            el.querySelector(".story-title"),
            { yPercent: 20, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } }
          );
          gsap.fromTo(
            el.querySelector(".story-media"),
            { yPercent: 10, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 70%" } }
          );
        });
      });
    }, ref);
    return () => { ctx.revert(); mm.revert(); };
  }, []);

  return (
    <div ref={ref} className="mt-12 space-y-24">
      {/* AQXION story */}
      <section id="caso-aqxion" className="story border-t border-border pt-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <h2 className="story-title h4">AQXION — Holding de adquisición</h2>
            <p className="body mt-4 text-muted-foreground max-w-2xl">Problema → Tesis → Sistema → Resultado.</p>
            <ul className="mt-6 grid grid-cols-2 gap-4">
              <li>
                <p className="caption">Holdings</p>
                <p className="h5"><Counter to={1} /></p>
              </li>
              <li>
                <p className="caption">Empresas</p>
                <p className="h5"><Counter to={2} /></p>
              </li>
            </ul>
          </div>
          <div className="story-media md:col-span-6 relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={`/og?title=${encodeURIComponent("AQXION Holding")}&kpi=${encodeURIComponent("2 Empresas")}`}
              alt="AQXION preview"
              fill
              sizes="(min-width: 768px) 640px, 100vw"
              priority={false}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* B2B Lead-Gen story */}
      <section id="caso-b2b" className="story border-t border-border pt-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-6">
            <h2 className="story-title h4">Lead‑Gen B2B — Automatización</h2>
            <p className="body mt-4 text-muted-foreground max-w-2xl">Problema → Sistema → Resultado.</p>
            <ul className="mt-6 grid grid-cols-2 gap-4">
              <li>
                <p className="caption">SQL</p>
                <p className="h5"><Counter to={35} prefix="+" suffix="%" /></p>
              </li>
              <li>
                <p className="caption">CAC</p>
                <p className="h5"><Counter to={18} prefix="-" suffix="%" /></p>
              </li>
            </ul>
          </div>
          <div className="story-media md:col-span-6 relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <Image
              src={`/og?title=${encodeURIComponent("Lead‑Gen B2B")}&kpi=${encodeURIComponent("+35% SQL")}`}
              alt="Lead‑Gen preview"
              fill
              sizes="(min-width: 768px) 640px, 100vw"
              priority={false}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
