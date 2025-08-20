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

export default function SmoothScroller({ children }: Props) {
  useEffect(() => {
    // respect user preferences
    const saveData =
      typeof navigator !== "undefined" &&
      (navigator as Navigator & NavigatorConnection).connection?.saveData === true;

    if (PRM() || saveData) return;

  let smoother: ScrollSmootherInstance | null = null;

    let cancelled = false;

    (async () => {
      try {
        if (cancelled || !ScrollSmoother) return;
        smoother = ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.15,
          normalizeScroll: true,
          effects: true,
          smoothTouch: 0.1,
        }) as unknown as ScrollSmootherInstance;
      } catch {
        // Plugin missing or unsupported - no-op
      }
    })();

    return () => {
      cancelled = true;
      try {
        if (smoother && typeof smoother.kill === "function") {
          smoother.kill();
        }
      } catch {}
    };
  }, []);

  return <>{children}</>;
}
