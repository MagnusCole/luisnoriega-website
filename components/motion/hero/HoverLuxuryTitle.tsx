"use client";
import { useEffect } from "react";
import { gsap } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export type HoverLuxuryTitleProps = {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
};

export default function HoverLuxuryTitle({ titleRef }: HoverLuxuryTitleProps) {
  useEffect(() => {
    type NetInfoLite = { saveData?: boolean };
    type NavConn = { connection?: NetInfoLite };
    const saveData =
      typeof navigator !== "undefined" && (navigator as Navigator & NavConn).connection?.saveData === true;
    if (PRM() || saveData) return;

    const el = titleRef.current;
    if (!el) return;

    let tween: gsap.core.Tween | null = null;

    const onEnter = () => {
      tween?.kill();
      tween = gsap.to(el, {
        duration: 0.22,
        scale: 1.012,
        y: -1,
        letterSpacing: "0.01em",
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      tween?.kill();
      tween = gsap.to(el, {
        duration: 0.26,
        scale: 1,
        y: 0,
        letterSpacing: "0em",
        ease: "power2.inOut",
      });
    };

    el.addEventListener("mouseenter", onEnter as EventListener, { passive: true } as AddEventListenerOptions);
    el.addEventListener("mouseleave", onLeave as EventListener, { passive: true } as AddEventListenerOptions);

    return () => {
      try { el.removeEventListener("mouseenter", onEnter as EventListener); } catch {}
      try { el.removeEventListener("mouseleave", onLeave as EventListener); } catch {}
      try { tween?.kill(); } catch {}
    };
  }, [titleRef]);

  return null;
}
