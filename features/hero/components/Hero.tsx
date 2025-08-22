"use client";
import Image from "next/image";
import heroContent from "../content/hero.json";
import { useHeroReveal } from "../motion/heroReveal";
import WireframePlaceholder from "@/shared/ui/WireframePlaceholder";

export default function Hero() {
  const { rootRef, nameRef, subtitleRef, photoRef } = useHeroReveal();
  
  return (
    <section
      ref={rootRef as React.RefObject<HTMLElement>}
      className="hero-section relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      <div className="container max-w-[1400px] mx-auto px-[clamp(2rem,8vw,8rem)] py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-16 items-center min-h-[80vh]">
          
          {/* Content Column */}
          <div className="space-y-8">
            <h1
              ref={nameRef}
              className="hero-name font-['Inter'] font-extrabold text-[clamp(4rem,12vw,9rem)] leading-[0.85] tracking-[-0.02em] whitespace-pre-line opacity-0"
              style={{ 
                textRendering: "optimizeLegibility", 
                WebkitFontSmoothing: "antialiased",
                willChange: "transform, opacity"
              }}
            >
              {heroContent.name}
            </h1>
            
            <p
              ref={subtitleRef}
              className="hero-subtitle font-['Inter'] font-normal text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.4] text-white/80 max-w-2xl opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              {heroContent.subtitle}
            </p>
          </div>

          {/* Photo Column */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={photoRef}
              className="hero-photo relative w-[280px] h-[350px] sm:w-[360px] sm:h-[450px] lg:w-[480px] lg:h-[600px] opacity-0"
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
                <div className="w-full h-full rounded-lg overflow-hidden relative">
                  <Image
                    src={heroContent.photo.src}
                    alt={heroContent.photo.alt}
                    fill
                    className="object-cover"
                    style={{
                      filter: "grayscale(100%) contrast(1.1) brightness(0.9)"
                    }}
                    priority
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, 480px"
                  />
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
 
