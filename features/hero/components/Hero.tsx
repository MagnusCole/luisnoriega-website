"use client";
import heroContent from "../content/hero.json";

export default function Hero() {
  // Static hero, no text effects

  return (
    <section
      className="hero relative min-h-screen overflow-hidden flex items-center justify-center text-white pt-14 sm:pt-16 bg-black">

      <div className="container relative z-[10] text-center">
        <h1
          id="hero-title"
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-white/90"
          style={{
            textRendering: "optimizeLegibility",
            WebkitFontSmoothing: "antialiased"
          }}
        >
          {heroContent.title}
        </h1>
        
        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-white/60 max-w-2xl mx-auto">
          {heroContent.subtitle}
        </p>
      </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40" aria-hidden="true">
        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
 
