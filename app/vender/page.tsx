import LeadForm from "./submit-form";

export const metadata = { title: "Vender tu empresa" };

export default function Vender() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Vender tu empresa</h1>
      <p className="mt-6 max-w-2xl text-muted-foreground">
        Inicia una evaluación confidencial. Respondemos en 48 horas.
      </p>
      <div className="mt-10 max-w-xl">
        <LeadForm />
      </div>
    </section>
  );
}
