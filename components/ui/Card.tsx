"use client";
import React from "react";

type CardRootProps = React.HTMLAttributes<HTMLDivElement>;
export function Card({ className, ...rest }: CardRootProps) {
  return <div className={["rounded-2xl border border-border bg-white/2.5 backdrop-blur-sm shadow-[var(--shadow-soft)]", className].filter(Boolean).join(" ")} {...rest} />;
}

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export function CardHeader({ className, ...rest }: CardHeaderProps) {
  return <div className={["p-6", className].filter(Boolean).join(" ")} {...rest} />;
}

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export function CardContent({ className, ...rest }: CardContentProps) {
  return <div className={["px-6 pb-6", className].filter(Boolean).join(" ")} {...rest} />;
}

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export function CardTitle({ className, ...rest }: CardTitleProps) {
  return <h3 className={["text-xl font-semibold", className].filter(Boolean).join(" ")} {...rest} />;
}
