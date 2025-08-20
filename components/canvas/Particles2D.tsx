"use client";
import { useEffect, useRef } from "react";
import { PRM, isDesktop } from "@/lib/a11y/prm";

type Props = {
  className?: string;
  density?: number; // particles per 10k px^2
  speed?: number; // base speed
  color?: string;
  opacity?: number;
  reactToCursor?: boolean; // attract/repel subtle
  influenceRadius?: number; // px
  linkLines?: boolean; // draw faint lines between nearby particles
};

export default function Particles2D({ className, density = 0.08, speed = 0.25, color = "#ffffff", opacity = 0.12, reactToCursor = true, influenceRadius = 120, linkLines = true }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
  if (PRM() || !isDesktop()) return;
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    const ctx = context as CanvasRenderingContext2D;
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.scale(dpr, dpr);

  type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];

    const targetCount = Math.max(6, Math.floor(((w * h) / 10000) * density));
    function seed() {
      particles = new Array(targetCount).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.2 + 0.4,
      }));
    }
    seed();

    ctx.fillStyle = color;
    ctx.globalAlpha = opacity;

    const onPointerMove = (e: PointerEvent) => {
      if (!reactToCursor) return;
      const rect = canvas.getBoundingClientRect();
      cursorRef.current.x = e.clientX - rect.left;
      cursorRef.current.y = e.clientY - rect.top;
      cursorRef.current.active = true;
    };
    const onPointerLeave = () => { cursorRef.current.active = false; };
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    function draw() {
      if (pausedRef.current) return;
      ctx.clearRect(0, 0, w, h);
      const cursor = cursorRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w; else if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; else if (p.y > h) p.y = 0;

        // cursor influence: gentle attraction
        if (reactToCursor && cursor.active) {
          const dx = cursor.x - p.x;
          const dy = cursor.y - p.y;
          const dist2 = dx*dx + dy*dy;
          const r2 = influenceRadius * influenceRadius;
          if (dist2 < r2) {
            const f = (1 - dist2 / r2) * 0.02; // small force
            p.vx += dx * f * 0.001;
            p.vy += dy * f * 0.001;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // optional link lines
      if (linkLines) {
        ctx.save();
        ctx.globalAlpha = Math.min(opacity, 0.08);
        ctx.strokeStyle = color;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx*dx + dy*dy;
            if (d2 < 120*120) {
              const alpha = Math.max(0, 1 - d2 / (120*120)) * 0.5;
              ctx.globalAlpha = Math.min(opacity, 0.12) * alpha;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
        ctx.restore();
      }
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      const cw = canvas.clientWidth;
      const ch = canvas.clientHeight;
      if (cw === w && ch === h) return;
      w = cw; h = ch;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      seed();
    };
    const onVis = () => {
      pausedRef.current = document.hidden;
      if (!document.hidden && !animRef.current) animRef.current = requestAnimationFrame(draw);
    };
  window.addEventListener("resize", onResize);
  document.addEventListener("visibilitychange", onVis);

    return () => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVis);
    canvas.removeEventListener("pointermove", onPointerMove);
    canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density, speed, color, opacity, reactToCursor, influenceRadius, linkLines]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
