"use client";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (PRM()) return;
  type LenisLike = { raf: (t: number) => void; destroy: () => void };
  let lenis: LenisLike | null = null;
    let mounted = true;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (!mounted) return;
      const isMobile = matchMedia("(max-width: 767px)").matches;
      lenis = new Lenis({ lerp: isMobile ? 0.07 : 0.08, smoothWheel: true });
      loop(0);
    };
    let raf = 0;
    const loop = (time: number) => {
      if (lenis) lenis.raf(time);
      ScrollTrigger.update();
      raf = requestAnimationFrame(loop);
    };
    start();
    const onVis = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mounted = false;
      document.removeEventListener("visibilitychange", onVis);
      cancelAnimationFrame(raf);
  if (lenis) lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
