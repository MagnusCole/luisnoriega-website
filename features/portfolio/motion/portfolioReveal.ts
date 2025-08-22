"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

interface PortfolioRefs {
  rootRef: React.RefObject<HTMLElement | null>;
  companiesRef: React.RefObject<HTMLDivElement | null>;
}

export function usePortfolioReveal(): PortfolioRefs {
  const rootRef = useRef<HTMLElement>(null);
  const companiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!companiesRef.current) return;
    
    const cards = companiesRef.current.querySelectorAll<HTMLElement>(
      '.company-card-wrapper'
    );
    
    // Set initial state
    gsap.set(cards, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      force3D: true
    });

    // Create reveal timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: companiesRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    // Animate cards with stagger
    tl.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
      force3D: true
    });

    // Add hover effects
    // Store handlers for proper cleanup
    const cleanupHandlers: Array<() => void> = [];

    cards.forEach((cardElement) => {
      const cardInner = cardElement.querySelector<HTMLElement>(
        '.company-card-inner'
      );
      if (!cardInner) return;

      let hoverTl: gsap.core.Timeline | null = null;
      const onEnter = () => {
        hoverTl?.kill();
        hoverTl = gsap.timeline();
        hoverTl.to(cardInner, {
          scale: 1.01,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true,
        });
      };
      const onLeave = () => {
        hoverTl?.kill();
        gsap.to(cardInner, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          force3D: true,
        });
      };
      cardElement.addEventListener('mouseenter', onEnter);
      cardElement.addEventListener('mouseleave', onLeave);
      cleanupHandlers.push(() => {
        cardElement.removeEventListener('mouseenter', onEnter);
        cardElement.removeEventListener('mouseleave', onLeave);
        hoverTl?.kill();
      });
    });

    // Cleanup function
    return () => {
  tl.kill();
  cleanupHandlers.forEach((fn) => fn());
    };

  }, []);

  return { rootRef, companiesRef };
}
