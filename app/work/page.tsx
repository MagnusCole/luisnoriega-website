export const dynamic = "force-static";

export default function WorkPage() {
  return (
    <section className="container py-16">
      <h1 className="h2">Trabajo</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Casos seleccionados y metodología de ejecución. Para más detalle, visita el Portafolio.
      </p>
      <ul className="mt-8 space-y-4">
        <li className="border-b border-border pb-4">AQXION — Holding de adquisición</li>
        <li className="border-b border-border pb-4">Lead‑Gen B2B — Automatización</li>
      </ul>
    </section>
  );
}
