"use client";
import Link from "next/link";
import type { Project } from "@/lib/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  let raf = 0;
  return (
    <div
      className="rounded-xl border border-border p-6 transition will-change-transform transform-gpu"
      onMouseMove={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 2 - 1;
        const y = ((e.clientY - r.top) / r.height) * 2 - 1;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(700px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
        });
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "none";
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.excerpt}</p>
          {project.owned && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-foreground">
              Dueños
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{project.year}</span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs rounded-full border border-border px-2 py-0.5 text-muted-foreground">
            {t}
          </span>
        ))}
      </div>
      {project.link && (
        <div className="mt-4">
          <Link href={project.link} className="text-sm text-accent hover:underline">
            Ver proyecto →
          </Link>
        </div>
      )}
    </div>
  );
}
