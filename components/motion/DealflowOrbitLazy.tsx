"use client";
import dynamic from "next/dynamic";
import { PRM, isDesktop, isTouch } from "@/lib/a11y/prm";

const DealflowOrbitClient = dynamic(() => import("./DealflowOrbitClient"), { ssr: false, loading: () => null });

export default function DealflowOrbitLazy() {
  if (PRM() || !isDesktop() || isTouch()) return null;
  return <DealflowOrbitClient />;
}
