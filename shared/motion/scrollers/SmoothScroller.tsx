"use client";
import { useEffect } from "react";
import { ScrollSmoother } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

type Props = {
  children: React.ReactNode;
};

type NetworkInformationLite = { saveData?: boolean };
export type NavigatorConnection = { connection?: NetworkInformationLite };

type ScrollSmootherInstance = { 
  kill?: () => void;
  scrollTrigger?: { refresh?: () => void };
};

type ScrollSmootherStatic = {
  get?: () => ScrollSmootherInstance | null;
  create: (opts: Record<string, unknown>) => ScrollSmootherInstance;
  refresh?: (force?: boolean) => void;
};

export default function SmoothScroller({ children }: Props) {
  useEffect(() => {
    const saveData =
      typeof navigator !== "undefined" &&
      (navigator as Navigator & NavigatorConnection).connection?.saveData === true;
    
    // Skip on reduced motion, save data, or missing elements
    if (PRM() || saveData) return;

    const wrapper = document.querySelector('#smooth-wrapper');
    const content = document.querySelector('#smooth-content');
    if (!wrapper || !content) return;

    const Smoother = ScrollSmoother as unknown as ScrollSmootherStatic;
    
    // Check for existing instance and reuse if available
    let smoother = Smoother.get?.();
    if (smoother) return;

    const isTouch = matchMedia('(pointer: coarse)').matches;
    const isMobile = matchMedia('(max-width: 768px)').matches;

    try {
      smoother = Smoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: isMobile ? 0.8 : 1.1, // Slightly faster on mobile
        smoothTouch: isTouch ? 0.1 : false, // Conservative mobile smoothing
        normalizeScroll: true, // Better mobile browser compatibility
        effects: true, // Enable data-speed and data-lag attributes
        ignoreMobileResize: true, // Prevent jumps on mobile keyboard
        // Performance optimizations
        onUpdate: (self: { progress: number }) => {
          // Optional: Custom scroll progress tracking
          document.documentElement.style.setProperty('--scroll-progress', `${self.progress}`);
        },
        onStop: () => {
          // Optional: Actions when scrolling stops
          document.body.classList.remove('is-scrolling');
        }
      }) as unknown as ScrollSmootherInstance;

      // Track scrolling state for CSS
      let scrollTimeout: NodeJS.Timeout;
      const onScroll = () => {
        document.body.classList.add('is-scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          document.body.classList.remove('is-scrolling');
        }, 150);
      };

      window.addEventListener('scroll', onScroll, { passive: true });

      // Enhanced resize handling
      const onResize = () => {
        try { 
          smoother?.scrollTrigger?.refresh?.();
          Smoother.refresh?.(true); 
        } catch (error) {
          console.warn('ScrollSmoother refresh failed:', error);
        }
      };
      
      window.addEventListener('resize', onResize, { passive: true });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        clearTimeout(scrollTimeout);
        try { 
          smoother?.kill?.(); 
        } catch (error) {
          console.warn('ScrollSmoother cleanup failed:', error);
        }
      };
    } catch (error) {
      console.warn('ScrollSmoother initialization failed:', error);
      return;
    }
  }, []);

  return <>{children}</>;
}
