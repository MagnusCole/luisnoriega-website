"use client";
import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  padding?: "sm" | "md" | "lg";
};

const paddings = {
  sm: "py-10 md:py-12",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

export default function Section({ as: Tag = "section", padding = "md", className, ...rest }: Props) {
  return <Tag className={[paddings[padding], className].filter(Boolean).join(" ")} {...rest} />;
}
