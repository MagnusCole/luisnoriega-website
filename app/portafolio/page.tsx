import ProjectCard from "@/components/portfolio/ProjectCard";
import AchievementItem from "@/components/portfolio/AchievementItem";
import { projects, achievements } from "@/lib/portfolio";

export const metadata = { title: "Portafolio" };

export default function Portafolio() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Portafolio</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Pequeños proyectos, experimentos y certificaciones que reflejan mi ejecución y aprendizaje continuo.
      </p>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">Proyectos</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold">Certificados & Logros</h2>
        <div className="mt-2">
          {achievements.map((a, i) => (
            <AchievementItem key={i} item={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
