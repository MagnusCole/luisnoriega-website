"use client";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState, type CSSProperties } from "react";
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
  const lightRef = useRef<HTMLDivElement | null>(null);
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

  // Cursor-reactive soft light (desktop only) using GSAP quickTo
  useEffect(() => {
    if (PRM() || !isDesktop() || !lightRef.current) return;
    const el = lightRef.current;
  // animate numeric state, reflect to CSS vars in onUpdate
  const state = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
  const toX = gsap.quickTo(state, "x", { duration: 0.18, ease: "power2.out", onUpdate: () => { gsap.set(el, { "--lx": `${state.x}px` }); } });
  const toY = gsap.quickTo(state, "y", { duration: 0.18, ease: "power2.out", onUpdate: () => { gsap.set(el, { "--ly": `${state.y}px` }); } });
  const onMove = (e: MouseEvent) => { toX(e.clientX); toY(e.clientY); };
    window.addEventListener('mousemove', onMove, { passive: true } as EventListenerOptions);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // SplitType text reveal and portrait blur->sharp
  useEffect(() => {
    if (!headlineRef.current) return;
    const reduce = PRM();
    let cleanup: (() => void) | undefined;
    (async () => {
      const { default: SplitType } = await import("split-type");
      const split = new SplitType(headlineRef.current!, { types: "words,chars" });
      const mm = gsap.matchMedia();
      const ctx = gsap.context(() => {
        if (reduce) {
          // no motion: just ensure visible
          split.revert();
          if (subRef.current) gsap.set(subRef.current, { clearProps: "all" });
          if (portraitRef.current) gsap.set(portraitRef.current, { clearProps: "all", opacity: 1, filter: "none" });
          return;
        }
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(split.chars, {
          yPercent: 120,
          opacity: 0,
          stagger: 0.02,
          duration: 0.6,
        })
        .from(subRef.current, { opacity: 0, y: 14, duration: 0.45, ease: "power2.out" }, "<0.08")
        .to(".hero .cta-reveal", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05 }, "<0.08")
        .fromTo(portraitRef.current, { filter: "blur(10px)", opacity: 0.5 }, { filter: "blur(0px)", opacity: 1, duration: 0.6, ease: "power2.out" }, "<");

        // Desktop-only subtle drift on headline for parallax feel
        mm.add("(min-width: 768px)", () => {
          gsap.to(headlineRef.current, { yPercent: -4, ease: "none", scrollTrigger: { trigger: ".hero", start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
      cleanup = () => { split.revert(); ctx.revert(); mm.kill(); };
    })();
    return () => cleanup?.();
  }, []);

  return (
    <section className="hero relative overflow-hidden border-b border-border">
      {/* Cosmic layered background */}
      <CosmicBackground />
      {/* Cursor light overlay (CSS variables driven) */}
      <div
        ref={lightRef}
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          "--lx": "50%",
          "--ly": "50%",
          background: "radial-gradient(240px 240px at var(--lx) var(--ly), rgba(255,255,255,0.08), transparent 60%)",
        } as CSSProperties & { [key: string]: string }}
      />
      {/* Central connector gradient */}
      {canDecorate && (
        <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[32vw] -translate-x-1/2 bg-[radial-gradient(40%_60%_at_50%_50%,rgba(255,255,255,0.18),transparent_70%)]" aria-hidden />
      )}

      <div className="relative grid grid-cols-1 md:grid-cols-2">
        {/* Left: portrait and copy */}
        <div className="relative order-2 md:order-1">
          <div className="container py-24 md:py-36">
            <h1 ref={headlineRef} className="text-6xl md:text-8xl lg:text-[9rem] font-extrabold tracking-tight leading-[0.9] [-webkit-text-stroke:0.5px_transparent]">
              Yo soy Luis Noriega.
            </h1>
            <p ref={subRef} className="hero-sub mt-7 max-w-3xl text-xl md:text-2xl text-muted-foreground">
              Creo sistemas como otros crean mundos.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Button href="/" variant="primary" className="cta-reveal opacity-0 translate-y-1" onClick={() => { window.plausible?.("cta:hero:cta-1"); }}>
                Empezar
              </Button>
              <MagneticButton href="/" className="cta-reveal vf-hover vf-weight inline-flex items-center justify-center rounded-full border border-border px-5 py-3 font-medium hover:bg-white/5 transition opacity-0 translate-y-1" onClick={() => { window.plausible?.("cta:hero:cta-2"); }}>
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
