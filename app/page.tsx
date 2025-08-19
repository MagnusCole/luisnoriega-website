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
      {/* Sobre mí breve */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="h2">Sobre mí</h2>
            <p className="body mt-6 text-muted-foreground max-w-2xl">
              Opero y construyo negocios en LATAM. Combino producto, ejecución operativa y M&A para crear valor sostenido en el tiempo.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="grid gap-4">
              <Card className="p-5">
                <p className="caption">Producto</p>
                <p className="mt-1 body text-muted-foreground">Construyo experiencias digitales enfocadas en negocio.</p>
              </Card>
              <Card className="p-5">
                <p className="caption">Operación</p>
                <p className="mt-1 body text-muted-foreground">Ejecución, procesos y gobierno para escalar.</p>
              </Card>
              <Card className="p-5">
                <p className="caption">Adquisición</p>
                <p className="mt-1 body text-muted-foreground">Parte de mi portafolio: AQXION y coinversiones.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
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
