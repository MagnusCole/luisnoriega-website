import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollScenes from "@/components/ScrollScenes";

export default function Home() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <section className="container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <ScrollReveal className="rounded-xl border border-border p-6">
            <p className="text-sm text-muted-foreground">Buy</p>
            <h3 className="mt-2 text-xl font-semibold">Adquirimos PYMES sólidas</h3>
          </ScrollReveal>
          <ScrollReveal className="rounded-xl border border-border p-6">
            <p className="text-sm text-muted-foreground">Build</p>
            <h3 className="mt-2 text-xl font-semibold">Operamos y profesionalizamos</h3>
          </ScrollReveal>
          <ScrollReveal className="rounded-xl border border-border p-6">
            <p className="text-sm text-muted-foreground">Scale</p>
            <h3 className="mt-2 text-xl font-semibold">Escalamos con tecnología</h3>
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
