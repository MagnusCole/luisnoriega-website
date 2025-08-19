import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import ScrollReveal from "@/components/ScrollReveal";
import { Card } from "@/components/ui/Card";
import ScrollScenes from "@/components/ScrollScenes";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal>
            <Card className="p-6">
              <p className="caption">Buy</p>
              <h3 className="h4 mt-2">Adquirimos PYMES sólidas</h3>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="p-6">
              <p className="caption">Build</p>
              <h3 className="h4 mt-2">Operamos y profesionalizamos</h3>
            </Card>
          </ScrollReveal>
          <ScrollReveal>
            <Card className="p-6">
              <p className="caption">Scale</p>
              <h3 className="h4 mt-2">Escalamos con tecnología</h3>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      <ScrollScenes
        scenes={[
          {
            id: "thesis",
            title: "Compramos. Construimos. Escalamos.",
            subtitle:
              "Invertimos en PYMES rentables y las llevamos al siguiente nivel con procesos, tecnología y capital.",
          },
          {
            id: "edge",
            title: "Ejecución obsesiva.",
            subtitle:
              "Gobernanza, excelencia operativa y una cultura de mejora continua. Resultados compuestos en el tiempo.",
          },
          {
            id: "invitation",
            title: "¿Listo para hablar?",
            subtitle:
              "Si eres dueño y consideras vender o buscas coinvertir en LATAM, conectemos.",
          },
        ]}
      />
    </>
  );
}
