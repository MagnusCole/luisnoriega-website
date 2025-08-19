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

      {/* Sticky stories */}
      <div className="mt-12 space-y-16">
        <section id="caso-aqxion" className="border-t border-border pt-10">
          <h2 className="h4">AQXION — Holding de adquisición</h2>
          <p className="caption mt-2 text-muted-foreground">Problema → Tesis → Sistema → Resultado</p>
          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="body text-muted-foreground max-w-2xl">
                Adquirimos PYMES rentables con continuidad de dueños. Estándares operativos, gobierno y crecimiento orgánico.
              </p>
            </div>
            <div className="md:col-span-5">
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <p className="caption">Holdings</p>
                  <p className="h5">1</p>
                </li>
                <li>
                  <p className="caption">Empresas</p>
                  <p className="h5">2</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="caso-b2b" className="border-t border-border pt-10">
          <h2 className="h4">Lead‑Gen B2B — Automatización</h2>
          <p className="caption mt-2 text-muted-foreground">Problema → Sistema → Resultado</p>
          <div className="mt-6 grid gap-6 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="body text-muted-foreground max-w-2xl">
                Pipelines multicanal con scraping ético, enriquecimiento y scoring para SDRs. Incremento sostenido de SQL y reducción de CAC.
              </p>
            </div>
            <div className="md:col-span-5">
              <ul className="grid grid-cols-2 gap-4">
                <li>
                  <p className="caption">SQL</p>
                  <p className="h5">+35%</p>
                </li>
                <li>
                  <p className="caption">CAC</p>
                  <p className="h5">−18%</p>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

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
