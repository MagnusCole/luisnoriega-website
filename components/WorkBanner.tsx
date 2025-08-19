"use client";

import React from "react";

export default function WorkBanner() {
  // Uses CSS-only animated caution stripes; reduced motion: stop animation
  return (
    <div
      className="relative z-[70] w-full text-black"
      role="status"
      aria-live="polite"
    >
      <div
        className="w-full overflow-hidden border-b border-border"
        style={{
          backgroundColor: "#facc15", // yellow-400 base
        }}
      >
        <div
          className="mx-auto max-w-7xl px-6 py-2 text-sm font-semibold tracking-wide"
          style={{ position: "relative" }}
        >
          <div
            className="absolute inset-0 opacity-30 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            aria-hidden
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #000 0 16px, transparent 16px 32px)",
              backgroundSize: "32px 32px",
              animation: "wip-scroll 1.2s linear infinite",
            }}
          />
          <span className="relative">Work in progress — ajustes en curso</span>
        </div>
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          @keyframes wip-scroll { from { transform: translateX(0) } to { transform: translateX(0) } }
        }
        @keyframes wip-scroll { from { background-position: 0 0 } to { background-position: 32px 0 } }
      `}</style>
    </div>
  );
}
