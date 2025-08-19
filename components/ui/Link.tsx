import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type Props = NextLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  underline?: boolean;
};

export default function Link({ href, children, className, underline = false, ...rest }: Props) {
  // Animated underline via background-size; falls back to standard underline when 'underline' prop is true
  const animUnderline =
    "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-no-repeat bg-[0_100%] transition-[background-size,color] duration-300 ease-out hover:bg-[length:100%_1px]";
  const base = underline ? "underline underline-offset-4" : animUnderline;
  return (
    <NextLink href={href} className={[base, "vf-hover vf-weight", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </NextLink>
  );
}
