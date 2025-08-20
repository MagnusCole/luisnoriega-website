import Hero from "@/components/Hero";
import DealflowOrbitClient from "@/components/DealflowOrbitClient";
import MetricsStrip from "@/components/MetricsStrip";
import { Card } from "@/components/ui/Card";
import BuyBuildScale from "@/components/BuyBuildScale";
import GsapRevealClient from "@/components/GsapRevealClient";
import ScrollScenes from "@/components/ScrollScenesClient";
import Why from "@/components/Why";

export default function Home() {
  return (
    <>
  <GsapRevealClient />
      <Hero />
      <MetricsStrip />
      {/* Firma de interacción: Dealflow Orbit (desktop/no touch/PRM off) */}
      <section className="container py-10 md:py-16">
        <div className="hidden items-center justify-between md:flex">
          <div>
            <h2 className="h3">Dealflow Orbit</h2>
            <p className="mt-2 text-muted-foreground max-w-md">Etapas de adquisición orbitando un centro: origen → análisis → due diligence → cierre.</p>
          </div>
          <div className="opacity-80" aria-hidden>
            <DealflowOrbitClient />
          </div>
        </div>
      </section>
  <Why />
      {/* Sobre mí breve */}
      <section className="container py-16">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="h2 reveal">Sobre mí</h2>
            <p className="body mt-6 text-muted-foreground max-w-2xl">
              Opero y construyo negocios en LATAM. Combino producto, ejecución operativa y M&A para crear valor sostenido en el tiempo.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="grid gap-4">
              <Card className="p-5 reveal">
                <p className="caption">Producto</p>
                <p className="mt-1 body text-muted-foreground">Construyo experiencias digitales enfocadas en negocio.</p>
              </Card>
              <Card className="p-5 reveal">
                <p className="caption">Operación</p>
                <p className="mt-1 body text-muted-foreground">Ejecución, procesos y gobierno para escalar.</p>
              </Card>
              <Card className="p-5 reveal">
                <p className="caption">Adquisición</p>
                <p className="mt-1 body text-muted-foreground">Parte de mi portafolio: AQXION y coinversiones.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
  <BuyBuildScale />

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
        {/* Timeline */}
        <section className="container py-16">
          <h2 className="h4">Timeline</h2>
          <ol className="mt-6 space-y-4 border-l border-border pl-6">
            <li>
              <span className="caption">2025</span>
              <p className="body text-muted-foreground">AQXION — estructura de holding y primeras adquisiciones.</p>
            </li>
            <li>
              <span className="caption">2024</span>
              <p className="body text-muted-foreground">QLA — pipeline de deals y playbooks operativos.</p>
            </li>
            <li>
              <span className="caption">Antes</span>
              <p className="body text-muted-foreground">Producto y operación en múltiples industrias.</p>
            </li>
          </ol>
        </section>
    </>
  );
}
