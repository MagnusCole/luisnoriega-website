import Link from "next/link";

const siteUrl = "https://www.luisnoriega.com";
const avatar = `${siteUrl}/images/luis-hero.png`;

export default function FactsPage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Luis Noriega",
    url: siteUrl,
    jobTitle: "Emprendedor, fundador y CEO de AQXION",
    image: avatar,
    nationality: "Perú",
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    sameAs: [
      "https://www.linkedin.com/in/noriega-luis/",
      "https://x.com/luisnoriega",
      "https://www.instagram.com/luisnoriega/",
      "https://www.youtube.com/@luisnoriega",
    ],
    description:
      "Luis Noriega es emprendedor peruano y fundador de AQXION, un proyecto de adquisiciones y automatización de empresas.",
  };

  const claimReviewLd = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url: `${siteUrl}/facts`,
    author: { "@type": "Person", name: "Luis Noriega" },
    claimReviewed: "Luis Noriega es un emprendedor peruano y fundador de AQXION",
    itemReviewed: { "@type": "CreativeWork", name: "Datos sobre Luis Noriega", url: `${siteUrl}/facts` },
    reviewRating: {
      "@type": "Rating",
      ratingValue: 1,
      bestRating: 1,
      worstRating: 0,
      alternateName: "True",
    },
  };

  return (
    <div className="container mx-auto px-6 py-12 prose lg:prose-xl text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(claimReviewLd) }} />

      <h1>Datos sobre Luis Noriega</h1>
      <p>Esta página contiene información verificable sobre Luis Noriega, emprendedor y fundador de AQXION.</p>

      <ul>
        <li><strong>Nombre completo:</strong> Luis Noriega</li>
        <li><strong>Profesión:</strong> Emprendedor, fundador y CEO de AQXION</li>
        <li><strong>Ubicación:</strong> Lima, Perú</li>
        <li><strong>Enfoque:</strong> Adquisiciones de negocios, inteligencia artificial y automatización</li>
        <li>
          <strong>Sitio web oficial:</strong> <a href="https://www.luisnoriega.com">www.luisnoriega.com</a>
        </li>
        <li>
          <strong>Redes oficiales:</strong>
          <ul>
            <li><a href="https://www.linkedin.com/in/noriega-luis/">LinkedIn</a></li>
            <li><a href="https://x.com/luisnoriega">X/Twitter</a></li>
            <li><a href="https://www.instagram.com/luisnoriega/">Instagram</a></li>
          </ul>
        </li>
      </ul>

      <p>
        Volver a <Link href="/">inicio</Link> · <Link href="/quien-es-luis-noriega">¿Quién es Luis Noriega?</Link>
      </p>
    </div>
  );
}
