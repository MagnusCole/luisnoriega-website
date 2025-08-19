import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://luisnoriega.com"),
  title: {
    default: "Luis Noriega — Acquisition Entrepreneur LATAM",
    template: "%s · Luis Noriega",
  },
  description:
    "Autoridad en M&A en LATAM. Compramos, construimos y escalamos PYMES. Conecta si consideras vender o invertir.",
  openGraph: {
    type: "website",
    url: "https://luisnoriega.com",
    title: "Luis Noriega — Acquisition Entrepreneur LATAM",
    description:
      "Autoridad en M&A en LATAM. Compramos, construimos y escalamos PYMES.",
    siteName: "luisnoriega.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Noriega — Acquisition Entrepreneur LATAM",
    description:
      "Autoridad en M&A en LATAM. Compramos, construimos y escalamos PYMES.",
  },
};

function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
  <Link href="/" className="font-semibold tracking-tight text-lg">Luis Noriega</Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/about" className="hover:opacity-80">About</Link>
          <Link href="/ma-lab" className="hover:opacity-80">M&A</Link>
          <Link href="/portafolio" className="hover:opacity-80">Portafolio</Link>
          <Link href="/aqxion" className="hover:opacity-80">AQXION</Link>
          <Link href="/vender" className="hover:opacity-80">Vender tu empresa</Link>
          <Link href="/contacto" className="hover:opacity-80">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Luis Noriega. Todos los derechos reservados.</p>
        <div className="flex items-center gap-4">
          <a className="hover:opacity-80" href="/privacy">Privacidad</a>
          <a className="hover:opacity-80" href="/terms">Términos</a>
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
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}> 
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
