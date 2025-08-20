"use client";
import { useRef, useState } from "react";
import FunctionCallingLoader from "./motion/loaders/FunctionCallingLoader";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    setShowLoader(false);
  };

  return (
    <>
      {showLoader && (
        <FunctionCallingLoader onComplete={handleLoaderComplete} />
      )}
      
      <section ref={sectionRef} className="hero relative flex items-center justify-center min-h-screen text-foreground overflow-hidden z-[2]">
        <div className="container text-center relative z-[10]">
          <h1
            id="hero-title"
            ref={titleRef}
            className="h1 h1-interactive font-black uppercase leading-[0.85] [text-wrap:balance] headline-stroke headline-glow tracking-[-0.02em] relative z-[10]"
          >
            <span className="block">LUIS</span>
            <span className="block">NORIEGA</span>
            <span className="sr-only">LUIS NORIEGA</span>
          </h1>
        </div>
        {/* Scroll cue */}
        <div className="scroll-cue text-foreground/80" aria-hidden>
          <span className="dot" />
        </div>
      </section>
    </>
  );
}
