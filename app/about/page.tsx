export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <section className="container py-16">
      <h1 className="h2">Sobre mí</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Opero y construyo empresas en LATAM. Esta página reúne contexto personal, principios y experiencia.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <article className="prose prose-invert max-w-none">
          <h2>Principios</h2>
          <ul>
            <li>Ejecución obsesiva.</li>
            <li>Gobernanza y procesos claros.</li>
            <li>Producto al servicio del negocio.</li>
          </ul>
        </article>
        <article className="prose prose-invert max-w-none">
          <h2>Experiencia</h2>
          <p>Producto, operación y M&A en distintas industrias.</p>
        </article>
      </div>
    </section>
  );
}
