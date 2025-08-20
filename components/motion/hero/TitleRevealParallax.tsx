"use client";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export type TitleRevealParallaxProps = {
  sectionRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLElement | null>;
};

// Minimal types to avoid 'any'
type NetInfoLite = { saveData?: boolean };
type NavConn = { connection?: NetInfoLite };

type SplitTextInstance = { chars?: Element[]; revert?: () => void };
type SplitTextCtor = new (
  element: Element,
  options?: { type?: string; wordsClass?: string; charsClass?: string }
) => SplitTextInstance;

export default function TitleRevealParallax({ sectionRef, titleRef }: TitleRevealParallaxProps) {
  useGSAP(
    () => {
      const saveData =
        typeof navigator !== "undefined" &&
        (navigator as Navigator & NavConn).connection?.saveData === true;
      if (PRM() || saveData) return;

      // Intro lift (slight)
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power2.out",
      });

      // Keep references for cleanup
      const triggers: ScrollTrigger[] = [];
      let splitRevert: (() => void) | null = null;

      // SplitText reveal
      if (titleRef.current && SplitText) {
        let split: SplitTextInstance | null = null;
        try {
          const Ctor = SplitText as unknown as SplitTextCtor;
          split = new Ctor(titleRef.current, {
            type: "chars,words",
            wordsClass: "word",
            charsClass: "char",
          });
          splitRevert = () => {
            try { split?.revert?.(); } catch {}
          };
        } catch {}

        if (split?.chars?.length) {
          // Delay subtle, luxury stagger
          gsap.from(split.chars, {
            opacity: 0,
            yPercent: 20,
            duration: 0.6,
            ease: "power2.out",
            stagger: { each: 0.015, from: "start" },
            delay: 0.15,
          });
        }
      }

      // Parallax bi-directional around resting point (feel of depth)
      if (titleRef.current && ScrollTrigger) {
        gsap.fromTo(
          titleRef.current,
          { yPercent: 3, immediateRender: false },
          {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
  // We rely on global cleanup by killing all triggers we create explicitly below

        // Optional premium entrance: pin briefly so the H1 holds for ~1s
        const pin = ScrollTrigger.create({
          trigger: sectionRef.current!,
          start: "top top",
          end: "+=10%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
        triggers.push(pin);

        // Ensure ScrollSmoother picks up these triggers
        // Small async refresh after creation
        requestAnimationFrame(() => {
          try { ScrollTrigger.refresh(); } catch {}
        });
        // Also refresh on resize to keep positions synced with Smoother
        const onResize = () => { try { ScrollTrigger.refresh(); } catch {} };
        window.addEventListener("resize", onResize);
        triggers.push({ kill: () => window.removeEventListener("resize", onResize) } as unknown as ScrollTrigger);
      }

      // Unified cleanup
      return () => {
        try { splitRevert?.(); } catch {}
        triggers.forEach(t => {
          try { t.kill(); } catch {}
        });
      };
    },
    { scope: sectionRef }
  );

  return null;
}
