import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type FooterRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  linksRef: React.RefObject<HTMLDivElement | null>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * Hook to animate the footer on reveal using GSAP.
 * Honors prefers-reduced-motion and scopes animations to the root.
 */
export function useFooterReveal(): FooterRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const linksRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (PRM()) return; // Skip animations when reduced-motion is preferred

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          defaults: { ease: 'power2.out', duration: 0.6 },
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.6,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        // Title: stroke-to-fill + tighten (pure GSAP, no CSS vars)
        if (titleRef.current) {
          gsap.set(titleRef.current, {
            color: 'rgba(255,255,255,0)',
            y: 24,
            autoAlpha: 0,
            letterSpacing: '0.02em',
            css: { WebkitTextStrokeColor: 'rgba(255,255,255,0.35)' },
          });

          tl.to(titleRef.current, {
            duration: 0.9,
            color: '#fff',
            letterSpacing: '-0.02em',
            css: { WebkitTextStrokeColor: 'rgba(255,255,255,0)' },
            y: 0,
            autoAlpha: 1,
            ease: 'power2.out',
          });
        }

        // Links and bottom fade (scrubbed with the same timeline)
        tl.from(linksRef.current?.children || [], { y: 16, autoAlpha: 0, stagger: 0.08 }, '-=0.2')
          .from(bottomRef.current, { autoAlpha: 0 }, '-=0.2');
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [], scope: rootRef }
  );

  return { rootRef, titleRef, linksRef, bottomRef };
}
