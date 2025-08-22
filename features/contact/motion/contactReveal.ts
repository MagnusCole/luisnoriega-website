import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type ContactRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
  socialsRef: React.RefObject<HTMLDivElement | null>;
};

export function useContactReveal(): ContactRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);

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
        if (subtitleRef.current) {
          gsap.fromTo(
            subtitleRef.current,
            { y: 16, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: rootRef.current,
                start: 'top 80%',
                end: '+=20%',
                scrub: 0.6,
              },
            }
          );
        }
        if (buttonsRef.current) {
          gsap.from(buttonsRef.current.children, {
            y: 14,
            autoAlpha: 0,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 75%',
              end: '+=25%',
              scrub: 0.6,
            },
          });
        }
        if (socialsRef.current) {
          gsap.from(socialsRef.current.children, {
            y: 12,
            autoAlpha: 0,
            stagger: 0.06,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: socialsRef.current,
              start: 'top 90%',
              end: '+=20%',
              scrub: 0.6,
            },
          });
        }
      }, rootRef);
      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return { rootRef, titleRef, subtitleRef, buttonsRef, socialsRef };
}
