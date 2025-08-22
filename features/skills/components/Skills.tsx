"use client";
import certificationsData from "../content/certifications.json";
import { WireframePlaceholder } from "@/shared/ui";
import type { CertificationsContent, SkillLevel } from "@/lib/types";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

type Aggregated = { name: string; count: number; level: SkillLevel };

// Normalize skill names (simple case-insensitive trim)
const normalize = (s: string) => s.trim().toLowerCase();

function aggregateFromCerts(data: CertificationsContent): Aggregated[] {
  const map = new Map<string, number>();
  for (const cert of data.certifications) {
    for (const raw of cert.skills || []) {
      const key = normalize(raw);
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }
  // Under‑promise levels: counts >=4 → intermediate, 1–3 → basic
  const agg: Aggregated[] = Array.from(map.entries())
    .map(([key, count]) => {
      const level: SkillLevel = count >= 4 ? "intermediate" : "basic";
      return { name: key.replace(/\b\w/g, c => c.toUpperCase()), count, level };
    })
    .sort((a, b) => b.count - a.count);
  // Keep a modest top slice
  return agg.slice(0, 10);
}

function currentWebStack(): Aggregated[] {
  // Conservative levels for the tech used in this site
  return [
    { name: "Next.js", level: "intermediate", count: 1 },
    { name: "React", level: "intermediate", count: 1 },
    { name: "TypeScript", level: "basic", count: 1 },
    { name: "TailwindCSS", level: "intermediate", count: 1 },
    { name: "GSAP", level: "intermediate", count: 1 },
  ];
}

function LevelBadge({ level }: { level: SkillLevel }) {
  const color = level === "advanced" ? "bg-emerald-500" : level === "intermediate" ? "bg-yellow-500" : "bg-slate-400";
  const label = level === "advanced" ? "Avanzado" : level === "intermediate" ? "Intermedio" : "Básico";
  return (
    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} aria-hidden />
      {label}
    </span>
  );
}

export default function Skills() {
  const content = certificationsData as unknown as CertificationsContent;
  const certSkills = aggregateFromCerts(content);
  const webSkills = currentWebStack();

  // Refs for GSAP reveals
  const rootRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const listsRef = useRef<HTMLDivElement | null>(null);
  const certsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (PRM()) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power2.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 85%", end: "top 45%", scrub: 0.6 }
          }
        );
      }
      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { y: 16, autoAlpha: 0, filter: "blur(2px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 80%", end: "+=20%", scrub: 0.6 }
          }
        );
      }
      if (listsRef.current) {
        gsap.from(listsRef.current.children, {
          y: 18, autoAlpha: 0, stagger: 0.08, ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%", end: "+=30%", scrub: 0.6 }
        });
      }
      if (certsRef.current) {
        const children = certsRef.current.children;
        gsap.from(children, {
          y: 20, autoAlpha: 0, stagger: 0.05, ease: "power2.out",
          scrollTrigger: { trigger: certsRef.current, start: "top 85%", end: "+=40%", scrub: 0.6 }
        });
      }
    }, rootRef);
    return () => ctx.revert();
  }, { scope: rootRef });

  return (
    <section id="skills" ref={rootRef as React.RefObject<HTMLElement>} className="section container py-24 md:py-32">
      <h2 ref={titleRef} className="font-light tracking-tight leading-[0.9] [text-wrap:balance]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
        Habilidades
      </h2>
      <p ref={descRef} className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
        Aprendizaje continuo, sin límites. A continuación un mapa actual y el stack usado en este sitio.
      </p>

      <div ref={listsRef} className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Mapa actual (derivado de certificados)</h3>
          <ul className="space-y-2">
            {certSkills.map((s) => (
              <li key={s.name} className="flex items-center justify-between rounded-lg border border-border px-4 py-2 bg-background/40">
                <span className="text-sm">{s.name}</span>
                <LevelBadge level={s.level} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">Web actual (este sitio)</h3>
          <ul className="space-y-2">
            {webSkills.map((s) => (
              <li key={s.name} className="flex items-center justify-between rounded-lg border border-border px-4 py-2 bg-background/40">
                <span className="text-sm">{s.name}</span>
                <LevelBadge level={s.level} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">Niveles orientativos; la ambición es &quot;∞&quot;.</p>

      {/* Full certifications below skills */}
      <div className="mt-16">
        <h3 className="font-light tracking-tight leading-[0.9] [text-wrap:balance]" style={{ fontSize: 'clamp(2.25rem, 6vw, 6rem)' }}>
          Certificados
        </h3>
        <div ref={certsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.certifications.map((cert) => (
            <article key={cert.id} className="rounded-xl border border-border bg-background/40 overflow-hidden">
              <div className="relative h-28 w-full">
                <WireframePlaceholder 
                  label={cert.title}
                  className="h-full rounded-t-xl"
                  variant="cert"
                />
              </div>
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-semibold leading-snug">{cert.title}</h4>
                <p className="text-xs text-muted-foreground">
                  {cert.issuer}{cert.platform ? ` • ${cert.platform}` : ""}
                </p>
                <p className="text-xs text-muted-foreground">{new Date(cert.date).toLocaleDateString()}</p>
                {cert.verify_url && (
                  <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="inline-flex text-xs underline underline-offset-4">
                    Verificar
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
