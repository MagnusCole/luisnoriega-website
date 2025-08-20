"use client";
import dynamic from "next/dynamic";
import { PRM, isDesktop } from "@/lib/a11y/prm";

const SpinTetra = dynamic(() => import("@/components/three/SpinTetra"), { ssr: false, loading: () => null });
const FloatingIco = dynamic(() => import("@/components/three/FloatingIco"), { ssr: false, loading: () => null });

export default function SacredGeometry() {
  const reduce = PRM();
  const desktop = isDesktop();
  return (
    <section className="container py-20 md:py-28">
      <h2 className="h3 text-center">Geometría Sagrada</h2>
      <p className="mt-2 text-center text-muted-foreground">Estructura. Conciencia. Expansión. Eternidad.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-4">
        <Figure title="Tetraedro" caption="Estructura">
          {!reduce && desktop && <SpinTetra />}
        </Figure>
        <Figure title="Cubo" caption="Fundamento">
          <div className="h-[140px] w-[140px] rounded-xl border border-border/60 bg-[conic-gradient(from_45deg,transparent,rgba(255,255,255,0.08)_50%,transparent)]" />
        </Figure>
        <Figure title="Orbe" caption="Conciencia">
          <div className="h-[140px] w-[140px]">
            {!reduce && desktop ? <FloatingIco size={140} /> : <div className="h-full w-full rounded-full bg-gradient-radial from-white/20 to-transparent" />}
          </div>
        </Figure>
        <Figure title="Espiral" caption="Crecimiento Infinito">
          <div className="h-[140px] w-[140px] rounded-full border border-border/60 [mask-image:radial-gradient(closest-side,#000,transparent)] bg-[conic-gradient(at_50%_50%,rgba(255,255,255,0.12),transparent_20%,rgba(255,255,255,0.12)_40%,transparent_60%,rgba(255,255,255,0.12)_80%,transparent)]" />
        </Figure>
      </div>
    </section>
  );
}

function Figure({ title, caption, children }: { title: string; caption: string; children: React.ReactNode }) {
  return (
    <figure className="group flex flex-col items-center gap-3 rounded-2xl border border-border/60 p-6 text-center">
      <div className="relative">
        {children}
        <div className="pointer-events-none absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]" />
      </div>
      <figcaption>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-muted-foreground">{caption}</div>
      </figcaption>
    </figure>
  );
}
