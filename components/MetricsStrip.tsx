"use client";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Counter from "@/components/ui/Counter";

type Metric = { label: string; value: number; suffix?: string };

const METRICS: Metric[] = [
  { label: "Deals evaluados", value: 120 },
  { label: "Capital comprometido", value: 15, suffix: "M" },
  { label: "ROI promedio", value: 27, suffix: "%" },
];

// use shared Counter for consistent easing/PRM

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
