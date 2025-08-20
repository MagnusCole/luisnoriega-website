"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPortafolio = pathname?.startsWith("/portafolio");
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border data-[scroll=true]:backdrop-saturate-150 data-[scroll=true]:bg-background/80">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold tracking-tight text-lg rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Luis Noriega
        </Link>
        <nav className="flex items-center gap-6 text-sm" aria-label="Navegación principal">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Home
          </Link>
          <Link
            href="/portafolio"
            aria-current={isPortafolio ? "page" : undefined}
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Portafolio
          </Link>
          <a
            href="#sobre-mi"
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform hidden md:inline rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            About
          </a>
          <a
            href="#hablemos"
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Hablemos
          </a>
        </nav>
      </div>
    </header>
  );
}
