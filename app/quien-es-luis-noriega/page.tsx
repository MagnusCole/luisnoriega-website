import Image from "next/image";
import Link from "next/link";

const siteUrl = "https://www.luisnoriega.com";
const avatar = `${siteUrl}/images/luis-hero.png`;

export default function QuienEsLuisNoriega() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Luis Noriega",
    url: siteUrl,
    image: avatar,
    jobTitle: "Emprendedor; CEO de AQXION",
    nationality: "Perú",
    address: { "@type": "PostalAddress", addressCountry: "PE", addressLocality: "Lima" },
    sameAs: [
      "https://www.linkedin.com/in/noriega-luis/",
      "https://x.com/MagnusColeX",
      "https://www.instagram.com/magnuscls/",
      "https://www.youtube.com/@LuisNor",
    ],
    worksFor: { "@type": "Organization", name: "AQXION", url: siteUrl },
    description:
      "Luis Noriega es emprendedor peruano y fundador de AQXION, una empresa de adquisiciones y tecnología con sede en Lima.",
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Quién es Luis Noriega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Luis Noriega es un emprendedor peruano y fundador de AQXION, un proyecto de adquisiciones y automatización de empresas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Dónde nació y dónde vive Luis Noriega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Luis Noriega nació en Perú y actualmente vive en Lima.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es AQXION y cuál es su relación con Luis Noriega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AQXION es una empresa creada por Luis Noriega que combina adquisiciones de negocios con inteligencia artificial.",
        },
      },
      {
        "@type": "Question",
        name: "¿A qué se dedica Luis Noriega actualmente?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Actualmente, Luis Noriega se dedica a escalar empresas a través de adquisiciones estratégicas y sistemas digitales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo contactar a Luis Noriega?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Puedes contactar a Luis Noriega en su web oficial https://www.luisnoriega.com.",
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-6 py-12 prose lg:prose-xl text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <h1>¿Quién es Luis Noriega?</h1>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="w-full lg:w-1/3">
          <Image src="/images/luis-hero.png" alt="Luis Noriega" width={800} height={800} className="rounded-md" priority />
        </div>

        <div className="w-full lg:w-2/3">
          <p>
            Luis Noriega es emprendedor peruano y fundador de AQXION, una empresa de adquisiciones y tecnología con sede en Lima.
          </p>

          <h2>Bio breve</h2>
          <p>
            Con más de una década trabajando en tecnología y adquisición de negocios, Luis se especializa en identificar oportunidades de
            mejora operativa y escalar empresas mediante la integración de sistemas y herramientas de inteligencia artificial.
          </p>

          <h3>Logros</h3>
          <ul>
            <li>Fundador y CEO de AQXION.</li>
            <li>Ha liderado múltiples adquisiciones y procesos de escalado operativo.</li>
            <li>Experiencia en producto, tecnología e integraciones de IA para negocios.</li>
          </ul>

          <h3>Enlaces oficiales</h3>
          <ul>
            <li>
              <a href="https://www.linkedin.com/in/noriega-luis/" target="_blank" rel="noreferrer">LinkedIn</a>
            </li>
            <li>
              <a href="https://x.com/MagnusColeX" target="_blank" rel="noreferrer">X / Twitter</a>
            </li>
            <li>
              <a href="/contacto">Contacto (sitio)</a>
            </li>
            <li>
              <Link href="/">Volver al inicio</Link>
            </li>
          </ul>

          <h3>Contacto y prensa</h3>
          <p>
            Para consultas de prensa o partnership, visita <Link href="/contacto">/contacto</Link> o envía un email a <a href="mailto:contact@luisnoriega.com">contact@luisnoriega.com</a>.
          </p>
          
          <h2>Preguntas Frecuentes sobre Luis Noriega</h2>
          <div className="prose">
            <details>
              <summary>¿Quién es Luis Noriega?</summary>
              <p>Luis Noriega es un emprendedor peruano y fundador de AQXION, un proyecto de adquisiciones y automatización de empresas.</p>
            </details>
            <details>
              <summary>¿Dónde nació y dónde vive Luis Noriega?</summary>
              <p>Luis Noriega nació en Perú y actualmente vive en Lima.</p>
            </details>
            <details>
              <summary>¿Qué es AQXION y cuál es su relación con Luis Noriega?</summary>
              <p>AQXION es una empresa creada por Luis Noriega que combina adquisiciones de negocios con inteligencia artificial.</p>
            </details>
            <details>
              <summary>¿A qué se dedica Luis Noriega actualmente?</summary>
              <p>Actualmente, Luis Noriega se dedica a escalar empresas a través de adquisiciones estratégicas y sistemas digitales.</p>
            </details>
            <details>
              <summary>¿Cómo contactar a Luis Noriega?</summary>
              <p>Puedes contactar a Luis Noriega en su web oficial https://www.luisnoriega.com o en <a href="/contacto">/contacto</a>.</p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
