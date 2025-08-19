import ProjectCard from "@/components/portfolio/ProjectCard";
import AchievementItem from "@/components/portfolio/AchievementItem";
import { projects, achievements } from "@/lib/portfolio";
import { Card } from "@/components/ui/Card";

export const metadata = { title: "Portafolio" };

export default function Portafolio() {
  return (
    <section className="container py-16">
      <h1 className="h2">Portafolio</h1>
      <p className="body mt-6 max-w-2xl text-muted-foreground">
        Pequeños proyectos, experimentos y certificaciones que reflejan mi ejecución y aprendizaje continuo.
      </p>

      {/* Destacado: empresas propias */}
      {projects.some((p) => p.owned) && (
        <div className="mt-10">
          <h2 className="h4">Empresas propias</h2>
          <div className="mt-4">
            {projects.filter((p) => p.owned).map((p) => (
              <Card key={p.slug} className="p-6">
                <ProjectCard project={p} />
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <h2 className="h4">Proyectos</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          {projects.filter((p) => !p.owned).map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="h4">Certificados & Logros</h2>
        <div className="mt-2">
          {achievements.map((a, i) => (
            <AchievementItem key={i} item={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
