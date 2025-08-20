"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export default function SplitRevealTransition() {
  useEffect(() => {
    // Respect PRM/Save-Data
    type NetInfoLite = { saveData?: boolean };
    type NavConn = { connection?: NetInfoLite };
    const saveData =
      typeof navigator !== "undefined" && (navigator as Navigator & NavConn).connection?.saveData === true;
    if (PRM() || saveData) return;

    const hero = document.querySelector('.hero') as HTMLElement | null;
    const luisSpan = document.querySelector('.h1-interactive span:nth-child(1)') as HTMLElement | null;
    const noriegaSpan = document.querySelector('.h1-interactive span:nth-child(2)') as HTMLElement | null;
    if (!hero || !luisSpan || !noriegaSpan) return;

    // Minimal initial state
    gsap.set([luisSpan, noriegaSpan], { willChange: "transform" });

    const tl = gsap.timeline({ defaults: { ease: "none" } })
      .to(luisSpan, { y: -400 }, 0)
      .to(noriegaSpan, { y: 400 }, 0);

    const st = ScrollTrigger.create({
      trigger: hero,
      start: "top center",
      end: "bottom center",
      scrub: 0.8,
      invalidateOnRefresh: true,
      animation: tl,
      markers: false,
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, []);

  return null;
}
