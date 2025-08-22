"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { PRM } from "@/lib/a11y/prm";

export interface FunctionCallingLoaderProps {
  onComplete?: () => void;
  /** When true forces fast mode (shorter durations) */
  forceFast?: boolean;
  /** Optional key to persist skip (localStorage). If present and stored value === "1", loader auto-skips */
  skipLocalStorageKey?: string;
}

// Timing (brand splash -> prompt sim -> progress)
const TIMING = {
  normal: {
    brandHold: 900,
    promptType: 1400,
    aiType: 1600,
    progress: 900,
    fadeOut: 500,
    between: 240,
  },
  fast: {
    brandHold: 500,
    promptType: 900,
    aiType: 1000,
    progress: 600,
    fadeOut: 400,
    between: 160,
  },
} as const;

// Progress frames (unicode bars) – minimal footprint
const PROGRESS_FRAMES = ["▁", "▃", "▅", "▇", "█"]; // will repeat to fake fill

export default function FunctionCallingLoader({ onComplete, forceFast, skipLocalStorageKey }: FunctionCallingLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const userTextRef = useRef<HTMLSpanElement>(null);
  const aiTextRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(true);

  // Locale + text map
  const locale: "es" | "en" = useMemo(
    () => (typeof navigator !== "undefined" && navigator.language?.startsWith("es") ? "es" : "en"),
    []
  );

  const TEXT = useMemo(() => locale === 'es' ? {
    userPrompt: 'acceder a portfolio LN',
    aiResponse: 'inicializando entorno · IA',
    skip: 'Omitir',
    brand: 'LN'
  } : {
    userPrompt: 'access LN portfolio',
    aiResponse: 'initializing environment · AI',
    skip: 'Skip',
    brand: 'LN'
  }, [locale]);

  // Decide fast mode: only if explicitly forced (not automatic detection)
  const fastMode = useMemo(() => {
    return Boolean(forceFast); // Only fast if explicitly requested
  }, [forceFast]);

  // Early skip if key stored - but only if not forced to always show
  useEffect(() => {
    // Don't skip if mode is "always" - let AppLoaderGate handle this
    return;
  }, [skipLocalStorageKey, onComplete]);

  useEffect(() => {
    if (!visible) return;
    if (!rootRef.current || PRM()) { setVisible(false); onComplete?.(); return; }
    const t = fastMode ? TIMING.fast : TIMING.normal;

    let cancelled = false;
    const run = async () => {
      // Stage 1: brand splash
      await new Promise(r => setTimeout(r, t.brandHold));
      if (cancelled) return;
      if (brandRef.current) brandRef.current.classList.add('fade-out');
      await new Promise(r => setTimeout(r, 280));
      if (cancelled) return;
      if (stageRef.current) stageRef.current.classList.remove('opacity-0');

      // Type helper
      const type = async (el: HTMLElement | null, text: string, dur: number) => {
        if (!el) return;
        el.textContent = '';
        const chars = text.split('');
        const delay = dur / chars.length;
        for (let i=0;i<chars.length;i++) {
          if (cancelled) return;
          el.textContent += chars[i];
          await new Promise(r => setTimeout(r, delay));
        }
      };

      await type(userTextRef.current, TEXT.userPrompt, t.promptType);
      await new Promise(r => setTimeout(r, t.between));
      await type(aiTextRef.current, TEXT.aiResponse, t.aiType);
      await new Promise(r => setTimeout(r, t.between));

      // Progress simulation
      const total = t.progress;
      const start = performance.now();
      const frames = PROGRESS_FRAMES;
      const loop = (now: number) => {
        if (cancelled) return;
        const elapsed = now - start;
        const ratio = Math.min(1, elapsed / total);
        if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`;
        if (progressRef.current) {
          const idx = Math.floor(ratio * (frames.length * 4));
            progressRef.current.textContent = frames[idx % frames.length];
        }
        if (ratio < 1) requestAnimationFrame(loop); else finish();
      };
      const finish = () => {
        if (cancelled) return;
        if (rootRef.current) rootRef.current.classList.add('loader-fade');
        setTimeout(() => {
          if (cancelled) return;
          if (skipLocalStorageKey) { try { localStorage.setItem(skipLocalStorageKey, '1'); } catch {} }
          setVisible(false);
          onComplete?.();
        }, t.fadeOut);
      };
      requestAnimationFrame(loop);
    };
    run();
    return () => { cancelled = true; };
  }, [fastMode, onComplete, visible, TEXT, skipLocalStorageKey]);

  if (!visible || PRM()) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] bg-black text-white font-sans">
      {/* Brand splash */}
      <div ref={brandRef} className="absolute inset-0 flex items-center justify-center select-none">
        <div className="text-center space-y-4">
          <h1 className="text-[clamp(4rem,15vw,10rem)] font-black tracking-tight leading-none brand-stroke techno-title" data-fill={TEXT.brand}>
            {TEXT.brand}
          </h1>
          <div className="h-px w-40 mx-auto bg-gradient-to-r from-white/0 via-white/60 to-white/0 animate-pulse" />
        </div>
      </div>
      {/* Prompt stage */}
      <div ref={stageRef} className="absolute inset-0 flex flex-col items-center justify-center gap-10 opacity-0 transition-opacity duration-500">
        <div className="w-full max-w-2xl px-6">
          <div className="space-y-6">
            <p className="text-sm text-white/40 font-mono uppercase tracking-widest">prompt</p>
            <p className="text-2xl md:text-3xl font-light text-white/90 min-h-[2.5em]">
              <span ref={userTextRef} />
              <span className="inline-block w-3 h-6 align-middle bg-white/70 ml-1 animate-blink" />
            </p>
            <p className="text-sm text-white/40 font-mono uppercase tracking-widest mt-10">system</p>
            <p className="text-xl md:text-2xl font-medium text-white/80 min-h-[2.2em]">
              <span ref={aiTextRef} />
            </p>
            <div className="mt-10 space-y-3">
              <div className="h-[3px] w-full bg-white/10 overflow-hidden rounded">
                <div ref={barRef} className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-white via-white to-white/30 transition-transform duration-150 ease-out" />
              </div>
              <span ref={progressRef} className="font-mono text-xs text-white/50 tracking-wider" />
            </div>
          </div>
        </div>
        {skipLocalStorageKey && (
          <button
            type="button"
            onClick={() => { try { localStorage.setItem(skipLocalStorageKey, '1'); } catch {}; setVisible(false); onComplete?.(); }}
            className="text-xs text-white/50 hover:text-white transition-colors font-mono tracking-wide"
          >
            {TEXT.skip}
          </button>
        )}
      </div>
    </div>
  );
}
