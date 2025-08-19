"use client";
import React, { forwardRef } from "react";

type ButtonProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>["target"];
  rel?: React.AnchorHTMLAttributes<HTMLAnchorElement>["rel"];
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function classNames(...args: Array<string | undefined | false>) {
  return args.filter(Boolean).join(" ");
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", size = "md", href, target, rel, className, disabled, children, ...rest }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-full font-medium transition vf-hover vf-weight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 ring-offset-[color:var(--background)]";
    const variantCls =
      variant === "primary"
        ? "bg-accent text-[color:var(--background)] hover:opacity-90"
        : variant === "outline"
        ? "border border-border hover:bg-white/5"
        : "hover:bg-white/5";
    const sizeCls = size === "sm" ? "px-3 py-2 text-sm" : size === "lg" ? "px-7 py-4 text-lg" : "px-5 py-3";
    const disabledCls = disabled ? "opacity-50 pointer-events-none" : "";
    const cls = classNames(base, variantCls, sizeCls, disabledCls, className);

    if (href) {
      const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <a ref={ref as React.Ref<HTMLAnchorElement>} href={href} target={target} rel={rel} className={cls} aria-disabled={disabled} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={cls} disabled={disabled} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
