import { gsap } from "@/lib/motion/gsap";

/**
 * Smooth scroll to a specific section with GSAP ScrollTo
 * Works seamlessly with ScrollSmoother
 */
export const scrollToSection = (sectionId: string) => {
  const target = document.querySelector(sectionId);
  if (!target) {
    console.warn(`Section "${sectionId}" not found`);
    return;
  }

  // Use GSAP ScrollTo for smooth scrolling that works with ScrollSmoother
  gsap.to(window, {
    duration: 1.2,
    scrollTo: {
      y: target,
      offsetY: 80 // Account for fixed header height
    },
    ease: "power2.inOut"
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
