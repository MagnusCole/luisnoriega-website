"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/motion/gsap";

interface SkillsRefs {
  rootRef: React.RefObject<HTMLElement | null>;
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  skillsRef: React.RefObject<HTMLDivElement | null>;
  certsRef: React.RefObject<HTMLDivElement | null>;
  noteRef: React.RefObject<HTMLDivElement | null>;
}

export function useSkillsReveal(): SkillsRefs {
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const certsRef = useRef<HTMLDivElement | null>(null);
  const noteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Title reveal
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Subtitle reveal
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top bottom-=80",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Skills grid reveal
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll('.skill-wrapper');
      
      gsap.set(skillCards, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        force3D: true
      });

      gsap.to(skillCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Certifications grid reveal
    if (certsRef.current) {
      const certCards = certsRef.current.querySelectorAll('.cert-wrapper');
      
      gsap.set(certCards, {
        opacity: 0,
        y: 40,
        scale: 0.95,
        force3D: true
      });

      gsap.to(certCards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        force3D: true,
        scrollTrigger: {
          trigger: certsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });
    }

    // Critical note reveal
    if (noteRef.current) {
      gsap.fromTo(
        noteRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: noteRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Cleanup function
    return () => {
      // GSAP automatically cleans up ScrollTriggers when components unmount
    };

  }, []);

  return { rootRef, titleRef, subtitleRef, skillsRef, certsRef, noteRef };
}
