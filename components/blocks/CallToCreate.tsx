"use client";
import GlossyOrb from "@/components/ui/GlossyOrb";

export default function CallToCreate() {
  return (
    <section className="relative border-t border-border py-24 md:py-32 text-center">
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,215,128,0.12),transparent_70%)]" aria-hidden />
      <div className="container relative">
        <div className="mx-auto max-w-md">
          <div className="mx-auto h-40 w-40">
            <GlossyOrb />
          </div>
          <h2 className="h3 mt-6">¿Quieres crear universos conmigo?</h2>
          <button
            className="mt-8 inline-flex items-center justify-center rounded-full border border-amber-300/60 px-6 py-3 font-medium text-amber-200 hover:bg-amber-200/10"
            onClick={() => window.plausible?.("cta:call:create")}
          >
            Conectar
          </button>
        </div>
      </div>
    </section>
  );
}
