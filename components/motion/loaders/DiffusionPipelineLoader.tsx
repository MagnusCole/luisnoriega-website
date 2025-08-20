"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

interface DiffusionPipelineLoaderProps {
  onComplete?: () => void;
}

export default function DiffusionPipelineLoader({ onComplete }: DiffusionPipelineLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const aiRef = useRef<HTMLDivElement>(null);

  const lineEncodingRef = useRef<HTMLParagraphElement>(null);
  const lineLatentRef = useRef<HTMLParagraphElement>(null);
  const lineDenoiseRef = useRef<HTMLParagraphElement>(null);
  const lineProgressRef = useRef<HTMLParagraphElement>(null);
  const lineGuidanceRef = useRef<HTMLParagraphElement>(null);
  const lineDecodeRef = useRef<HTMLParagraphElement>(null);
  const lineCurateRef = useRef<HTMLParagraphElement>(null);
  const lineConvergedRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || PRM()) {
      // Respetar PRM: sin animación
      onComplete?.();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onComplete: () => {
          gsap.to(containerRef.current, { opacity: 0, duration: 0.7, ease: "power2.inOut", delay: 1.1, onComplete: () => {
            setIsVisible(false);
            onComplete?.();
          }});
        }
      });

      // Aparición de burbujas (usuario → IA)
      tl.fromTo(userRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" })
        .fromTo(aiRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "+=0.3");

      // Secuencia Diffusion Pipeline
      tl.to(lineEncodingRef.current, { text: "Encoding prompt…", duration: 0.5 })
        .to(lineLatentRef.current, { text: "Latent init (σ=1.0)", duration: 0.5 }, "+=0.1")
        .to(lineDenoiseRef.current, { text: "Denoise steps t=50→0", duration: 0.5 }, "+=0.1")
        // Progreso ASCII (5 pasos rápidos)
        .to(lineProgressRef.current, { text: "[██░░░░░░] 20%", duration: 0.25 }, "+=0.05")
        .to(lineProgressRef.current, { text: "[████░░░░] 40%", duration: 0.25 })
        .to(lineProgressRef.current, { text: "[██████░░] 60%", duration: 0.25 })
        .to(lineProgressRef.current, { text: "[████████░] 80%", duration: 0.25 })
        .to(lineProgressRef.current, { text: "[█████████] 100%", duration: 0.25 })
        .to(lineGuidanceRef.current, { text: "Guidance cfg=7.5", duration: 0.45 }, "+=0.05")
        .to(lineDecodeRef.current, { text: "Decode", duration: 0.45 })
        .to(lineCurateRef.current, { text: "Curate", duration: 0.45 })
        .to(lineConvergedRef.current, { text: "Converged", duration: 0.45 });

      // Nombre final (typewriter)
      tl.to(nameRef.current, { text: "LUIS NORIEGA", duration: 1.2, ease: "none", delay: 0.2 });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isVisible || PRM()) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-2xl px-6">
        <div className="border border-white/10 rounded-xl overflow-hidden">
          {/* Header minimal */}
          <div className="px-5 py-3 border-b border-white/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-white/40" />
            <span className="text-sm text-white/70">Generative Pipeline</span>
          </div>

          {/* Chat area */}
          <div className="p-5 space-y-5">
            {/* User bubble */}
            <div ref={userRef} className="flex justify-end">
              <div className="border border-white/20 rounded-lg px-4 py-2 text-sm">
                Generate portfolio: <span className="font-semibold">Luis Noriega</span>
              </div>
            </div>

            {/* AI bubble */}
            <div ref={aiRef} className="flex justify-start">
              <div className="rounded-lg px-4 py-3 text-sm text-white/90 bg-white/5 border border-white/10 w-full max-w-[85%]">
                <div className="font-mono space-y-1">
                  <p ref={lineEncodingRef} />
                  <p ref={lineLatentRef} />
                  <p ref={lineDenoiseRef} />
                  <p ref={lineProgressRef} />
                  <p ref={lineGuidanceRef} />
                  <p ref={lineDecodeRef} />
                  <p ref={lineCurateRef} />
                  <p ref={lineConvergedRef} />
                </div>

                <div className="mt-4 text-center">
                  <div ref={nameRef} className="text-3xl font-black tracking-wide" style={{ fontFamily: 'var(--font-work-sans)' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
