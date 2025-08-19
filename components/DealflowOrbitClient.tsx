"use client";
import dynamic from "next/dynamic";
const DealflowOrbit = dynamic(() => import("@/components/ui/DealflowOrbit"), { ssr: false, loading: () => null });
export default function DealflowOrbitClient() {
  const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
  if (reduce || !desktop) return null;
  return <DealflowOrbit />;
}
