"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(59,130,246,0.15),transparent_60%)]" />
      <div className="container py-24 md:py-32 relative">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-semibold tracking-tight"
        >
          Adquiriendo el futuro de LATAM
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          Compramos, construimos y escalamos PYMES con potencial. Si consideras
          vender o invertir, conectemos.
        </motion.p>
        <div className="mt-10 flex items-center gap-4">
          <a
            href="/vender"
            className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 font-medium text-white hover:opacity-90 transition"
          >
            Vender mi empresa
          </a>
          <a
            href="/aqxion"
            className="inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-medium hover:bg-white/5 transition"
          >
            Invertir con AQXION
          </a>
        </div>
      </div>
    </section>
  );
}
