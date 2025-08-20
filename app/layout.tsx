import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.luisnoriega.com"),
  title: {
    default: "Luis Noriega — Portafolio Personal",
    template: "%s · Luis Noriega",
  },
  description:
    "Portfolio personal de Luis Noriega. Diseño, producto y visión cósmica.",
  openGraph: {
    type: "website",
    url: "https://www.luisnoriega.com",
    title: "Luis Noriega — Portafolio Personal",
    description: "Portfolio personal de Luis Noriega.",
    siteName: "Luis Noriega",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "Luis Noriega",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Noriega — Portafolio Personal",
    description: "Portfolio personal de Luis Noriega.",
    images: ["/og"],
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Plausible Analytics */}
        <script
          defer
          data-domain="luisnoriega.com"
          src="https://plausible.io/js/script.js"
        />

        {/* JSON-LD: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://www.luisnoriega.com/#person",
              name: "Luis Noriega",
              url: "https://www.luisnoriega.com",
              jobTitle: "Product Designer",
              image: "https://www.luisnoriega.com/og",
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip to content, visible on focus */}
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>

        <SiteHeader />
        <main id="contenido" role="main">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
