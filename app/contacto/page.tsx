import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto · Luis Noriega",
  description: "Contacta a Luis Noriega — emprendedor y fundador de AQXION.",
};

export default function Contacto() {
  return (
    <section className="container">
      <h1>Contacto</h1>
      <p>
        ¿Interesado en colaborar o aprender más sobre AQXION? Escríbeme a través
        del formulario o redes.
      </p>
    </section>
  );
}
