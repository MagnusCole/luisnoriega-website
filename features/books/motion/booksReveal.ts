import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type BooksRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  gridRef: React.RefObject<HTMLDivElement | null>;
};

export function useBooksReveal(): BooksRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (PRM()) return;
      const ctx = gsap.context(() => {
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top 85%',
                end: 'top 45%',
                scrub: 0.6,
              },
            }
          );
        }
        if (gridRef.current) {
          gsap.from(gridRef.current.children, {
            y: 18,
            autoAlpha: 0,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              end: '+=40%',
              scrub: 0.6,
            },
          });
        }
      }, rootRef);
      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return { rootRef, titleRef, gridRef };
}
