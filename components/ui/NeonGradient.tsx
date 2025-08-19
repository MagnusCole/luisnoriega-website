"use client";

import { useEffect, useRef } from "react";

export default function NeonGradient({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;
    const el = ref.current;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.005;
      const x = Math.sin(t) * 40 + 50;
      const y = Math.cos(t * 0.8) * 40 + 50;
      el.style.background = `radial-gradient(60% 60% at ${x}% ${y}%, rgba(255,255,255,0.10), transparent 60%),
        conic-gradient(from ${t*20}deg, rgba(255,0,128,0.18), rgba(0,180,255,0.18), rgba(255,230,0,0.18), rgba(255,0,128,0.18))`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <div ref={ref} className={`absolute inset-0 opacity-60 mix-blend-screen ${className}`} aria-hidden />;
}
