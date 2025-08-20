"use client";
import { useEffect } from "react";
import { reveal } from "@/lib/motion/contracts";

export default function GsapRevealClient() {
  useEffect(() => {
    const cleanup = reveal(".reveal", { y: 12, duration: 0.28, once: true });
    return () => cleanup();
  }, []);
  return null;
}
