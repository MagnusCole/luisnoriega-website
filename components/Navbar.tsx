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
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Luis Noriega
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            aria-current={isHome ? "page" : undefined}
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform"
          >
            Home
          </Link>
          <Link
            href="/portafolio"
            aria-current={isPortafolio ? "page" : undefined}
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform"
          >
            Portafolio
          </Link>
          <a
            href="#sobre-mi"
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform hidden md:inline"
          >
            About
          </a>
          <a
            href="#hablemos"
            className="vf-hover vf-weight hover:opacity-80 transition will-change-transform"
          >
            Hablemos
          </a>
        </nav>
      </div>
    </header>
  );
}
