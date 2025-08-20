"use client";
import { PRM } from "@/lib/a11y/prm";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

export default function BackgroundSlowGradient() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    type NetInfoLite = { saveData?: boolean };
    type NavConn = { connection?: NetInfoLite };
    const saveData =
      typeof navigator !== "undefined" && (navigator as Navigator & NavConn).connection?.saveData === true;
    if (PRM() || saveData) return;

    if (!ref.current) return;
    // Subtle, slow pan via GSAP to avoid CSS animation conflicts
    const tween = gsap.to(ref.current, {
      duration: 36,
      xPercent: -1.5,
      yPercent: 1.5,
      scale: 1.02,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      try { tween?.kill(); } catch {}
    };
  }, []);
  return <div ref={ref} aria-hidden className="hero-bg-gradient" />;
}
