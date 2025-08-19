"use client";
import dynamic from "next/dynamic";
const ScrollScenes = dynamic(() => import("@/components/ScrollScenes"), { ssr: false, loading: () => null });
export default ScrollScenes;
