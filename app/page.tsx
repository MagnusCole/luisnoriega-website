import Hero from "@/features/hero";
import Portfolio from "@/features/portfolio";

export default function Home() {
  return (
    <>
      <section className="bg-panel border-b border-border text-center py-6">
        <div className="container mx-auto px-6">
          <p className="mx-auto max-w-3xl">
            <strong>Soy Luis Noriega, emprendedor y fundador de AQXION.</strong> Vivo en Lima, Perú y mi misión es transformar
            negocios a través de adquisiciones y sistemas con inteligencia artificial. <a href="/quien-es-luis-noriega" className="underline">Más sobre mí →</a>
          </p>
        </div>
      </section>

      <section id="sobre-mi" className="container mx-auto px-6 py-12 prose lg:prose-lg text-foreground">
        <h2>¿Quién es Luis Noriega?</h2>
        <p>
          Luis Noriega es emprendedor y CEO de AQXION, con base en Lima, Perú. <a href="/quien-es-luis-noriega" className="underline font-medium">Lee mi perfil completo →</a>
        </p>
      </section>

      <Hero />
      <Portfolio />
    </>
  );
}
