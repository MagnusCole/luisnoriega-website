"use client";
import data from "../content/portfolio.json";

// Minimal portfolio: simple list, semantic, no GSAP.
export default function Portfolio() {
  return (
  <section id="portfolio" className="py-28 lg:py-40 text-white bg-black">
      <div className="container max-w-[1200px] mx-auto px-[clamp(2rem,8vw,8rem)]">
  <header className="mb-20">
          <h2 className="font-['Inter'] font-extrabold tracking-tight text-[clamp(3.25rem,7vw,6rem)] leading-[0.9]">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="mt-5 text-white/40 max-w-2xl text-xl leading-relaxed">
              {data.subtitle}
            </p>
          )}
        </header>
  <ul className="flex flex-col gap-24">
          {data.companies.map((c, i) => (
            <li key={c.id} className="relative pb-12 border-b border-white/5 last:border-none last:pb-0">
              <div className="space-y-5">
                <div className="flex items-baseline gap-6">
                  <span className="text-white/15 text-sm font-mono tracking-widest select-none">{String(i+1).padStart(2,'0')}</span>
                  <h3 className="font-['Inter'] font-semibold tracking-tight text-[clamp(1.75rem,4vw,3rem)] leading-none">
                    {c.website ? (
                      <a
                        href={c.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-sm transition"
                        aria-label={`Abrir ${c.name}`}
                      >
                        {c.name}
                      </a>
                    ) : c.name}
                  </h3>
                </div>
                <p className="text-white/55 text-base sm:text-lg max-w-3xl leading-relaxed">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-x-8 gap-y-2 text-[0.65rem] sm:text-xs text-white/35 font-mono tracking-wide uppercase">
                  <span>{c.type}</span>
                  <span>{c.founded}</span>
                  <span className="italic normal-case">{c.role}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
