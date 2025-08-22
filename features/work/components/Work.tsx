"use client";
import workContent from "../content/work.json";
import { useWorkGridReveal } from "../motion/workGridReveal";
import WireframePlaceholder from "@/shared/ui/WireframePlaceholder";

interface WorkCardProps {
  card: typeof workContent.cards[0];
  index: number;
}

function WorkCard({ card, index }: WorkCardProps) {
  return (
    <article 
      className="work-card group cursor-pointer"
      data-card-index={index}
    >
      {/* Media Container */}
      <div className="relative overflow-hidden rounded-lg bg-gray-900/10 aspect-[16/10] mb-4">
        {/* Video Preview (placeholder for now) */}
        <div className="absolute inset-0">
          <WireframePlaceholder
            variant="image"
            className="w-full h-full"
            label={`${card.title} Preview`}
            style={{
              aspectRatio: card.specs.aspect,
              backgroundColor: "#0a0a0a",
              border: "1px solid #333"
            }}
          />
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${
            card.status === "Listo" 
              ? "bg-green-500/20 text-green-300" 
              : card.status === "En curso"
              ? "bg-blue-500/20 text-blue-300"
              : "bg-yellow-500/20 text-yellow-300"
          }`}>
            {card.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-white/80 transition-colors">
            {card.title}
          </h3>
          <p className="text-sm text-white/60 mt-1 leading-relaxed">
            {card.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-white/5 text-white/70 rounded border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Validation */}
        <div className="text-xs text-white/40 italic">
          Valida: {card.validation}
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const { rootRef, cardsRef } = useWorkGridReveal();

  return (
    <section 
      id="work"
      ref={rootRef as React.RefObject<HTMLElement>}
      className="work-section relative py-20 lg:py-32 bg-black text-white"
    >
      <div className="container max-w-[1400px] mx-auto px-[clamp(2rem,8vw,8rem)]">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-bold font-['Inter'] tracking-tight mb-6">
            {workContent.title}
          </h2>
          <p className="text-lg lg:text-xl text-white/60 max-w-3xl">
            {workContent.subtitle}
          </p>
        </div>

        {/* Grid */}
        <div 
          ref={cardsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,3vw,2rem)]"
        >
          {workContent.cards.map((card, index) => (
            <div 
              key={card.id}
              className="work-card-wrapper opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              <WorkCard card={card} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
