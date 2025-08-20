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
  const aiRef = useRef<HTMLDivElement>(null);

  // Lines in AI code block
  const planningRef = useRef<HTMLParagraphElement>(null);
  const callRef = useRef<HTMLParagraphElement>(null);
  const toolBadgeRef = useRef<HTMLDivElement>(null);
  const toolBlockRef = useRef<HTMLDivElement>(null);
  const compilingRef = useRef<HTMLParagraphElement>(null);
  const check1Ref = useRef<HTMLParagraphElement>(null);
  const check2Ref = useRef<HTMLParagraphElement>(null);
  const loadingRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLParagraphElement>(null);
  const safetyRef = useRef<HTMLParagraphElement>(null);
  const experienceRef = useRef<HTMLParagraphElement>(null);
  const projectsRef = useRef<HTMLParagraphElement>(null);
  const phaseRef = useRef<HTMLDivElement>(null);
  const resultLineRef = useRef<HTMLDivElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const typingRef = useRef<HTMLSpanElement>(null);
  // no placeholder needed; we keep loading line in panel
  // Blink state trackers
  const resultCaretBlinking = useRef(false);
  const promptCaretBlinking = useRef(false);
  // Prompt input (bottom bar)
  const promptBarRef = useRef<HTMLDivElement>(null);
  const promptBarTextRef = useRef<HTMLSpanElement>(null);
  const promptBarCaretRef = useRef<HTMLSpanElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  // Presets wired inside effect to avoid deps warning

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
  rendering: "Renderizando…",
  loading: "cargando…",
      validatedExperience: "✓ experiencia validada",
      projectsFound: "✓ proyectos encontrados",
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
  rendering: "Rendering…",
  loading: "loading…",
      validatedExperience: "✓ experience validated",
      projectsFound: "✓ projects found",
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
    // Reserve space for bottom bar so main card centers above it
    const applyBottomReserve = () => {
      if (!containerRef.current || !promptBarRef.current) return;
      const h = promptBarRef.current.offsetHeight || 0;
      containerRef.current.style.paddingBottom = `${h + 8}px`;
      // expose as CSS var so inner panel can compute full height
      containerRef.current.style.setProperty('--ln-pb', `${h}px`);
    };
    applyBottomReserve();
    const onResize = () => requestAnimationFrame(applyBottomReserve);
    window.addEventListener('resize', onResize);

  // Type-safe Save-Data detection
    const saveData = typeof navigator !== "undefined" && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const ultraSmooth = {
      prompt: { base: 0.044, jitter: 0.022, pauseSemantic: 0.09 },
      panel: { delay: 0.12, entrance: 0.36 },
      phases: { planning: 0.42, calling: 0.62, tool: 0.56, compiling: 0.56, check: 0.25, bounce: 0.18 },
      resultHold: 1.25,
      flip: { duration: 0.68 },
      hero: { base: 0.06, jitter: 0.05, pauseSeparator: 0.08 },
      overlay: { fade: 0.5, delayAfterType: 0.1 },
      caretBlink: 0.5,
    } as const;
    const fast = {
      prompt: { base: 0.03, jitter: 0.015, pauseSemantic: 0.05 },
      panel: { delay: 0.08, entrance: 0.28 },
      phases: { planning: 0.32, calling: 0.42, tool: 0.4, compiling: 0.4, check: 0.2, bounce: 0.12 },
      resultHold: 0.6,
      flip: { duration: 0.55 },
      hero: { base: 0.035, jitter: 0.015, pauseSeparator: 0.05 },
      overlay: { fade: 0.35, delayAfterType: 0.06 },
      caretBlink: 0.45,
    } as const;
    const cfg = saveData ? fast : ultraSmooth;

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
  setPhase(T.rendering);
        if (planningRef.current) planningRef.current.textContent = `${T.planning} ${T.reduce}`;
        if (callRef.current) callRef.current.textContent = T.calling;
        if (toolBlockRef.current) toolBlockRef.current.textContent = prettyJSON;
        if (compilingRef.current) compilingRef.current.textContent = T.compiling;
        if (check1Ref.current) check1Ref.current.textContent = T.fetched;
        if (check2Ref.current) check2Ref.current.textContent = T.composed;
  if (loadingRef.current) loadingRef.current.textContent = T.loading;
        if (experienceRef.current) experienceRef.current.textContent = T.validatedExperience;
        if (projectsRef.current) projectsRef.current.textContent = T.projectsFound;
        if (nameRef.current) nameRef.current.textContent = "LUIS NORIEGA";
        if (promptBarTextRef.current) promptBarTextRef.current.textContent = T.prompt;
        if (promptBarCaretRef.current) gsap.set(promptBarCaretRef.current, { opacity: 0 });
  gsap.to(containerRef.current, { opacity: 0, duration: cfg.overlay.fade, delay: cfg.overlay.delayAfterType, onComplete: () => { setIsVisible(false); onComplete?.(); } });
        return;
      }

      // Type prompt at bottom, then show bubbles above
      // Compute typing schedule for prompt
  const prompt = T.prompt;
  const baseP = cfg.prompt.base;
  const jitterP = cfg.prompt.jitter;
      let accP = 0;
      // Prepare prompt bar
      if (promptBarTextRef.current) promptBarTextRef.current.textContent = "";
      if (promptBarCaretRef.current) {
        gsap.set(promptBarCaretRef.current, { opacity: 1 });
        promptCaretBlinking.current = true;
  gsap.to(promptBarCaretRef.current, { opacity: 0.25, duration: cfg.caretBlink, repeat: -1, yoyo: true, ease: "none" });
      }
      for (let i = 0; i < prompt.length; i++) {
        const ch = prompt[i];
  let d = baseP + Math.random() * jitterP;
  if (ch === " " || ch === "," || ch === ".") d += cfg.prompt.pauseSemantic; // natural pause
        accP += d;
        gsap.delayedCall(accP, () => {
          if (!promptBarTextRef.current) return;
          promptBarTextRef.current.textContent = (promptBarTextRef.current.textContent || "") + ch;
        });
      }
      gsap.delayedCall(accP + 0.05, () => {
        if (promptBarCaretRef.current) {
          promptCaretBlinking.current = false;
          gsap.to(promptBarCaretRef.current, { opacity: 0, duration: 0.2 });
        }
      });

  const tl = gsap.timeline({ defaults: { ease: "none" } , onComplete: () => {
        const hero = document.getElementById("hero-title");
        const finalize = () => {
  gsap.to(containerRef.current, { opacity: 0, duration: cfg.overlay.fade, delay: cfg.overlay.delayAfterType, ease: "power2.inOut", onComplete: () => { setIsVisible(false); onComplete?.(); } });
        };

        if (hero && resultLineRef.current) {
          const originals = Array.from(hero.children).filter(el => (el as HTMLElement).tagName === 'SPAN' && !(el as HTMLElement).classList.contains('sr-only')) as HTMLElement[];
          if (originals.length) gsap.set(originals, { opacity: 0 });

          const state = Flip.getState(resultLineRef.current);
          // stop loading pulse and hide it softly before FLIP
          if (loadingRef.current) { gsap.killTweensOf(loadingRef.current); gsap.to(loadingRef.current, { opacity: 0, duration: 0.25, ease: "power1.out" }); }
          hero.appendChild(resultLineRef.current);
          // will-change during FLIP for smoother paint
          gsap.set(resultLineRef.current, { willChange: 'transform' });
          Flip.from(state, { duration: cfg.flip.duration, ease: "power2.inOut", onComplete: () => { if (resultLineRef.current) gsap.set(resultLineRef.current, { willChange: 'auto' }); } });

          // Start hero typing with caret only after FLIP
          if (nameRef.current) nameRef.current.textContent = "";
          if (caretRef.current) {
            gsap.set(caretRef.current, { visibility: 'visible', opacity: 1 });
            resultCaretBlinking.current = true;
            gsap.to(caretRef.current, { opacity: 0.25, duration: cfg.caretBlink, repeat: -1, yoyo: true, ease: "none" });
          }

          const typed = "L-U-I-S N-O-R-I-E-G-A";
          const base = cfg.hero.base;
          const jitter = cfg.hero.jitter;
          let acc = 0;
          // slight delay after FLIP before typing for smoother handoff
          acc += 0.06;
          for (let i = 0; i < typed.length; i++) {
            const ch = typed[i];
            let d = base + Math.random() * jitter;
            if (ch === "-" || ch === " ") d += cfg.hero.pauseSeparator; // micro pause on separators
            acc += d;
            gsap.delayedCall(acc, () => {
              if (!nameRef.current) return;
              nameRef.current.textContent = (nameRef.current.textContent || "") + ch;
            });
          }

          gsap.delayedCall(acc + 0.15, () => {
            if (caretRef.current) {
              resultCaretBlinking.current = false;
              gsap.killTweensOf(caretRef.current);
              gsap.to(caretRef.current, { opacity: 0, duration: 0.35, ease: "power1.out", onComplete: () => { if (caretRef.current) gsap.set(caretRef.current, { visibility: 'hidden' }); } });
            }
            // Fade out the Result line gracefully at the end
            if (resultLineRef.current) gsap.to(resultLineRef.current, { opacity: 0, duration: 0.4, ease: "power2.out", onComplete: () => { if (resultLineRef.current) resultLineRef.current.remove(); } });
            if (originals.length) gsap.to(originals, { opacity: 1, duration: 0.4, ease: "power2.out" });
            finalize();
          });
        } else {
          finalize();
        }
      }});

      // Wait for bottom typing to finish, then start AI bubble above (no prompt echo)
      tl.to({}, { duration: accP })
        .to({}, { duration: cfg.panel.delay })
        .set(aiRef.current, { visibility: 'visible' })
        .fromTo(aiRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: cfg.panel.entrance, ease: "power2.out" })
        .add(() => { setPhase(locale === "es" ? "Pensando" : "Thinking"); showTyping(true); })
        .to(planningRef.current, { text: T.planning, duration: cfg.phases.planning })
        .add(() => { setPhase(locale === "es" ? "Llamando" : "Calling"); })
        .to(callRef.current,      { text: `${timeLabel} ${T.calling}`, duration: cfg.phases.calling })
        .add(() => showTyping(true), "+=0.08")
        .add(() => { setPhase(locale === "es" ? "Recibiendo" : "Receiving"); })
        .to(toolBadgeRef.current, { opacity: 1, duration: 0.2 })
    .to(toolBlockRef.current, { text: prettyJSON, duration: cfg.phases.tool })
  .add(() => { setPhase(locale === "es" ? "Compilando" : "Compiling"); })
  .to(compilingRef.current, { text: `${timeLabel} ${T.compiling}`, duration: cfg.phases.compiling })
        .to(check1Ref.current,    { text: T.fetched, duration: cfg.phases.check, onStart: () => { if (check1Ref.current) { gsap.fromTo(check1Ref.current, { scale: 1.08 }, { scale: 1, duration: cfg.phases.bounce, ease: "power2.out" }); } } })
  .to(check2Ref.current,    { text: T.composed, duration: cfg.phases.check, onStart: () => { if (check2Ref.current) { gsap.fromTo(check2Ref.current, { scale: 1.08 }, { scale: 1, duration: cfg.phases.bounce, ease: "power2.out" }); } } })
  .to(experienceRef.current, { text: T.validatedExperience, duration: cfg.phases.check, onStart: () => { if (experienceRef.current) { gsap.fromTo(experienceRef.current, { scale: 1.08 }, { scale: 1, duration: cfg.phases.bounce, ease: 'power2.out' }); } } })
  .to(projectsRef.current, { text: T.projectsFound, duration: cfg.phases.check, onStart: () => { if (projectsRef.current) { gsap.fromTo(projectsRef.current, { scale: 1.08 }, { scale: 1, duration: cfg.phases.bounce, ease: 'power2.out' }); } } })
  .to(metaRef.current, { text: locale === 'es' ? 'modelo: concierge‑v1.2 • seguridad activa' : 'model: concierge‑v1.2 • safety on', duration: 0.4 })
  .to(safetyRef.current, { text: locale === 'es' ? 'verificando SEO y accesibilidad…' : 'validating SEO and accessibility…', duration: 0.4 })
  .to(experienceRef.current, { text: T.validatedExperience, duration: cfg.phases.check, onStart: () => { if (experienceRef.current) { gsap.fromTo(experienceRef.current, { scale: 1.08 }, { scale: 1, duration: cfg.phases.bounce, ease: 'power2.out' }); } } })
  .to(projectsRef.current, { text: T.projectsFound, duration: cfg.phases.check, onStart: () => { if (projectsRef.current) { gsap.fromTo(projectsRef.current, { scale: 1.08 }, { scale: 1, duration: cfg.phases.bounce, ease: 'power2.out' }); } } })
  .add(() => { setPhase(T.rendering); showTyping(false); })
  .to(loadingRef.current, { text: T.loading, duration: 0.3 })
  .add(() => { if (loadingRef.current) { gsap.set(loadingRef.current, { opacity: 0.7 }); gsap.to(loadingRef.current, { opacity: 0.3, duration: 0.8, repeat: -1, yoyo: true, ease: "sine.inOut" }); } })
  // Hold on result before transitioning to hero typing
  .to({}, { duration: cfg.resultHold });

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

    const onVis = () => {
      if (typeof document === 'undefined') return;
      if (document.hidden) {
        if (promptCaretBlinking.current && promptBarCaretRef.current) {
          gsap.killTweensOf(promptBarCaretRef.current);
          gsap.set(promptBarCaretRef.current, { opacity: 0 });
        }
        if (resultCaretBlinking.current && caretRef.current) {
          gsap.killTweensOf(caretRef.current);
          gsap.set(caretRef.current, { opacity: 0 });
        }
      } else {
        if (promptCaretBlinking.current && promptBarCaretRef.current) {
          gsap.to(promptBarCaretRef.current, { opacity: 0.25, duration: 0.5, repeat: -1, yoyo: true, ease: "none" });
        }
        if (resultCaretBlinking.current && caretRef.current) {
          gsap.to(caretRef.current, { opacity: 0.25, duration: 0.5, repeat: -1, yoyo: true, ease: "none" });
        }
      }
    };

    window.addEventListener("keydown", onKey);
    document.addEventListener("visibilitychange", onVis);
    return () => {
  window.removeEventListener("keydown", onKey);
  window.removeEventListener('resize', onResize);
      document.removeEventListener("visibilitychange", onVis);
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

  <div className="w-full max-w-2xl px-6" style={{ height: 'calc(100vh - var(--ln-pb, 0px) - 16px)' }}>
        <div className="border border-white/10 rounded-xl overflow-hidden h-full flex flex-col" style={{ opacity: 0, transform: 'translateY(12px)' }} ref={aiRef}>
          {/* Header */}
          <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3 text-white/70 text-sm">
            <div className="w-2 h-2 rounded-full bg-white/40" aria-hidden />
            <span>{T.headerRole} • {timeLabel}</span>
          </div>

          {/* Chat area */}
          <div className="p-5 space-y-5 flex-1 overflow-auto">
            {/* AI bubble with monospace code block */}
            <div className="flex justify-start">
              <div className="rounded-lg px-4 py-3 text-sm bg-black border border-white/15 w-full max-w-[90%]">
                <div className="font-mono text-white/90 space-y-1" role="log" aria-live="polite">
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
                  <p ref={experienceRef} />
                  <p ref={projectsRef} />
                  <p ref={metaRef} className="text-white/70" />
                  <p ref={safetyRef} className="text-white/70" />
                  <p ref={experienceRef} />
                  <p ref={projectsRef} />

                  {/* Persistent loading line */}
                  <p ref={loadingRef} className="mt-1 text-white/60" />

                  {/* Result line – used for Flip */}
                  <div ref={resultLineRef} className="mt-2 text-center">
                    <span ref={caretRef} aria-hidden className="inline-block opacity-0 select-none" style={{ visibility: 'hidden' }}>|</span>
                    <span ref={nameRef} className="inline-block ml-2 text-3xl font-black tracking-wide" style={{ fontFamily: 'var(--font-work-sans)' }} />
                  </div>
                  
                </div>

                {/* Details panel */}
                <div className="font-mono text-[12px] text-white/60 mt-2 border-t border-white/10 pt-2 grid grid-cols-1 sm:grid-cols-2 gap-y-1">
                  <div>{locale === 'es' ? 'Modelo' : 'Model'}: Concierge v1.2</div>
                  <div>{locale === 'es' ? 'Acción' : 'Action'}: generatePortfolio</div>
                  <div>{locale === 'es' ? 'Herramientas' : 'Tools'}: SplitText, Flip, Text</div>
                  <div>{locale === 'es' ? 'Seguridad' : 'Safety'}: PRM + Save-Data</div>
                  <div>{locale === 'es' ? 'Pasos' : 'Steps'}: plan → call → tool → compile → result</div>
                  <div>{locale === 'es' ? 'Latencia' : 'Latency'}: ~{(Math.random()*0.4+0.6).toFixed(2)}s</div>
                  <div>{locale === 'es' ? 'Verificaciones' : 'Checks'}: 2/2 {locale === 'es' ? 'aprobadas' : 'passed'}</div>
                  <div>ID: run-{Math.floor(Math.random()*90000)+10000}</div>
                  <div>{locale === 'es' ? 'Modo' : 'Mode'}: {typeof navigator !== 'undefined' && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ? T.reduce : 'full'}</div>
                  <div>{locale === 'es' ? 'Atajos' : 'Shortcuts'}: S={locale === 'es' ? 'saltar' : 'skip'}, R={locale === 'es' ? 'repetir' : 're-run'}</div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom prompt input bar */}
      <div ref={promptBarRef} className="pointer-events-none fixed bottom-0 left-0 right-0 w-full" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}>
        <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 pb-2 sm:pb-4">
          <div className="border border-white/15 bg-black/80 backdrop-blur rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2">
            <span className="text-white/50 text-[11px] sm:text-xs">Prompt</span>
            <span className="flex-1 font-sans tracking-wide text-sm sm:text-base">
              <span ref={promptBarTextRef} />
              <span ref={promptBarCaretRef} aria-hidden className="inline-block ml-1 opacity-0 select-none">|</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
