"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (PRM()) return;
  const isMobile = matchMedia("(max-width: 767px)").matches;
  const lenis = new Lenis({ lerp: isMobile ? 0.07 : 0.08, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
