import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type WorkGridRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  cardsRef: React.RefObject<HTMLDivElement | null>;
};

export function useWorkGridReveal(): WorkGridRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (PRM()) {
        // PRM mode: solo fade simple sin movimiento
        gsap.set(".work-card-wrapper", { opacity: 1 });
        return;
      }

      // Force3D para performance
      gsap.set(".work-card-wrapper", {
        force3D: true
      });

      const ctx = gsap.context(() => {
        
        // Grid reveal con ScrollTrigger
        if (typeof window !== 'undefined' && cardsRef.current) {
          const cards = gsap.utils.toArray(".work-card-wrapper");
          
          gsap.fromTo(cards, 
            { 
              opacity: 0, 
              y: 16,
              scale: 0.98
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1, // stagger 0.1s entre cards
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 70%", // dispara al 30% de visibilidad
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // Hover animations para cada card (solo si no PRM)
          cards.forEach((card) => {
            const cardElement = card as HTMLElement;
            
            // Hover tilt sutil
            cardElement.addEventListener("mouseenter", () => {
              gsap.to(cardElement, {
                rotateX: 1,
                rotateY: 2,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
                transformOrigin: "center center"
              });
              
              // Sombra sutil
              gsap.to(cardElement, {
                filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.3))",
                duration: 0.3,
                ease: "power2.out"
              });
            });

            cardElement.addEventListener("mouseleave", () => {
              gsap.to(cardElement, {
                rotateX: 0,
                rotateY: 0,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              });
              
              gsap.to(cardElement, {
                filter: "drop-shadow(0 0px 0px rgba(0,0,0,0))",
                duration: 0.4,
                ease: "power2.out"
              });
            });
          });
        }

      }, rootRef);

      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return { rootRef, cardsRef };
}
