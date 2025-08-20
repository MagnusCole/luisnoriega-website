"use client";
import { useEffect, useRef, useState } from "react";
import { PRM } from "@/lib/a11y/prm";

export default function IntroCosmos() {
  const [visible, setVisible] = useState(true);
  const [active, setActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const reduce = PRM();
    if (reduce) {
      // Minimal presence, then vanish quickly
      const t = setTimeout(() => setVisible(false), 60);
      return () => clearTimeout(t);
    }
    // Start sequence: small delay to let spark/text breathe, then animate
    const t1 = setTimeout(() => setActive(true), 400);
    const t2 = setTimeout(() => explodeAndExit(), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.scale(dpr, dpr);

    const cx = () => w / 2;
    const cy = () => h / 2;
    type Orb = { r: number; a: number; av: number; size: number };
    const orbs: Orb[] = Array.from({ length: 32 }, (_, i) => ({
      r: 20 + i * 6,
      a: Math.random() * Math.PI * 2,
      av: 0.001 + i * 0.0003,
      size: Math.random() * 1.2 + 0.6,
    }));

    const draw = () => {
      if (hiddenRef.current) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.14)";
      for (const o of orbs) {
        o.a += o.av;
        const x = cx() + Math.cos(o.a) * o.r;
        const y = cy() + Math.sin(o.a) * o.r;
        ctx.beginPath();
        ctx.arc(x, y, o.size, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    const onResize = () => {
      const cw = canvas.clientWidth; const ch = canvas.clientHeight;
      if (cw === w && ch === h) return;
      w = cw; h = ch;
      const dpr2 = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr2);
      canvas.height = Math.floor(h * dpr2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr2, dpr2);
    };
    const onVis = () => { hiddenRef.current = document.hidden; if (!document.hidden && !rafRef.current) rafRef.current = requestAnimationFrame(draw); };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [active]);

  const explodeAndExit = () => {
    setExploding(true);
    setTimeout(() => setVisible(false), 520);
  };

  const [exploding, setExploding] = useState(false);

  if (!visible) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[10000] bg-black text-white overflow-hidden transition-opacity duration-500 ${exploding ? "opacity-0" : "opacity-100"}`}
      style={{
        // CSS var for flash color
        // @ts-expect-error CSS var ok
        "--flash": "rgba(255,255,255,0.9)",
      }}
    >
      {/* Spark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
           style={{ background: "radial-gradient(closest-side, #fff 0%, #f5e6c8 60%, rgba(255,255,255,0) 100%)" }}>
      </div>
      {/* Soft pulse */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ping opacity-30" style={{ background: "radial-gradient(closest-side, #fff, transparent)" }} />

      {/* Particles canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Poetic text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="text-xl md:text-3xl tracking-wide opacity-90">En el principio… nada.</p>
        <p className="mt-3 text-2xl md:text-4xl font-semibold">Luego, la chispa.</p>
      </div>

      {/* Flash overlay for explosion + fade */}
  <div className={`pointer-events-none absolute inset-0 ${exploding ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
       style={{ background: "radial-gradient(1200px 1200px at 50% 50%, var(--flash), rgba(255,255,255,0) 70%)" }} />
    </div>
  );
}
