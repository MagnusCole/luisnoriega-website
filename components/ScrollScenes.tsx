"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Scene = {
  id: string;
  title: string;
  subtitle?: string;
};

interface Props {
  scenes: Scene[];
}

export default function ScrollScenes({ scenes }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return; // Respect accessibility
    const ctx = gsap.context(() => {
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;
      const sections = gsap.utils.toArray<HTMLElement>(".scene");

      sections.forEach((section, index) => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top center",
            end: "bottom center",
            scrub: 0.6,
          },
        });

        tl.fromTo(
          section.querySelector(".scene-title"),
          { yPercent: 20, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1 }
        ).fromTo(
          section.querySelector(".scene-subtitle"),
          { yPercent: 30, opacity: 0 },
          { yPercent: 0, opacity: 0.7, duration: 1 },
          "<0.2"
        );

        // Slight parallax for background accent
        tl.to(
          section.querySelector(".scene-bg"),
          { yPercent: -10, duration: 1 },
          0
        );

        // Pin the middle section for emphasis
  if (isDesktop && index === 1) {
          ScrollTrigger.create({
            trigger: section,
            start: "top top+=20%",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative">
      {scenes.map((s, i) => (
        <div
          key={s.id}
          className="scene container py-28 md:py-40 border-t border-border relative overflow-hidden"
        >
          <div className="scene-bg absolute inset-0 pointer-events-none opacity-20" style={{
            background:
              i % 2 === 0
                ? "radial-gradient(600px 200px at 20% 30%, rgba(255,255,255,0.06), transparent)"
                : "radial-gradient(600px 200px at 80% 40%, rgba(255,255,255,0.06), transparent)",
          }} />
          <h2 className="scene-title text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
            {s.title}
          </h2>
          {s.subtitle && (
            <p className="scene-subtitle mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground">
              {s.subtitle}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
