"use client";
import portfolioContent from "../content/portfolio.json";
import { usePortfolioReveal } from "../motion/portfolioReveal";
// Atmosphere removed – background unified to pure black.

interface CompanyCardProps {
  company: typeof portfolioContent.companies[0];
  index: number;
}

function CompanyCard({ company, index }: CompanyCardProps) {
  return (
    <article 
      className="company-card group cursor-pointer"
      data-company-index={index}
    >
      <div className="company-card-inner bg-white/5 rounded-2xl p-8 lg:p-12 border border-white/10 backdrop-blur-sm">
        
        {/* Header with Logo and Status */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center space-x-4">
            {/* Logo - Minimal placeholder */}
            <div className="company-logo">
              <div className="w-16 h-16 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-white/60 text-xs font-mono">
                  {company.name.substring(0, 2)}
                </span>
              </div>
            </div>
            
            {/* Company Info */}
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                {company.name}
              </h3>
              <p className="text-sm text-white/60 font-medium">
                {company.type} • {company.founded}
              </p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="status-badge">
            <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-300 rounded-full">
              {company.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-white/80 leading-relaxed mb-8">
          {company.description}
        </p>

        {/* Highlights */}
        <div className="highlights mb-8">
          <div className="grid grid-cols-2 gap-3">
            {company.highlights.map((highlight, idx) => (
              <div 
                key={idx}
                className="highlight-item text-sm text-white/60 font-medium"
              >
                • {highlight}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action - More Prominent */}
        <div className="cta-section">
          {company.website && (
            <a 
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 group"
            >
              <span>Visitar sitio</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>

        {/* Role Footer */}
        <div className="footer mt-6 pt-6 border-t border-white/10">
          <div className="role text-sm text-white/40 italic">
            {company.role}
          </div>
        </div>

      </div>
    </article>
  );
}

export default function Portfolio() {
  const { rootRef, companiesRef } = usePortfolioReveal();

  return (
    <section 
      id="portfolio"
      ref={rootRef}
      className="portfolio-section relative py-20 lg:py-32 text-white overflow-hidden bg-black"
    >
      <div className="container relative z-10 max-w-[1400px] mx-auto px-[clamp(2rem,8vw,8rem)]">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 className="text-4xl lg:text-6xl font-bold font-['Inter'] tracking-tight mb-6">
            {portfolioContent.title}
          </h2>
          <p className="text-lg lg:text-xl text-white/60 max-w-3xl">
            {portfolioContent.subtitle}
          </p>
        </div>

        {/* Companies Grid */}
        <div 
          ref={companiesRef}
          className="companies-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        >
          {portfolioContent.companies.map((company, index) => (
            <div 
              key={company.id}
              className="company-card-wrapper opacity-0"
              style={{ willChange: "transform, opacity" }}
            >
              <CompanyCard company={company} index={index} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
