"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, TextPlugin } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

interface AIPromptLoaderProps {
  onComplete?: () => void;
  duration?: number;
}

export default function AIPromptLoader({ 
  onComplete, 
  duration = 6000 
}: AIPromptLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const userPromptRef = useRef<HTMLDivElement>(null);
  const aiResponseRef = useRef<HTMLDivElement>(null);
  const gatherTextRef = useRef<HTMLParagraphElement>(null);
  const philosophyLabelRef = useRef<HTMLSpanElement>(null);
  const philosophyBarRef = useRef<HTMLSpanElement>(null);
  const expertiseLabelRef = useRef<HTMLSpanElement>(null);
  const expertiseBarRef = useRef<HTMLSpanElement>(null);
  const projectsLabelRef = useRef<HTMLSpanElement>(null);
  const projectsBarRef = useRef<HTMLSpanElement>(null);
  const contactLabelRef = useRef<HTMLSpanElement>(null);
  const contactBarRef = useRef<HTMLSpanElement>(null);
  const readyTextRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!containerRef.current || PRM()) {
      // Si PRM está activo, mostrar estado final inmediatamente
      if (onComplete) {
        setTimeout(onComplete, 100);
      }
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 1000);
        }
      });

      // Fase 1: Aparece el prompt del usuario
      tl.to(userPromptRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });

      // Fase 2: Aparece la caja de respuesta de la IA con typing indicator
      tl.to(aiResponseRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "+=0.5");

      // Fase 3: La IA empieza a "escribir" la respuesta
      tl.to(gatherTextRef.current, {
        text: "I understand you want to explore Luis Noriega's work.\n\nLet me gather his:",
        duration: 1.5,
        ease: "none"
      }, "+=0.8");

      // Fase 4: Barras de progreso aparecen progresivamente
      tl.to(philosophyLabelRef.current, {
        text: "→ Design philosophy",
        duration: 0.4,
        ease: "none"
      }, "+=0.3");

      tl.to(philosophyBarRef.current, {
        text: "████████░░ 80%",
        duration: 0.6,
        ease: "power2.out"
      }, "+=0.2");

      tl.to(expertiseLabelRef.current, {
        text: "→ Technical expertise",
        duration: 0.4,
        ease: "none"
      }, "+=0.2");

      tl.to(expertiseBarRef.current, {
        text: "██████████ 100%",
        duration: 0.6,
        ease: "power2.out"
      }, "+=0.2");

      tl.to(projectsLabelRef.current, {
        text: "→ Creative projects",
        duration: 0.4,
        ease: "none"
      }, "+=0.2");

      tl.to(projectsBarRef.current, {
        text: "████████░░ 85%",
        duration: 0.6,
        ease: "power2.out"
      }, "+=0.2");

      tl.to(contactLabelRef.current, {
        text: "→ Contact information",
        duration: 0.4,
        ease: "none"
      }, "+=0.2");

      tl.to(contactBarRef.current, {
        text: "██████████ 100%",
        duration: 0.6,
        ease: "power2.out"
      }, "+=0.2");

      // Fase 5: "Ready!" 
      tl.to(readyTextRef.current, {
        text: "Ready! Here's",
        duration: 0.6,
        ease: "none"
      }, "+=0.5");

      // Fase 6: Efecto typewriter para el nombre final
      tl.to(nameRef.current, {
        text: "LUIS NORIEGA",
        duration: 1.2,
        ease: "none",
        delay: 0.3
      }, "+=0.3");

      // Fase 7: Fade out de todo el chat
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut"
      }, "+=1.5");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete, duration]);

  // Si PRM está activo o el loader ya terminó, no renderizar nada
  if (PRM() || !isVisible) {
    return null;
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 bg-gray-900 flex items-center justify-center font-sans"
    >
      <div className="max-w-2xl w-full mx-auto px-8">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Header del chat como ChatGPT */}
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Portfolio Generator</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
          </div>

          {/* Contenido del chat */}
          <div className="p-6 space-y-6 min-h-[400px]">
            {/* Mensaje del usuario */}
            <div 
              ref={userPromptRef}
              className="flex justify-end opacity-0 translate-y-4"
            >
              <div className="bg-blue-500 text-white rounded-lg px-4 py-3 max-w-xs">
                <p className="text-sm">Genera el Portafolio de Luis Noriega</p>
              </div>
            </div>

            {/* Respuesta de la IA */}
            <div 
              ref={aiResponseRef}
              className="flex justify-start opacity-0 translate-y-4"
            >
              <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-3 max-w-lg">
                <p ref={gatherTextRef} className="text-sm whitespace-pre-line mb-4"></p>
                
                <div className="space-y-2 font-mono text-xs">
                  <div className="flex justify-between items-center">
                    <span ref={philosophyLabelRef} className="text-gray-700"></span>
                    <span ref={philosophyBarRef} className="font-bold text-green-600"></span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span ref={expertiseLabelRef} className="text-gray-700"></span>
                    <span ref={expertiseBarRef} className="font-bold text-green-600"></span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span ref={projectsLabelRef} className="text-gray-700"></span>
                    <span ref={projectsBarRef} className="font-bold text-green-600"></span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span ref={contactLabelRef} className="text-gray-700"></span>
                    <span ref={contactBarRef} className="font-bold text-green-600"></span>
                  </div>
                </div>

                <p ref={readyTextRef} className="text-sm font-semibold mt-4 text-center"></p>
                
                <div 
                  ref={nameRef} 
                  className="text-3xl font-black text-center mt-4 text-gray-900 tracking-wider"
                  style={{ fontFamily: 'var(--font-work-sans)' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
