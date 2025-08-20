"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const LeadSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  message: z.string().min(5).max(2000),
  source: z.string().optional(),
  website: z.string().optional(), // honeypot
});

type LeadData = z.infer<typeof LeadSchema>;

export default function LeadForm({ source = "site" }: { source?: string }) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverOk, setServerOk] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadData>({ resolver: zodResolver(LeadSchema), defaultValues: { source } });

  const onSubmit = async (data: LeadData) => {
    setServerError(null);
    setServerOk(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "server_error");
      }
      setServerOk(true);
      reset({ name: "", email: "", message: "", source });
      if (typeof window !== "undefined") {
        window.plausible?.("lead:submit:ok", { props: { source } });
      }
    } catch (e: unknown) {
      const isError = (x: unknown): x is Error => typeof x === "object" && x !== null && "message" in x;
      setServerError(isError(e) ? String((e as Error).message) : "server_error");
      if (typeof window !== "undefined") {
        window.plausible?.("lead:submit:error", { props: { source } });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 w-full max-w-lg">
      <div className="grid gap-3 sm:grid-cols-2">
        <Input label="Nombre" placeholder="Tu nombre" {...register("name")} error={errors.name?.message} />
        <Input label="Email" placeholder="tucorreo@dominio.com" type="email" {...register("email")} error={errors.email?.message} />
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted-foreground" htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          placeholder="Cuéntame sobre tu empresa o idea"
          className="w-full rounded-lg border border-border bg-transparent px-4 py-2 h-28 outline-none transition placeholder:text-muted-foreground/60 focus:border-accent"
          {...register("message")}
        />
        {errors.message?.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>
  <input type="hidden" value={source} {...register("source")} />
  {/* Honeypot field (hidden from users) */}
  <label className="sr-only" htmlFor="website">Sitio Web</label>
  <input id="website" className="hidden" tabIndex={-1} autoComplete="off" {...register("website")} />
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Enviando…" : "Enviar"}
        </Button>
        {serverOk && <span className="text-sm text-green-400">¡Gracias! Recibido correctamente.</span>}
        {serverError && <span className="text-sm text-red-400">Error: {serverError}</span>}
      </div>
    </form>
  );
}
