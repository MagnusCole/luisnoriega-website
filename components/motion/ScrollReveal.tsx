"use client";
import { useEffect, useRef } from "react";
import { reveal } from "@/lib/motion/contracts";

export default function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const cleanup = reveal(ref.current, { y: 12, duration: 0.28, once: true });
    return () => cleanup();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
