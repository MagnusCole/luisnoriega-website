"use client";
import dynamic from "next/dynamic";
const DealflowOrbit = dynamic(() => import("@/components/ui/DealflowOrbit"), { ssr: false, loading: () => null });
declare global { interface Window { plausible?: (event: string, options?: Record<string, unknown>) => void } }
export default function DealflowOrbitClient() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  if (reduce || !desktop) return null;
  return (
    <div
      ref={(el) => {
        if (!el) return;
        const io = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            window.plausible?.("motion:dealflow-orbit:visible");
            io.disconnect();
          }
        }, { threshold: 0.6 });
        io.observe(el);
      }}
    >
      <DealflowOrbit />
    </div>
  );
}
