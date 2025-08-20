"use client";
import { useRef } from "react";
import TitleRevealParallax from "@/components/motion/hero/TitleRevealParallax";
import BackgroundSlowGradient from "@/components/motion/BackgroundSlowGradient";
import CursorSpotlight from "@/components/motion/CursorSpotlight";
import HoverLuxuryTitle from "@/components/motion/hero/HoverLuxuryTitle";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // Motion snippet (SplitText reveal + parallax), PRM/save-data gated internamente
  // Se monta como JSX para manejar efectos/cleanup

  return (
    <section ref={sectionRef} className="hero relative flex items-center justify-center min-h-screen text-foreground overflow-hidden">
      {/* Background gradient with imperceptible motion */}
      <BackgroundSlowGradient />
      {/* Cursor spotlight (desktop only) */}
      <CursorSpotlight />
      {/* Subtle grain overlay */}
      <div aria-hidden className="noise-overlay" />
      <TitleRevealParallax sectionRef={sectionRef as React.RefObject<HTMLElement | null>} titleRef={titleRef as React.RefObject<HTMLHeadingElement | null>} />
  <HoverLuxuryTitle titleRef={titleRef as React.RefObject<HTMLHeadingElement | null>} />
      <div className="container text-center">
  <h1
          ref={titleRef}
          className="h1 h1-interactive font-black uppercase leading-[0.9] [text-wrap:balance] headline-stroke headline-glow tracking-[0.01em] relative z-[2]"
        >
          <span className="block">LUIS</span>
          <span className="block">NORIEGA</span>
        </h1>
      </div>
      {/* Scroll cue */}
      <div className="scroll-cue text-foreground/80" aria-hidden>
        <span className="dot" />
      </div>
    </section>
  );
}
