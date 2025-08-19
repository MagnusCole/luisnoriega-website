"use client";

import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouch = matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReduced) return;

    const dot = dotRef.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (!el) return;
      if (el.closest("a, button, [role=button]")) {
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.opacity = "0.9";
      } else {
        dot.style.width = "8px";
        dot.style.height = "8px";
        dot.style.opacity = "0.7";
      }
    };

    const raf = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onOver, { passive: true });
    const id = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onOver);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-foreground/70 pointer-events-none hidden md:block mix-blend-difference"
      style={{ transform: "translate3d(-9999px, -9999px, 0)", transition: "transform 0.05s linear, width 120ms ease, height 120ms ease, opacity 120ms ease" }}
    />
  );
}
