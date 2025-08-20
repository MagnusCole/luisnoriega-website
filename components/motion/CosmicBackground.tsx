"use client";
import { useEffect, useRef } from "react";
import { PRM } from "@/lib/a11y/prm";
import dynamic from "next/dynamic";

const Particles2D = dynamic(() => import("@/components/canvas/Particles2D"), { ssr: false, loading: () => null });

export default function CosmicBackground({ className = "" }: { className?: string }) {
  const l1 = useRef<HTMLDivElement | null>(null);
  const l2 = useRef<HTMLDivElement | null>(null);
  const l3 = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (PRM()) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const cx = w / 2, cy = h / 2;
      const dx = (e.clientX - cx) / cx; // -1..1
      const dy = (e.clientY - cy) / cy;
      // subtle parallax
      if (l1.current) l1.current.style.transform = `translate(${dx * 3}px, ${dy * 3}px)`;
      if (l2.current) l2.current.style.transform = `translate(${dx * 6}px, ${dy * 6}px)`;
      if (l3.current) l3.current.style.transform = `translate(${dx * 9}px, ${dy * 9}px)`;
    };
  window.addEventListener("mousemove", onMove, { passive: true } as EventListenerOptions);
  return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden>
      <div ref={l1} className="absolute inset-0 transition-transform duration-100 will-change-transform">
        <Particles2D className="absolute inset-0" density={0.06} speed={0.18} opacity={0.10} reactToCursor influenceRadius={120} linkLines />
      </div>
      <div ref={l2} className="absolute inset-0 transition-transform duration-100 will-change-transform">
        <Particles2D className="absolute inset-0" density={0.08} speed={0.26} opacity={0.12} reactToCursor influenceRadius={140} linkLines />
      </div>
      <div ref={l3} className="absolute inset-0 transition-transform duration-100 will-change-transform">
        <Particles2D className="absolute inset-0" density={0.10} speed={0.34} opacity={0.14} reactToCursor influenceRadius={160} linkLines />
      </div>
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
