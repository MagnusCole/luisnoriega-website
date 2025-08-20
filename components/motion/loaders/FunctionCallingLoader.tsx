"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, Flip } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

interface FunctionCallingLoaderProps {
  onComplete?: () => void;
}

type Locale = "es" | "en";

export default function FunctionCallingLoader({ onComplete }: FunctionCallingLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  // Lines in AI code block
  const planningRef = useRef<HTMLParagraphElement>(null);
  const callRef = useRef<HTMLParagraphElement>(null);
  const toolBadgeRef = useRef<HTMLDivElement>(null);
  const toolBlockRef = useRef<HTMLDivElement>(null);
  const compilingRef = useRef<HTMLParagraphElement>(null);
  const check1Ref = useRef<HTMLParagraphElement>(null);
  const check2Ref = useRef<HTMLParagraphElement>(null);
  const phaseRef = useRef<HTMLDivElement>(null);
  const resultLineRef = useRef<HTMLDivElement>(null);
  const resultLabelRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(true);
  const [logsOpen, setLogsOpen] = useState(false);

  const locale: Locale = useMemo(() => (typeof navigator !== "undefined" && navigator.language?.startsWith("es") ? "es" : "en"), []);
  const T = useMemo(() => {
    return locale === "es" ? {
      headerRole: "Agente • Concierge",
      prompt: "Quiero ver el portafolio de Luis Noriega",
      planning: "Entendido. Preparando…",
      calling: 'assistant: calling generatePortfolio({ name: "Luis Noriega" })',
      compiling: "assistant: Compilando vista…",
      fetched: "✓ datos obtenidos",
      composed: "✓ vista compuesta",
      result: "Result:",
      tool: "tool",
      reduce: "(modo rápido)"
    } : {
      headerRole: "Agent • Concierge",
      prompt: "Show me Luis Noriega’s portfolio",
      planning: "Acknowledged. Planning…",
      calling: 'assistant: calling generatePortfolio({ name: "Luis Noriega" })',
      compiling: "assistant: Compiling view…",
      fetched: "✓ data fetched",
      composed: "✓ view composed",
      result: "Result:",
      tool: "tool",
      reduce: "(fast mode)"
    };
  }, [locale]);

  const timeLabel = useMemo(() => {
    const d = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }, []);

  useEffect(() => {
    // Prewarm fonts
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "font";
      link.crossOrigin = "anonymous";
      link.href = "/fonts/WorkSans-VariableFont_wght.woff2"; // opcional: ajusta si existe
      document.head.appendChild(link);
      setTimeout(() => link.remove(), 4000);
    }
  }, []);

  useEffect(() => {
    // Skip if user opted out previously
    const shouldSkip = typeof window !== "undefined" && localStorage.getItem("ln_skip_loader") === "1";
    if (shouldSkip) {
      setIsVisible(false);
      onComplete?.();
      return;
    }
  }, [onComplete]);

  useEffect(() => {
    if (!containerRef.current || PRM()) {
      onComplete?.();
      return;
    }

    // Type-safe Save-Data detection
    const saveData = typeof navigator !== "undefined" && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const showTyping = (on: boolean) => {
      if (!typingRef.current) return;
      gsap.killTweensOf(typingRef.current);
      gsap.set(typingRef.current, { opacity: on ? 0.5 : 0 });
      if (on) {
        gsap.to(typingRef.current, {
          opacity: 0.15,
          duration: gsap.utils.random(0.35, 0.6),
          repeat: -1,
          yoyo: true,
          ease: "none"
        });
      }
    };

    const setPhase = (label: string) => {
      if (!phaseRef.current) return;
      phaseRef.current.textContent = `— ${label}`;
    };

    const prettyJSON = `{
  "status": "ok",
  "sections": ["work", "about", "contact"]
}`;

    const ctx = gsap.context(() => {
      // Fast path for Save-Data: show final state quickly
      if (saveData) {
        // Reduced logging fast mode
        setPhase("Result");
        if (planningRef.current) planningRef.current.textContent = `${T.planning} ${T.reduce}`;
        if (callRef.current) callRef.current.textContent = T.calling;
        if (toolBlockRef.current) toolBlockRef.current.textContent = prettyJSON;
        if (compilingRef.current) compilingRef.current.textContent = T.compiling;
        if (check1Ref.current) check1Ref.current.textContent = T.fetched;
        if (check2Ref.current) check2Ref.current.textContent = T.composed;
        if (resultLabelRef.current) resultLabelRef.current.textContent = T.result;
        if (nameRef.current) nameRef.current.textContent = "LUIS NORIEGA";
        gsap.to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.6, onComplete: () => { setIsVisible(false); onComplete?.(); } });
        return;
      }

      // Show bubbles
      const tl = gsap.timeline({ defaults: { ease: "none" } , onComplete: () => {
        const hero = document.getElementById("hero-title");
        const saveData = typeof navigator !== "undefined" && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
        const finalize = () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 0.5, delay: 0.1, ease: "power2.inOut", onComplete: () => { setIsVisible(false); onComplete?.(); } });
        };

        if (hero && resultLineRef.current) {
          const originals = Array.from(hero.children).filter(el => (el as HTMLElement).tagName === 'SPAN' && !(el as HTMLElement).classList.contains('sr-only')) as HTMLElement[];
          if (originals.length) gsap.set(originals, { opacity: 0 });

          const state = Flip.getState(resultLineRef.current);
          hero.appendChild(resultLineRef.current);
          Flip.from(state, { duration: 0.7, ease: "power3.inOut" });

          if (resultLabelRef.current) gsap.set(resultLabelRef.current, { opacity: 0 });
          if (nameRef.current) nameRef.current.textContent = "";
          if (caretRef.current) {
            gsap.set(caretRef.current, { opacity: 1 });
            gsap.to(caretRef.current, { opacity: 0.25, duration: 0.5, repeat: -1, yoyo: true, ease: "none" });
          }

          const typed = "L-U-I-S N-O-R-I-E-G-A";
          const base = saveData ? 0.03 : 0.06;
          const jitter = saveData ? 0.015 : 0.05;
          let acc = 0;
          for (let i = 0; i < typed.length; i++) {
            const ch = typed[i];
            const d = base + Math.random() * jitter;
            acc += d;
            gsap.delayedCall(acc, () => {
              if (!nameRef.current) return;
              nameRef.current.textContent = (nameRef.current.textContent || "") + ch;
            });
          }

          gsap.delayedCall(acc + 0.15, () => {
            if (caretRef.current) gsap.to(caretRef.current, { opacity: 0, duration: 0.2 });
            if (resultLineRef.current) gsap.to(resultLineRef.current, { opacity: 0, duration: 0.3, onComplete: () => { if (resultLineRef.current) resultLineRef.current.remove(); } });
            if (originals.length) gsap.to(originals, { opacity: 1, duration: 0.4, ease: "power2.out" });
            finalize();
          });
        } else {
          finalize();
        }
      }});

      tl.fromTo(userRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" })
        .fromTo(aiRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, "+=0.2")
        .add(() => { setPhase(locale === "es" ? "Pensando" : "Thinking"); showTyping(true); })
        .to(planningRef.current, { text: T.planning, duration: 0.5 })
        .add(() => { setPhase(locale === "es" ? "Llamando" : "Calling"); })
        .to(callRef.current,      { text: `${timeLabel} ${T.calling}`, duration: 0.7 })
        .add(() => showTyping(true), "+=0.08")
        .add(() => { setPhase(locale === "es" ? "Recibiendo" : "Receiving"); })
        .to(toolBadgeRef.current, { opacity: 1, duration: 0.2 })
        .to(toolBlockRef.current, { text: prettyJSON, duration: 0.6 })
        .add(() => { setPhase(locale === "es" ? "Compilando" : "Compiling"); })
        .to(compilingRef.current, { text: `${timeLabel} ${T.compiling}`, duration: 0.6 })
        .to(check1Ref.current,    { text: T.fetched, duration: 0.25, onStart: () => { if (check1Ref.current) { gsap.fromTo(check1Ref.current, { scale: 1.08 }, { scale: 1, duration: 0.18, ease: "power2.out" }); } } })
        .to(check2Ref.current,    { text: T.composed, duration: 0.25, onStart: () => { if (check2Ref.current) { gsap.fromTo(check2Ref.current, { scale: 1.08 }, { scale: 1, duration: 0.18, ease: "power2.out" }); } } })
        .add(() => { setPhase("Result"); showTyping(false); })
        .to(resultLabelRef.current, { text: T.result, duration: 0.35 })
        .add(() => {
          if (caretRef.current) {
            gsap.set(caretRef.current, { opacity: 1 });
            gsap.to(caretRef.current, { opacity: 0.2, duration: gsap.utils.random(0.38, 0.6), repeat: -1, yoyo: true, ease: "none" });
          }
        })
  // Hold on result before transitioning to hero typing
  .to({}, { duration: 0.95 });

    }, containerRef);

    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "s") {
        localStorage.setItem("ln_skip_loader", "1");
        setIsVisible(false);
        onComplete?.();
      }
      if (e.key.toLowerCase() === "r") {
        localStorage.removeItem("ln_skip_loader");
        location.reload();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [T, locale, onComplete, timeLabel]);

  if (!isVisible || PRM()) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black text-white flex items-center justify-center">
      {/* Skip button */}
      <button
        type="button"
        onClick={() => { localStorage.setItem("ln_skip_loader", "1"); setIsVisible(false); onComplete?.(); }}
        className="absolute top-4 right-4 text-xs px-2 py-1 border border-white/20 rounded hover:bg-white/5 focus:outline-none"
        aria-label={locale === 'es' ? 'Saltar animación (tecla S)' : 'Skip animation (key S)'}
      >Skip</button>

      {/* Re-run button (aparece tras fade; aquí visible como alternativa) */}
      <button
        type="button"
        onClick={() => { localStorage.removeItem("ln_skip_loader"); location.reload(); }}
        className="absolute top-4 right-20 text-xs px-2 py-1 border border-white/20 rounded hover:bg-white/5 focus:outline-none"
        aria-label={locale === 'es' ? 'Repetir (tecla R)' : 'Re-run (key R)'}
      >Re-run</button>

      <div className="w-full max-w-2xl px-6">
        <div className="border border-white/10 rounded-xl overflow-hidden">
          {/* Header */}
          <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3 text-white/70 text-sm">
            <div className="w-2 h-2 rounded-full bg-white/40" aria-hidden />
            <span>{T.headerRole} • {timeLabel}</span>
          </div>

          {/* Chat area */}
          <div className="p-5 space-y-5">
            {/* User bubble */}
            <div ref={userRef} className="flex justify-end">
              <div className="border border-white/20 rounded-lg px-4 py-2 text-sm bg-transparent">
                Prompt: “{T.prompt}”
              </div>
            </div>

            {/* AI bubble with monospace code block */}
            <div ref={aiRef} className="flex justify-start">
              <div className="rounded-lg px-4 py-3 text-sm bg-black border border-white/15 w-full max-w-[90%]">
                <div className="font-mono text-white/90 space-y-1" aria-live="polite">
                  {/* Phase */}
                  <div ref={phaseRef} className="text-white/50 mb-1" />

                  {/* Badges */}
                  <div className="mb-1 flex items-center gap-2 text-[11px] text-white/60">
                    <span className="px-1.5 py-[2px] border border-white/20 rounded">assistant</span>
                    <span ref={typingRef} className="px-1.5 py-[2px] border border-white/20 rounded opacity-0">typing…</span>
                  </div>

                  <p ref={planningRef} />
                  <p ref={callRef} />

                  <div ref={toolBadgeRef} className="mt-2 flex items-center gap-2 text-[11px] text-white/60 opacity-0">
                    <span className="px-1.5 py-[2px] border border-white/20 rounded">{T.tool}</span>
                    <span className="px-1.5 py-[2px] border border-white/20 rounded">generatePortfolio</span>
                  </div>

                  {/* Pretty JSON */}
                  <div ref={toolBlockRef} className="whitespace-pre leading-[1.3] text-[12px] bg-transparent border border-white/10 rounded p-2 text-white/80" />

                  <p ref={compilingRef} className="mt-2" />
                  <p ref={check1Ref} />
                  <p ref={check2Ref} />

                  {/* Result line – used for Flip */}
                  <div ref={resultLineRef} className="mt-2 text-center">
                    <span ref={resultLabelRef} className="inline" />
                    <span ref={caretRef} className="inline-block ml-1 opacity-0 select-none">|</span>
                    <span ref={nameRef} className="inline-block ml-2 text-3xl font-black tracking-wide" style={{ fontFamily: 'var(--font-work-sans)' }} />
                  </div>

                  {/* Logs toggle */}
                  <div className="mt-3 text-center">
                    <button type="button" onClick={() => setLogsOpen(v => !v)} className="text-[11px] text-white/60 underline underline-offset-2">
                      {logsOpen ? (locale === 'es' ? 'Ocultar logs' : 'Hide logs') : (locale === 'es' ? 'Ver logs' : 'Show logs')}
                    </button>
                  </div>
                </div>

                {/* Collapsible extra logs */}
                {logsOpen && (
                  <div className="font-mono text-[12px] text-white/60 mt-2 border-t border-white/10 pt-2">
                    <div>{timeLabel} plan → call → tool → compile → result</div>
                    <div>{locale === 'es' ? 'Modo' : 'Mode'}: {typeof navigator !== 'undefined' && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ? T.reduce : 'full'}</div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
