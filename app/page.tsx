import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import ScrollReveal from "@/components/ScrollReveal";

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
    </>
  );
}
