import { gsap } from "@/lib/motion/gsap";

/**
 * Smooth scroll to a specific section with GSAP ScrollTo
 * Works seamlessly with ScrollSmoother
 */
export const scrollToSection = (sectionId: string) => {
  const target = document.querySelector(sectionId) as HTMLElement | null;
  if (!target) {
    console.warn(`Section "${sectionId}" not found`);
    return;
  }

  const headerOffset = 80;
  const targetY = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  const currentY = window.scrollY;
  const distance = Math.abs(targetY - currentY);

  // Early exit: if already within 8px of target, just set scroll instantly
  if (distance < 8) {
    window.scrollTo({ top: targetY });
    return;
  }

  // Adaptive duration: shorter for small distances, capped for long
  const base = 0.18; // seconds minimal
  const duration = Math.min(1.0, base + (distance / 1200));

  gsap.to(window, {
    duration,
    scrollTo: { y: targetY },
    ease: distance < 300 ? 'power1.out' : 'power2.inOut'
  });
};

/**
 * Scroll to top of the page smoothly
 */
export const scrollToTop = () => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: { y: 0 },
    ease: "power2.inOut"
  });
};

/**
 * Scroll to a specific pixel position
 */
export const scrollToPosition = (yPosition: number, duration = 1.2) => {
  gsap.to(window, {
    duration,
    scrollTo: { y: yPosition },
    ease: "power2.inOut"
  });
};

/**
 * Get the current scroll progress (0 to 1)
 */
export const getScrollProgress = (): number => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  return Math.min(scrollTop / scrollHeight, 1);
};
