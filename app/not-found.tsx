import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container py-24 text-center">
      <h1 className="text-3xl md:text-5xl font-semibold">Página no encontrada</h1>
      <p className="mt-4 text-muted-foreground">La ruta que buscas no existe.</p>
      <div className="mt-8">
        <Link href="/" className="rounded-full border border-border px-5 py-2 hover:bg-white/5">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
