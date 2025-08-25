import type { Metadata, Viewport } from "next";
import { Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/shared/layout";
import { AppLoaderGate } from "@/shared/loader";

const workSans = Work_Sans({ variable: "--font-sans", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

const siteUrl = "https://www.luisnoriega.com";
const ogImage = `${siteUrl}/og.png`; // usa un PNG/JPG real 1200x630
const avatar = `${siteUrl}/images/luis-hero.png`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
  default: "Luis Noriega – Emprendedor & CEO de AQXION (Lima, Perú)",
    template: "%s · Luis Noriega",
  },
  description:
    "Luis Noriega es emprendedor y fundador de AQXION. Descubre su visión, proyectos y aprendizajes en la adquisición de empresas.",
  // keywords casi no suma; déjalo si quieres, pero no es determinante
  alternates: {
    canonical: `${siteUrl}/`,
    languages: {
  "es-PE": `${siteUrl}/`,
  "es": `${siteUrl}/es`,
  "en": `${siteUrl}/en`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    title: "Luis Noriega – Emprendedor & CEO de AQXION",
    description:
      "Luis Noriega es emprendedor y fundador de AQXION. Descubre su visión, proyectos y aprendizajes en la adquisición de empresas.",
    siteName: "Luis Noriega",
    locale: "es_ES",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "Luis Noriega — Sitio oficial", type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Noriega – Emprendedor & CEO de AQXION",
    description:
      "Luis Noriega es emprendedor y fundador de AQXION. Descubre su visión, proyectos y aprendizajes en la adquisición de empresas.",
    images: [ogImage],
    creator: "@luisnoriega", // si lo usas
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  verification: {
    google: "", // pega el token real cuando lo tengas
  },
  category: "portfolio",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const sameAs = [
    "https://www.linkedin.com/in/noriega-luis/",
    "https://x.com/MagnusColeX", // antes @luisnoriega
    "https://www.instagram.com/magnuscls/", 
    "https://www.youtube.com/@LuisNor", // si aplica
  ];

  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Luis Noriega",
        inLanguage: "es-PE",
        publisher: { "@id": `${siteUrl}/#person` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ImageObject",
        "@id": `${ogImage}#primaryImage`,
        url: ogImage,
        width: 1200,
        height: 630,
        caption: "Luis Noriega — imagen social",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#org`,
        name: "AQXION",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/images/logo-aqxion.png`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: "Luis Noriega",
        url: siteUrl,
        image: avatar,
        jobTitle: "Emprendedor; CEO de AQXION",
        nationality: "Perú",
        address: { "@type": "PostalAddress", addressCountry: "PE", addressLocality: "Lima" },
        sameAs,
        worksFor: { "@id": `${siteUrl}/#org` },
        description:
          "Luis Noriega es emprendedor y fundador de AQXION. Descubre su visión, proyectos y aprendizajes en la adquisición de empresas.",
      },
    ],
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Plausible */}
        <link rel="preconnect" href="https://plausible.io" />
        <link rel="dns-prefetch" href="https://plausible.io" />
        <script defer data-domain="luisnoriega.com" src="https://plausible.io/js/script.js" />

        {/* Preload hero */}
        <link rel="preload" as="image" href={avatar} type="image/png" />

        {/* JSON-LD (entity graph) */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </head>
      <body className={`${workSans.variable} ${jetbrains.variable} antialiased text-foreground`} style={{ backgroundColor: "#000", color: "var(--foreground, #fff)" }}>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <AppLoaderGate mode="always" forceFast={false}>
          <SiteHeader />
          <main id="contenido" role="main">{children}</main>
          <SiteFooter />
        </AppLoaderGate>
      </body>
    </html>
  );
}
