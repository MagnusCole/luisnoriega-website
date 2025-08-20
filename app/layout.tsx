import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  default: "Luis Noriega — Portafolio & M&A",
  template: "%s · Luis Noriega",
  },
  description:
  "Portfolio personal, adquisiciones y producto. Opero y construyo empresas en LATAM.",
  openGraph: {
    type: "website",
  url: "https://www.luisnoriega.com",
  title: "Luis Noriega — Portafolio & M&A",
  description: "Portfolio personal, adquisiciones y producto.",
  siteName: "www.luisnoriega.com",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
    alt: "Luis Noriega — Portafolio & M&A",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  title: "Luis Noriega — Portafolio & M&A",
  description: "Portfolio personal, adquisiciones y producto.",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
    alt: "Luis Noriega — Portafolio & M&A",
      },
    ],
  },
};

// Minimal layout shell

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
              name: "Luis Noriega",
              url: "https://www.luisnoriega.com",
              jobTitle: "Acquisition Entrepreneur",
      worksFor: undefined,
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
  <main id="contenido">{children}</main>
      </body>
    </html>
  );
}
