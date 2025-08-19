"use client";
import { useEffect, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type Metric = { label: string; value: number; suffix?: string };

const METRICS: Metric[] = [
  { label: "Deals evaluados", value: 120 },
  { label: "Capital comprometido", value: 15, suffix: "M" },
  { label: "ROI promedio", value: 27, suffix: "%" },
];

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const d = 900;
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / d);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <span>
      {n.toLocaleString()} {suffix}
    </span>
  );
}

export default function MetricsStrip() {
  return (
    <ScrollReveal className="border-y border-border bg-white/5">
      <div className="container py-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {METRICS.map((m) => (
          <div key={m.label} className="flex flex-col items-start">
            <div className="text-2xl font-semibold">
              <Counter to={m.value} suffix={m.suffix} />
            </div>
            <p className="text-sm text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
}
