"use client";
import React from "react";

type BadgeProps = {
  variant?: "default" | "outline" | "success" | "warning" | "danger";
} & React.HTMLAttributes<HTMLSpanElement>;

export default function Badge({ variant = "default", className, ...rest }: BadgeProps) {
  const base = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";
  const map: Record<string, string> = {
    default: "bg-white/10 text-foreground",
    outline: "border border-border text-foreground",
    success: "bg-green-500/20 text-green-300",
    warning: "bg-amber-500/20 text-amber-300",
    danger: "bg-rose-500/20 text-rose-300",
  };
  return <span className={[base, map[variant], className].filter(Boolean).join(" ")} {...rest} />;
}
