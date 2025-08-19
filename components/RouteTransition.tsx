"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  const duration = 0.6;
  const easing: [number, number, number, number] = [0.16, 1, 0.3, 1];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)", opacity: 1 }}
        animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
        exit={reduced ? { opacity: 0 } : { clipPath: "inset(0 0 0 100%)" }}
        transition={{ duration, ease: easing }}
        style={{ willChange: "clip-path, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
