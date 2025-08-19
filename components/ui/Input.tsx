"use client";
import React, { forwardRef } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string };

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, hint, error, className, id, ...rest }, ref) => {
  const inputId = id || rest.name || Math.random().toString(36).slice(2);
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm text-muted-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        ref={ref}
        className="w-full rounded-lg border border-border bg-transparent px-4 py-2 outline-none transition placeholder:text-muted-foreground/60 focus:border-accent"
        {...rest}
      />
      {hint && !error && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
