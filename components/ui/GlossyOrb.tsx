"use client";

import React from "react";

interface Props {
  className?: string;
  size?: number; // px
}

export default function GlossyOrb({ className = "", size = 260 }: Props) {
  const s = `${size}px`;
  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ width: s, height: s }}
    >
      <div
        className="relative h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.3) 30%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 100%), conic-gradient(from 180deg at 50% 50%, #60a5fa, #22d3ee, #a78bfa, #60a5fa)",
          filter: "saturate(1.1)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.35), inset 0 6px 30px rgba(255,255,255,0.3), inset 0 -8px 25px rgba(0,0,0,0.3)",
          animation: "orb-rotate 18s linear infinite",
        }}
      >
        {/* specular highlight */}
        <div
          className="absolute left-1/4 top-1/5 h-1/3 w-1/3 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(255,255,255,0.2) 60%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </div>
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          div[aria-hidden] > div { animation: none !important; }
        }
        @keyframes orb-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
