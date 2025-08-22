import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type HeroRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
};

export function useHeroReveal(): HeroRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(
    () => {
      if (PRM()) return;
      const ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.fromTo(titleRef.current, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out' });
        }
        if (subtitleRef.current) {
          gsap.fromTo(subtitleRef.current, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: 'power2.out', delay: 0.08 });
        }
      }, rootRef);
      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return { rootRef, titleRef, subtitleRef };
}
