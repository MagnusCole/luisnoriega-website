"use client";
import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "-10% 0px", threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const style = reduce
    ? undefined
    : ({
        transform: visible ? "none" : "translateY(12px)",
        opacity: visible ? 1 : 0,
        transition: "opacity .4s ease, transform .4s ease",
      } as React.CSSProperties);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
