"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { maskTransition } from "@/lib/motion/contracts";

declare global { interface Window { plausible?: (event: string, options?: Record<string, unknown>) => void } }

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Ensure overlay exists once
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    if (overlayRef.current) return;
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.style.position = "fixed";
    el.style.inset = "0";
    el.style.zIndex = "9999";
    el.style.background = "black";
    el.style.clipPath = "inset(0 100% 0 0)";
  el.style.pointerEvents = "none";
  el.style.willChange = "clip-path";
    document.body.appendChild(el);
    overlayRef.current = el;
    return () => {
      if (overlayRef.current) {
        overlayRef.current.remove();
        overlayRef.current = null;
      }
    };
  }, []);

  // Animate on route change using contract
  useEffect(() => {
    if (!overlayRef.current) return;
    const { cancel } = maskTransition({
      overlayEl: overlayRef.current,
      durationIn: 0.45,
      durationOut: 0.4,
      onComplete: () => { window.plausible?.("motion:route-transition"); },
    });
    return () => cancel();
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ willChange: "clip-path, opacity" }}>
      {children}
    </div>
  );
}
