"use client";
import { useEffect } from "react";
import { ScrollSmoother } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

type Props = {
  children: React.ReactNode;
};

// Site-wide smooth scrolling via GSAP ScrollSmoother
// Gated by PRM (prefers-reduced-motion) and Save-Data
type NetworkInformationLite = { saveData?: boolean };
type NavigatorConnection = { connection?: NetworkInformationLite };
type ScrollSmootherInstance = { kill?: () => void };
type ScrollSmootherStatic = {
  get?: () => ScrollSmootherInstance | null;
  create: (opts: Record<string, unknown>) => ScrollSmootherInstance;
  refresh?: (force?: boolean) => void;
};

export default function SmoothScroller({ children }: Props) {
  useEffect(() => {
    // Respect user preferences
    const saveData =
      typeof navigator !== "undefined" &&
      (navigator as Navigator & NavigatorConnection).connection?.saveData === true;
    if (PRM() || saveData) return;

    // Ensure wrapper/content exist
    const wrapper = document.querySelector('#smooth-wrapper');
    const content = document.querySelector('#smooth-content');
    if (!wrapper || !content) return;

    // Avoid duplicate instances
  const Smoother = ScrollSmoother as unknown as ScrollSmootherStatic;
  let smoother = Smoother.get?.() ?? null;
    if (smoother) {
      return; // already initialized elsewhere
    }

    // Touch detection
    const isTouch = matchMedia('(pointer: coarse)').matches;

    try {
  smoother = Smoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.1, // slightly reduced for stability
        smoothTouch: isTouch ? 0.2 : 0, // softer on touch, off on desktop
        normalizeScroll: true,
        effects: true,
        // reduce overhead
        ignoreMobileResize: true,
      }) as unknown as ScrollSmootherInstance;

      // Refresh handling
      const onResize = () => {
        try {
          Smoother.refresh?.(true);
        } catch {}
      };
      window.addEventListener('resize', onResize, { passive: true });

      return () => {
        window.removeEventListener('resize', onResize);
  try { smoother?.kill?.(); } catch {}
      };
    } catch {
      // Plugin missing or unsupported - no-op
      return;
    }
  }, []);

  return <>{children}</>;
}
