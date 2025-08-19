export const metadata = { title: "Contacto" };

export default function Contacto() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Contacto</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Escríbenos para alianzas, inversión o prensa. Para evaluar una venta, usa la sección &quot;Vender tu empresa&quot;.
      </p>
      <div className="mt-8 text-sm text-muted-foreground">
        <p>Email: hola@luisnoriega.com</p>
      </div>
    </section>
  );
}
