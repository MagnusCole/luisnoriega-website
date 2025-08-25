import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre mí · Luis Noriega",
  description:
    "Sobre Luis Noriega: emprendedor y fundador de AQXION. Conoce su trayectoria y enfoque en adquisiciones.",
};

export default function SobreMi() {
  return (
    <section className="container">
      <h1>Sobre mí</h1>
      <p>
        Luis Noriega es emprendedor y CEO de AQXION. Aquí encontrarás su
        trayectoria, valores y proyecto.
      </p>
    </section>
  );
}
