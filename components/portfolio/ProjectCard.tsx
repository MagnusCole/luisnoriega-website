import Link from "next/link";
import type { Project } from "@/lib/portfolio";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-border p-6 hover:bg-white/5 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.excerpt}</p>
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
