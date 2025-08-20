"use client";
import { useEffect, useRef } from "react";
import { PRM } from "@/lib/a11y/prm";

// Desktop-only radial spotlight following cursor, very subtle opacity
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    type NetInfoLite = { saveData?: boolean };
    type NavConn = { connection?: NetInfoLite };
    const saveData =
      typeof navigator !== "undefined" && (navigator as Navigator & NavConn).connection?.saveData === true;

    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      if (!el) return;
      el.style.setProperty("--mx", `${e.clientX}px`);
      el.style.setProperty("--my", `${e.clientY}px`);
    };

    const desktop = typeof window !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (PRM() || saveData || !desktop) return;

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={ref} aria-hidden className="cursor-spotlight" />;
}
