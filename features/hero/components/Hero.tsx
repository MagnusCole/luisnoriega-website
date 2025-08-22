"use client";
import React from 'react';
import Image from "next/image";
import heroContent from "../content/hero.json";
// Legacy GSAP reveal removed; using unified scroll reveal + parallax
import WireframePlaceholder from "@/shared/ui/WireframePlaceholder";
import dynamic from "next/dynamic";
// Scroll/Parallax utilities removidos para despliegue sin animaciones

// Dynamically import heavy WebGL component to avoid SSR issues & reduce initial bundle
const LuisCanvas = dynamic(() => import("./LuisCanvas"), { ssr: false, loading: () => null });

export default function Hero() {
  const rootRef = React.useRef<HTMLElement | null>(null);
  const nameRef = React.useRef<HTMLHeadingElement | null>(null);
  const photoRef = React.useRef<HTMLDivElement | null>(null);
  
  return (
    <section
      id="hero"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="hero-section relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-black"
    >
      <div className="container max-w-[1400px] mx-auto px-[clamp(2rem,8vw,8rem)] py-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center min-h-[80vh]">
          {/* Content Column */}
          <div className="space-y-8">
            <h1
              ref={nameRef}
              className="hero-name font-['Inter'] font-extrabold text-[clamp(4rem,12vw,9rem)] leading-[0.85] tracking-[-0.02em] whitespace-pre-line"
              style={{
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
                willChange: "transform, opacity"
              }}
            >
              {heroContent.name}
            </h1>
          </div>

          {/* Photo Column */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={photoRef}
              className="hero-photo relative w-[280px] h-[350px] sm:w-[360px] sm:h-[450px] lg:w-[480px] lg:h-[600px]"
              style={{ willChange: "transform, opacity" }}
            >
              {heroContent.photo.placeholder ? (
                <WireframePlaceholder
                  variant="portrait"
                  className="w-full h-full rounded-lg"
                  style={{
                    filter: "grayscale(100%) contrast(1.1) brightness(0.9)",
                    aspectRatio: "4/5",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <div className="w-full h-full rounded-lg overflow-hidden relative bg-black">
                  {/* WebGL Layer */}
                  <LuisCanvas className="absolute inset-0" intensity={1} />
                  {/* Fallback still image below (will show while canvas loading) */}
                  <Image
                    src={heroContent.photo.src}
                    alt={heroContent.photo.alt}
                    fill
                    priority
                    sizes="(min-width:1024px) 480px, (min-width:640px) 360px, 280px"
                    className="object-cover w-full h-full pointer-events-none select-none rounded-lg"
                    style={{ filter: "grayscale(100%) contrast(1.1) brightness(0.9)" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Minimal subtle scroll cue (downward arrow) */}
  <div className="pointer-events-none absolute bottom-6 inset-x-0 flex justify-center z-10">
        <button
          type="button"
          aria-label="Ir a portfolio"
          onClick={() => import("@/shared/motion/scrollers/scrollAnimations").then(m => m.scrollToSection('#portfolio'))}
          className="pointer-events-auto group relative w-8 h-8 flex items-center justify-center text-white/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
        >
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="w-4 h-4 translate-y-[-2px] group-hover:translate-y-[1px] transition-transform duration-500 ease-out"
            style={{ animation: 'heroCue 2.8s ease-in-out infinite' }}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M7.5 13.5 12 19l4.5-5.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}

