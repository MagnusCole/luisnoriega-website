"use client";
import skillsData from "../content/skills.json";
import { WireframePlaceholder } from "@/shared/ui";
import { useSkillsReveal } from "../motion/skillsReveal";

interface Skill {
  name: string;
  category: string;
}

interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform?: string;
  date: string;
  grade?: string;
  credential_id: string;
  skills: string[];
  image: string;
  verify_url?: string;
  status: string;
}

interface SkillsContent {
  title: string;
  subtitle: string;
  note: string;
  skills: {
    technical: Skill[];
  };
  certifications: Certification[];
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <div className="skill-card bg-white/5 rounded-lg border border-white/10 p-4 backdrop-blur-sm">
      <div className="space-y-2">
        <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
        <p className="text-sm text-white/60">{skill.category}</p>
      </div>
    </div>
  );
}

function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <article className="cert-card bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
      <div className="relative h-32 w-full">
        <WireframePlaceholder 
          label={cert.title}
          className="h-full rounded-t-xl bg-gray-900/20"
          variant="cert"
          style={{
            backgroundColor: "#0a0a0a",
            border: "1px solid #333"
          }}
        />
      </div>
      <div className="p-4 space-y-3">
        <h4 className="text-sm font-semibold leading-snug text-white">{cert.title}</h4>
        <p className="text-xs text-white/60">
          {cert.issuer}{cert.platform ? ` • ${cert.platform}` : ""}
        </p>
        <p className="text-xs text-white/40">
          {new Date(cert.date).toLocaleDateString()}
          {cert.grade && ` • ${cert.grade}`}
        </p>
        {cert.verify_url && (
          <a 
            href={cert.verify_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex text-xs text-white/60 hover:text-white underline underline-offset-4 transition-colors duration-200"
          >
            Verificar →
          </a>
        )}
      </div>
    </article>
  );
}

export default function Skills() {
  const content = skillsData as SkillsContent;
  const { rootRef, titleRef, subtitleRef, skillsRef, certsRef, noteRef } = useSkillsReveal();

  return (
    <section 
      id="skills"
      ref={rootRef}
      className="skills-section relative py-20 lg:py-32 bg-black text-white"
    >
      <div className="container max-w-[1400px] mx-auto px-[clamp(2rem,8vw,8rem)]">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-6xl font-bold font-['Inter'] tracking-tight mb-6"
          >
            {content.title}
          </h2>
          <p 
            ref={subtitleRef}
            className="text-lg lg:text-xl text-white/60 max-w-3xl"
          >
            {content.subtitle}
          </p>
        </div>

        {/* Technical Skills */}
        <div className="mb-20 lg:mb-32">
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-8">
            Skills Técnicas
          </h3>
          <div 
            ref={skillsRef}
            className="skills-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {content.skills.technical.map((skill) => (
              <div 
                key={skill.name}
                className="skill-wrapper opacity-0"
                style={{ willChange: "transform, opacity" }}
              >
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <h3 className="text-2xl lg:text-3xl font-semibold text-white mb-8">
            Certificaciones
          </h3>
          <div 
            ref={certsRef}
            className="certifications-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {content.certifications.map((cert) => (
              <div 
                key={cert.id}
                className="cert-wrapper opacity-0"
                style={{ willChange: "transform, opacity" }}
              >
                <CertificationCard cert={cert} />
              </div>
            ))}
          </div>
        </div>

        {/* Critical Note */}
        <div 
          ref={noteRef}
          className="critical-note text-center py-8 border-t border-white/10 opacity-0"
        >
          <p className="text-sm lg:text-base text-white/60 italic max-w-4xl mx-auto">
            {content.note}
          </p>
        </div>

      </div>
    </section>
  );
}
