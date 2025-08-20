"use client";
import dynamic from "next/dynamic";
const DealflowOrbit = dynamic(() => import("@/components/ui/DealflowOrbit"), { ssr: false, loading: () => null });
import { PRM, isDesktop } from "@/lib/a11y/prm";
declare global { interface Window { plausible?: (event: string, options?: Record<string, unknown>) => void } }
export default function DealflowOrbitClient() {
  if (PRM() || !isDesktop()) return null;
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
