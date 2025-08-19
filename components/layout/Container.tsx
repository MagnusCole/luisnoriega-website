"use client";
import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & { as?: React.ElementType; fluid?: boolean };

export default function Container({ as: Tag = "div", fluid = false, className, ...rest }: Props) {
  const base = fluid ? "w-full px-6" : "container";
  return <Tag className={[base, className].filter(Boolean).join(" ")} {...rest} />;
}
