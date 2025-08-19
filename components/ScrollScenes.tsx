"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const SpinTetra = dynamic(() => import("@/components/ui/SpinTetra"), { ssr: false });

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
        // transition mask element
        const mask = document.createElement('div');
        mask.className = 'scene-mask';
        section.prepend(mask);
        Object.assign(mask.style, {
          position: 'absolute',
          inset: '0',
          background: 'linear-gradient(90deg, rgba(255,255,255,0.06), transparent 30%, transparent 70%, rgba(255,255,255,0.06))',
          mixBlendMode: 'overlay',
          opacity: '0',
          pointerEvents: 'none'
        } as CSSStyleDeclaration);

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
        ).fromTo(
          mask,
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0
        ).to(mask, { opacity: 0, duration: 0.3 }, ">-0.2");

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
          {/* Desktop-only micro 3D accent in middle scene */}
          {i === 1 && (
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden>
              <SpinTetra />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
