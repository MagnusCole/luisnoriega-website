import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import { PRM } from '@/lib/a11y/prm';

export type HeroRevealRefs = {
  rootRef: React.RefObject<HTMLElement | null>;
  nameRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  photoRef: React.RefObject<HTMLDivElement | null>;
};

export function useHeroReveal(): HeroRevealRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (PRM()) return;
      
      // Force3D para activar aceleración de hardware
      gsap.set([nameRef.current, subtitleRef.current, photoRef.current], {
        force3D: true
      });

      const ctx = gsap.context(() => {
        // Timeline principal con animaciones de entrada
        const tl = gsap.timeline({ ease: "power2.out" });
        
        // Animación del nombre principal
        if (nameRef.current) {
          tl.fromTo(nameRef.current, 
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.8 }
          );
        }
        
        // Animación del subtítulo con delay
        if (subtitleRef.current) {
          tl.fromTo(subtitleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 0.8, y: 0, duration: 0.6 },
            0.3 // delay de 0.3s
          );
        }
        
        // Animación de la foto
        if (photoRef.current) {
          tl.fromTo(photoRef.current,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 1 },
            0.2 // entra casi simultáneo
          );
        }

        // Cleanup después de animación inicial
        tl.eventCallback("onComplete", () => {
          gsap.set([nameRef.current, subtitleRef.current], { 
            clearProps: "will-change" 
          });
        });

        // ScrollTrigger para parallax horizontal
        if (typeof window !== 'undefined' && nameRef.current) {
          gsap.to(nameRef.current, {
            xPercent: 15,  // se mueve hacia la derecha
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.2    // smooth scroll
            }
          });
        }

        // Parallax de la foto más lento y en dirección opuesta
        if (typeof window !== 'undefined' && photoRef.current) {
          gsap.to(photoRef.current, {
            xPercent: -8,   // parallax más lento y opuesto
            yPercent: -15,  // también vertical para profundidad
            ease: "none",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top", 
              end: "bottom top",
              scrub: 2      // más lento que el texto
            }
          });
        }
        
      }, rootRef);
      
      return () => ctx.revert();
    },
    { scope: rootRef }
  );

  return { rootRef, nameRef, subtitleRef, photoRef };
}
