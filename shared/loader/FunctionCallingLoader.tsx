"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

export interface FunctionCallingLoaderProps {
  onComplete?: () => void;
  /** When true forces fast mode (shorter durations) */
  forceFast?: boolean;
  /** Optional key to persist skip (localStorage). If present and stored value === "1", loader auto-skips */
  skipLocalStorageKey?: string;
}

// Centralized timing presets (normal vs fast)
const TIMING = {
  normal: {
    userPrompt: 0.8,
    aiResponse: 1.2,
    progress: 0.8,
    fadeDelay: 0.4,
    fadeOut: 0.6,
  },
  fast: {
    userPrompt: 0.4,
    aiResponse: 0.6,
    progress: 0.4,
    fadeDelay: 0.2,
    fadeOut: 0.4,
  },
} as const;

// Progress frames for loading animation
const PROGRESS_FRAMES = [
  "[██░░░░░░] 25%",
  "[████░░░░] 50%",
  "[██████░░] 75%",
  "[█████████] 100%",
];

export default function FunctionCallingLoader({ onComplete, forceFast, skipLocalStorageKey }: FunctionCallingLoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const userBubbleRef = useRef<HTMLDivElement>(null);
  const aiBubbleRef = useRef<HTMLDivElement>(null);
  const userTextRef = useRef<HTMLSpanElement>(null);
  const aiTextRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLParagraphElement>(null);

  const [visible, setVisible] = useState(true);

  // Locale + text map
  const locale: "es" | "en" = useMemo(
    () => (typeof navigator !== "undefined" && navigator.language?.startsWith("es") ? "es" : "en"),
    []
  );

  const TEXT = useMemo(
    () =>
      locale === "es"
        ? {
            userPrompt: "Quiero ver el portafolio de Luis Noriega",
            aiResponse: "Entendido. Cargando el portafolio...",
            agent: "Agente IA",
            skip: "Saltar",
          }
        : {
            userPrompt: "Show me Luis Noriega's portfolio",
            aiResponse: "Understood. Loading portfolio...",
            agent: "AI Agent",
            skip: "Skip",
          },
    [locale]
  );

  // Decide fast mode: user flag OR Save-Data OR hidden tab
  const fastMode = useMemo(() => {
    if (forceFast) return true;
    if (typeof navigator !== "undefined") {
      const anyNav = navigator as Navigator & { connection?: { saveData?: boolean } };
      if (anyNav.connection?.saveData) return true;
    }
    if (typeof document !== "undefined" && document.visibilityState === "hidden") return true;
    return false;
  }, [forceFast]);

  // Early skip if key stored
  useEffect(() => {
    if (!skipLocalStorageKey) return;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(skipLocalStorageKey) === "1") {
      setVisible(false);
      onComplete?.();
    }
  }, [skipLocalStorageKey, onComplete]);

  useEffect(() => {
    if (!visible) return; // already skipped
    if (!rootRef.current || PRM()) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const tcfg = fastMode ? TIMING.fast : TIMING.normal;
    const tl = gsap.timeline({ defaults: { ease: "none" } });

    // Helper to set text with typewriter effect
    const typeText = (ref: React.RefObject<HTMLElement | null>, text: string, duration: number) => {
      const node = ref.current;
      if (!node) return;
      
      // Reset content
      node.textContent = "";
      
      // Type character by character
      const chars = text.split("");
      const delay = duration / chars.length;
      
      chars.forEach((char, i) => {
        gsap.delayedCall(delay * i, () => {
          if (node) node.textContent += char;
        });
      });
    };

    // Animation sequence
    tl
      // Show user bubble first
      .fromTo(userBubbleRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      // Type user prompt
      .call(() => typeText(userTextRef, TEXT.userPrompt, tcfg.userPrompt))
      .to({}, { duration: tcfg.userPrompt + 0.2 })
      // Show AI bubble
      .fromTo(aiBubbleRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
      // Type AI response
      .call(() => typeText(aiTextRef, TEXT.aiResponse, tcfg.aiResponse))
      .to({}, { duration: tcfg.aiResponse + 0.3 })
      // Progress animation
      .call(() => {
        const frameDur = tcfg.progress / PROGRESS_FRAMES.length;
        PROGRESS_FRAMES.forEach((frame, index) => {
          gsap.delayedCall(frameDur * index, () => {
            if (progressRef.current) progressRef.current.textContent = frame;
          });
        });
      })
      .to({}, { duration: tcfg.progress + tcfg.fadeDelay })
      .to(rootRef.current, {
        opacity: 0,
        duration: tcfg.fadeOut,
        onComplete: () => {
          if (skipLocalStorageKey) {
            try { localStorage.setItem(skipLocalStorageKey, "1"); } catch {}
          }
          setVisible(false);
          onComplete?.();
        },
      });

    return () => {
      tl.kill();
    };
  }, [fastMode, onComplete, visible, TEXT, skipLocalStorageKey]);

  if (!visible || PRM()) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[100] bg-black text-white grid place-items-center will-change-opacity">
      <div className="w-full max-w-xl px-6">
        <div className="border border-white/10 rounded-xl bg-black/80 backdrop-blur">
          {/* Header */}
          <div className="px-5 py-3 border-b border-white/10 flex items-center gap-3 text-white/70 text-sm">
            <div className="w-2 h-2 rounded-full bg-white/40" aria-hidden />
            <span>{TEXT.agent}</span>
          </div>

          {/* Chat area */}
          <div className="p-5 space-y-4">
            {/* User bubble */}
            <div ref={userBubbleRef} className="flex justify-end opacity-0">
              <div className="bg-blue-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                <span ref={userTextRef} className="text-sm"></span>
              </div>
            </div>

            {/* AI bubble */}
            <div ref={aiBubbleRef} className="flex justify-start opacity-0">
              <div className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 max-w-[80%]">
                <div className="space-y-2">
                  <p ref={aiTextRef} className="text-sm"></p>
                  <p ref={progressRef} className="font-mono text-xs text-white/70"></p>
                </div>
              </div>
            </div>
          </div>

          {skipLocalStorageKey && (
            <div className="px-5 pb-3">
              <button
                type="button"
                onClick={() => {
                  try { localStorage.setItem(skipLocalStorageKey, "1"); } catch {}
                  setVisible(false);
                  onComplete?.();
                }}
                className="text-xs text-white/70 hover:text-white transition-colors"
              >
                {TEXT.skip}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
