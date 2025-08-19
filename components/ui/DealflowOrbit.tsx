"use client";

import { useEffect, useRef } from "react";

// Signature interaction: orbiting nodes representing deal stages.
// Lightweight Three.js-less version (CSS+canvas) for minimal cost; can swap to R3F later.
export default function DealflowOrbit({ size = 320 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = matchMedia("(min-width: 768px)").matches;
    if (reduce || !desktop || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = size * dpr;
    const h = size * dpr;
    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    const center = { x: size / 2, y: size / 2 };
    const rings = [60, 92, 128];
    const nodes = [
      { r: rings[0], angle: 0, speed: 0.9 },
      { r: rings[1], angle: 1.2, speed: 0.6 },
      { r: rings[2], angle: 2.5, speed: 0.4 },
    ];

  let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, size, size);
      // rings
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1;
      rings.forEach((r) => {
        ctx.beginPath();
        ctx.arc(center.x, center.y, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      // center
      ctx.fillStyle = "rgba(255,255,255,0.6)";
      ctx.beginPath();
      ctx.arc(center.x, center.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // nodes
      nodes.forEach((n, i) => {
        n.angle += 0.01 * n.speed;
        const x = center.x + Math.cos(n.angle) * n.r;
        const y = center.y + Math.sin(n.angle) * n.r;
        ctx.fillStyle = i === 0 ? "#fff" : "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.arc(x, y, i === 0 ? 4 : 3, 0, Math.PI * 2);
        ctx.fill();
        // small trail
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <canvas ref={canvasRef} aria-hidden />
      <p className="sr-only">Visualiza etapas del dealflow orbitando el centro</p>
    </div>
  );
}
