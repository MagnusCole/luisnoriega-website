"use client";
import { useEffect, useRef } from "react";
import { reveal } from "@/lib/motion/contracts";

export default function GsapRevealIdle() {
  const cleanupRef = useRef<null | (() => void)>(null);
  useEffect(() => {
    // Defer until the main thread is idle-ish
    const run = () => {
      cleanupRef.current = reveal(".reveal", { y: 12, duration: 0.28, once: true });
    };
    if ("requestIdleCallback" in window) {
      (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => void }).requestIdleCallback?.(run, { timeout: 800 });
    } else {
      setTimeout(run, 400);
    }
    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);
  return null;
}
