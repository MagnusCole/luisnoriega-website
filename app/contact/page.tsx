export const dynamic = "force-static";

export default function ContactPage() {
  return (
    <section className="container py-16">
      <h1 className="h2">Contacto</h1>
      <p className="mt-4 text-muted-foreground max-w-2xl">
        Escríbeme a <a className="underline" href="mailto:hola@luisnoriega.com">hola@luisnoriega.com</a> o usa el formulario en la sección Hablemos.
      </p>
    </section>
  );
}
