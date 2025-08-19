"use client";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlossyOrb from "@/components/ui/GlossyOrb";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (!headlineRef.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    if (!reduce && desktop) setShowVideo(true);
    const split = new SplitType(headlineRef.current, { types: "words,chars" });
    const tl = gsap.timeline();
    tl.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      stagger: 0.02,
      ease: "power3.out",
      duration: 0.6,
    });
    return () => {
      split.revert();
      tl.kill();
    };
  }, []);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      gsap.to(".hero-parallax-1", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-parallax-2", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top bottom", end: "bottom top", scrub: true },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero relative overflow-hidden border-b border-border">
      {/* Optional video background (desktop only) */}
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
          autoPlay
          playsInline
          muted
          loop
          preload="none"
          aria-hidden
        >
          <source src="/hero-loop.mp4" type="video/mp4" />
        </video>
      )}
      {/* Parallax accent layers */}
  <div className="hero-parallax-1 pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
  <div className="hero-parallax-2 pointer-events-none absolute -inset-x-10 inset-y-0 bg-[radial-gradient(40%_40%_at_80%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="noise-overlay" />
      <div className="container py-28 md:py-40 relative">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]"
          ref={headlineRef}
        >
          PORTAFOLIO. OPERACIÓN. ADQUISICIÓN.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Presento lo que construyo: producto, operación y adquisiciones. Si quieres colaborar o coinvertir, conversemos.
        </motion.p>
        <div className="mt-10 flex items-center gap-4">
          <Button href="/portafolio" variant="primary">
            Ver portafolio
          </Button>
          <MagneticButton href="/about" className="vf-hover vf-weight inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-medium hover:bg-white/5 transition">
            Sobre mí
          </MagneticButton>
        </div>
        {/* Desktop-only glossy orb accent */}
        <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden>
          <GlossyOrb size={280} />
        </div>
      </div>
    </section>
  );
}
