import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog · Luis Noriega",
  description: "Reflexiones y aprendizajes de Luis Noriega sobre emprendimiento y adquisiciones.",
};

export default function Blog() {
  return (
    <section className="container">
      <h1>Blog</h1>
      <p>Artículos y notas sobre emprendimiento, producto y adquisiciones.</p>
    </section>
  );
}
