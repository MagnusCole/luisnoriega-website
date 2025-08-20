"use client";
import { useEffect, useRef, useState } from "react";
import { PRM, isDesktop } from "@/lib/a11y/prm";

const NODES = [
  { label: "Visión", mantra: "Ver con claridad." },
  { label: "Creación", mantra: "Construir con intención." },
  { label: "Sistema", mantra: "Orquestar lo complejo." },
  { label: "Impacto", mantra: "Mover la aguja." },
  { label: "Juego", mantra: "Explorar con curiosidad." },
];

type Node = { x: number; y: number; vx: number; vy: number; r: number; label: string; mantra: string };

export default function CosmosGraph() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [hover, setHover] = useState<{ label: string; mantra: string } | null>(null);

  useEffect(() => {
    if (PRM() || !isDesktop()) return;
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true }); if (!ctx) return;
    let w = canvas.clientWidth, h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    ctx.scale(dpr, dpr);

  const nodes: Node[] = NODES.map((n) => ({
      x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 8 + Math.random() * 4, label: n.label, mantra: n.mantra,
    }));

    let raf = 0; let paused = false; let mx = -9999, my = -9999;

    const draw = () => {
      if (paused) return;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#ffffff"; ctx.globalAlpha = 0.9;
      for (const p of nodes) {
        // gentle gravity towards center
        const dx = w / 2 - p.x; const dy = h / 2 - p.y; p.vx += dx * 0.00002; p.vy += dy * 0.00002;
        // mouse repulsion
        const mdx = p.x - mx; const mdy = p.y - my; const md2 = mdx*mdx + mdy*mdy; if (md2 < 120*120) { const f = 1 - md2 / (120*120); p.vx += mdx * f * 0.0002; p.vy += mdy * f * 0.0002; }
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.99; p.vy *= 0.99;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 0.6, 0, Math.PI * 2); ctx.fill();
      }
      // lines
      ctx.strokeStyle = "#ffffff"; ctx.globalAlpha = 0.15;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j]; const dx = a.x - b.x, dy = a.y - b.y; const d2 = dx*dx + dy*dy;
          if (d2 < 240*240) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mx = e.clientX - rect.left; my = e.clientY - rect.top; };
    const onLeave = () => { mx = -9999; my = -9999; };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect(); const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      for (const p of nodes) { const dx = p.x - x; const dy = p.y - y; if (dx*dx + dy*dy < (p.r+6)*(p.r+6)) { setHover({ label: p.label, mantra: p.mantra }); break; } }
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const onVis = () => { const hidden = document.hidden; if (hidden) { cancelAnimationFrame(raf); paused = true; } else if (paused) { paused = false; raf = requestAnimationFrame(draw); } };
    document.addEventListener("visibilitychange", onVis);
    const onResize = () => { const cw = canvas.clientWidth, ch = canvas.clientHeight; if (cw === w && ch === h) return; w = cw; h = ch; const dpr2 = Math.min(window.devicePixelRatio||1,2); canvas.width=Math.floor(w*dpr2); canvas.height=Math.floor(h*dpr2); ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr2,dpr2); };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf); document.removeEventListener("visibilitychange", onVis); window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); canvas.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section className="container py-20 md:py-28">
      <h2 className="h3 text-center">Cosmos Interactivo</h2>
      <p className="mt-2 text-center text-muted-foreground">Pasa el cursor y explora.</p>
      <div className="relative mt-10 aspect-[3/1] w-full overflow-hidden rounded-2xl border border-border/60">
        <canvas ref={ref} className="absolute inset-0" />
        {hover && (
          <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-border/60 bg-black/50 px-4 py-1 text-sm">
            <strong>{hover.label}:</strong> <span className="text-muted-foreground">{hover.mantra}</span>
          </div>
        )}
      </div>
    </section>
  );
}
