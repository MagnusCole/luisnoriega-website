"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  from?: number;
  to: number;
  duration?: number; // ms
  prefix?: string;
  suffix?: string;
  className?: string;
};

export default function Counter({ from = 0, to, duration = 1200, prefix = "", suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !ref.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ref.current.textContent = `${prefix}${to.toLocaleString()}${suffix}`;
      return;
    }
    const start = performance.now();
    const diff = to - from;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = Math.round(from + diff * eased);
      if (ref.current) ref.current.textContent = `${prefix}${val.toLocaleString()}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, from, to, duration, prefix, suffix]);

  return <span ref={ref} className={className} aria-label={`${to}`} />;
}
