import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proyectos · Luis Noriega",
  description: "Proyectos de Luis Noriega: trabajos, startups y adquisiciones.",
};

export default function Proyectos() {
  return (
    <section className="container">
      <h1>Proyectos</h1>
      <p>Listado de proyectos y casos de estudio liderados por Luis Noriega.</p>
    </section>
  );
}
