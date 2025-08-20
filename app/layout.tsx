import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import RouteTransition from "@/components/motion/RouteTransition";
import SmoothScroll from "@/components/motion/SmoothScroll";
import CursorDot from "@/components/CursorDot";
import BrandLoader from "@/components/BrandLoader";
import WorkBanner from "@/components/WorkBanner";
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

// Navbar moved to components/Navbar with aria-current detection

function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Luis Noriega. Todos los derechos
          reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link className="hover:opacity-80" href="/">
            Home
          </Link>
          <Link className="hover:opacity-80" href="/portafolio">
            Portafolio
          </Link>
        </div>
      </div>
    </footer>
  );
}

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
        {/* JSON-LD: Person & Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Luis Noriega",
              url: "https://www.luisnoriega.com",
              jobTitle: "Acquisition Entrepreneur",
              worksFor: {
                "@type": "Organization",
                name: "ADQUISICIÓN",
              },
              owns: [
                { "@type": "Organization", name: "ADQUISICIÓN", url: "https://www.luisnoriega.com" },
                { "@type": "Organization", name: "AQXION", url: "https://www.luisnoriega.com/portafolio" }
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
  <BrandLoader />
  <CursorDot />
  {process.env.NODE_ENV !== "production" && <WorkBanner />}
  <Navbar />
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              const header = document.querySelector('header');
              if (!header) return;
              const onScroll = () => {
                header.setAttribute('data-scroll', window.scrollY > 6 ? 'true' : 'false');
              };
              onScroll();
              window.addEventListener('scroll', onScroll, { passive: true });
            })();`
          }}
        />
        <SmoothScroll>
          <main id="contenido">
            <RouteTransition>{children}</RouteTransition>
          </main>
        </SmoothScroll>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
