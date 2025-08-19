"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

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
    document.body.appendChild(el);
    overlayRef.current = el;
    return () => {
      if (overlayRef.current) {
        overlayRef.current.remove();
        overlayRef.current = null;
      }
    };
  }, []);

  // Animate on route change
  useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !overlayRef.current) return;
    const el = overlayRef.current;
    const tl = gsap.timeline();
    tl.set(el, { clipPath: "inset(0 100% 0 0)" })
      .to(el, { clipPath: "inset(0 0% 0 0)", duration: 0.5, ease: "power3.inOut" })
      .to(el, { clipPath: "inset(0 0 0 100%)", duration: 0.5, ease: "power3.inOut" });
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={containerRef} style={{ willChange: "clip-path, opacity" }}>
      {children}
    </div>
  );
}
