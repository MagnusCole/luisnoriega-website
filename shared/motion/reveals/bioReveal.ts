import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type BioRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  descRef: React.RefObject<HTMLParagraphElement | null>;
  listRef: React.RefObject<HTMLUListElement | null>;
  cardRef: React.RefObject<HTMLDivElement | null>;
};

export function useBioReveal(): BioRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (PRM()) return;

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out', duration: 0.6 },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 85%',
          end: 'top 35%',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });

      if (titleRef.current) {
        gsap.set(titleRef.current, { y: 24, autoAlpha: 0, letterSpacing: '0.01em' });
        tl.to(titleRef.current, { y: 0, autoAlpha: 1, letterSpacing: '-0.005em' });
      }

      if (descRef.current) {
        gsap.set(descRef.current, { y: 16, autoAlpha: 0, filter: 'blur(2px)' });
        tl.to(descRef.current, { y: 0, autoAlpha: 1, filter: 'blur(0px)' }, '-=0.3');
      }

      if (listRef.current?.children?.length) {
        tl.from(listRef.current.children, { y: 12, autoAlpha: 0, stagger: 0.06 }, '-=0.2');
      }

      if (cardRef.current) {
        gsap.set(cardRef.current, { y: 20, autoAlpha: 0, scale: 0.985 });
        tl.to(cardRef.current, { y: 0, autoAlpha: 1, scale: 1 }, '-=0.2');
      }

      return () => tl.scrollTrigger?.kill();
    },
    { dependencies: [], scope: rootRef }
  );

  return { rootRef, titleRef, descRef, listRef, cardRef };
}
