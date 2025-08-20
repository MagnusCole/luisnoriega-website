"use client";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import { gsap, initGSAP } from "@/lib/motion/gsap";
import { PRM, isDesktop, isTouch } from "@/lib/a11y/prm";
import dynamic from "next/dynamic";
const Particles2D = dynamic(() => import("@/components/canvas/Particles2D"), { ssr: false, loading: () => null });
const CosmicBackground = dynamic(() => import("@/components/motion/CosmicBackground"), { ssr: false, loading: () => null });

declare global {
  interface Window { plausible?: (event: string, options?: Record<string, unknown>) => void }
}


export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const subRef = useRef<HTMLParagraphElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const [canDecorate, setCanDecorate] = useState(false);

  useEffect(() => { initGSAP(); }, []);

  // Determine decoration availability once
  useEffect(() => {
    const reduce = PRM();
    const desktop = isDesktop();
    type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    setCanDecorate(!reduce && desktop && !saveData && !isTouch());
  }, []);

  // SplitType text reveal and portrait blur->sharp
  useEffect(() => {
    if (!headlineRef.current) return;
    const reduce = PRM();
    let cleanup: (() => void) | undefined;
    (async () => {
      const { default: SplitType } = await import("split-type");
      const split = new SplitType(headlineRef.current!, { types: "words,chars" });
      const tl = gsap.timeline();
      if (!reduce) {
        tl.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          stagger: 0.02,
          ease: "power3.out",
          duration: 0.6,
        });
        if (subRef.current) tl.from(subRef.current, { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, "<0.05");
        if (portraitRef.current) tl.fromTo(portraitRef.current, { filter: "blur(8px)", opacity: 0.6 }, { filter: "blur(0px)", opacity: 1, duration: 0.6, ease: "power2.out" }, "<");
      }
      cleanup = () => { split.revert(); tl.kill(); };
    })();
    return () => cleanup?.();
  }, []);

  return (
    <section className="hero relative overflow-hidden border-b border-border">
      {/* Cosmic layered background */}
      <CosmicBackground />
      {/* Central connector gradient */}
      {canDecorate && (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[32vw] -translate-x-1/2 bg-[radial-gradient(40%_60%_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]" aria-hidden />
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {/* Left: portrait and copy */}
        <div className="relative order-2 md:order-1">
          <div className="container py-24 md:py-36">
            <h1 ref={headlineRef} className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]">
              Yo soy Luis Noriega.
            </h1>
            <p ref={subRef} className="hero-sub mt-6 max-w-2xl text-lg text-muted-foreground">
              Creo sistemas como otros crean mundos.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Button href="/portafolio" variant="primary" onClick={() => { window.plausible?.("cta:hero:ver-portafolio"); }}>
                Explora mi trabajo
              </Button>
              <MagneticButton href="#scroll-next" className="vf-hover vf-weight inline-flex items-center justify-center rounded-full border border-border px-5 py-3 font-medium hover:bg-white/5 transition" onClick={() => { window.plausible?.("cta:hero:scroll-next"); }}>
                <span className="mr-2">Scroll</span>
                <span className="relative inline-block h-4 w-4 overflow-hidden rounded-full border border-current">
                  <span className="absolute left-1/2 top-0 h-2 w-0.5 -translate-x-1/2 animate-bounce bg-current" />
                </span>
              </MagneticButton>
            </div>
          </div>
          {/* Portrait art side (kept subtle) */}
          <div className="absolute inset-y-0 right-0 hidden md:block" aria-hidden>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_20%_50%,rgba(255,255,255,0.10),transparent_60%)]" />
            <div ref={portraitRef} className="absolute right-0 top-1/2 -translate-y-1/2 w-[46vw] max-w-[560px] aspect-[3/4] rounded-2xl opacity-90 bg-[radial-gradient(60%_60%_at_50%_30%,rgba(255,255,255,0.18),transparent_70%)] shadow-[inset_0_0_120px_rgba(255,255,255,0.08)] grayscale" />
          </div>
        </div>

        {/* Right: generative particles */}
        <div className="relative order-1 md:order-2 min-h-[40vh] md:min-h-[72vh]">
          {canDecorate && (
            <Particles2D className="absolute inset-0" density={0.1} speed={0.35} opacity={0.14} reactToCursor influenceRadius={140} linkLines />
          )}
          {/* Light grain */}
          <div className="noise-overlay absolute inset-0" aria-hidden />
        </div>
      </div>
    </section>
  );
}
