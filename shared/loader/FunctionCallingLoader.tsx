"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

type Props = { onComplete?: () => void };

// Minimal, text-only loader inspired by an AI function-calling sequence.
export default function FunctionCallingLoader({ onComplete }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  const locale: "es" | "en" = useMemo(
    () => (typeof navigator !== "undefined" && navigator.language?.startsWith("es") ? "es" : "en"),
    []
  );

  useEffect(() => {
    if (!rootRef.current || PRM()) {
      onComplete?.();
      setVisible(false);
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "none" } });

      const t = {
        planning: locale === "es" ? "Planificando…" : "Planning…",
        calling:
          locale === "es"
            ? 'assistant: calling build({ page: "home" })'
            : 'assistant: calling build({ page: "home" })',
        compiling: locale === "es" ? "Compilando vista…" : "Compiling view…",
        loading: locale === "es" ? "cargando…" : "loading…",
        ready: locale === "es" ? "Listo" : "Ready",
      } as const;

      const el = (cls: string) => linesRef.current?.querySelector(cls) as HTMLElement | null;

      tl.to(el(".l1"), { text: t.planning, duration: 0.5 })
        .to(el(".l2"), { text: t.calling, duration: 0.6 }, ">-=0.1")
        .to(el(".l3"), { text: t.compiling, duration: 0.5 }, ">-=0.05")
        .to(el(".l4"), { text: "[██████████] 100%", duration: 0.6 })
        .to(el(".l5"), { text: t.loading, duration: 0.4 })
        .to(rootRef.current, {
          opacity: 0,
          duration: 0.5,
          delay: 0.6,
          onComplete: () => {
            setVisible(false);
            onComplete?.();
          },
        });
    }, rootRef);

    return () => ctx.revert();
  }, [onComplete, locale]);

  if (!visible || PRM()) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] bg-black text-white grid place-items-center">
      <div className="w-full max-w-xl px-6">
        <div className="border border-white/10 rounded-xl p-5 bg-black/80 backdrop-blur">
          <div className="text-sm text-white/70 mb-2">{locale === "es" ? "Agente" : "Agent"}</div>
          <div ref={linesRef} className="font-mono text-[13px] leading-relaxed space-y-1">
            <p className="l1" />
            <p className="l2" />
            <p className="l3" />
            <p className="l4" />
            <p className="l5" />
          </div>
        </div>
      </div>
    </div>
  );
}
