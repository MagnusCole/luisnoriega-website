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

    const raf = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      requestAnimationFrame(raf);
    };

    window.addEventListener("mousemove", onMove);
    const id = requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-foreground/70 pointer-events-none hidden md:block mix-blend-difference"
      style={{ transform: "translate3d(-9999px, -9999px, 0)", transition: "transform 0.05s linear" }}
    />
  );
}
