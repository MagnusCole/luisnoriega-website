"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre"),
  email: z.string().email("Email inválido"),
  empresa: z.string().min(2, "Nombre de la empresa"),
  ingresos: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "vender", ...data }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("ok");
  } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input {...register("nombre")} className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40" />
        {errors.nombre && <p className="mt-1 text-sm text-red-400">{errors.nombre.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" {...register("email")} className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40" />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Empresa</label>
        <input {...register("empresa")} className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40" />
        {errors.empresa && <p className="mt-1 text-sm text-red-400">{errors.empresa.message}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Ingresos anuales (USD)</label>
        <input {...register("ingresos")} className="w-full rounded-md border border-border bg-transparent px-3 py-2 outline-none focus:ring-2 focus:ring-accent/40" />
      </div>
      <button disabled={status === "loading"} className="mt-2 inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 font-medium text-white hover:opacity-90 disabled:opacity-50">
        {status === "loading" ? "Enviando…" : "Enviar"}
      </button>
      {status === "ok" && <p className="text-sm text-green-400">Gracias. Te contactaremos pronto.</p>}
      {status === "error" && <p className="text-sm text-red-400">Hubo un error. Intenta nuevamente.</p>}
    </form>
  );
}
