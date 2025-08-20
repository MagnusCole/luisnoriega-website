"use client";
import { useRef } from "react";
import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function MagneticButton({ href, children, className = "", ...props }: Props) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  if (href) {
    // Next.js Link forwards props to the underlying anchor element
    return (
      <Link
        href={href}
        className={`inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 ring-offset-[color:var(--background)] ${className}`}
        onMouseMove={(e) => onMouseMove(e as unknown as React.MouseEvent<HTMLButtonElement>)}
        onMouseLeave={reset}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 ring-offset-[color:var(--background)] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
