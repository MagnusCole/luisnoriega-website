import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React from "react";

type Props = NextLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  underline?: boolean;
};

export default function Link({ href, children, className, underline = false, ...rest }: Props) {
  const base = underline ? "underline underline-offset-4" : "hover:underline underline-offset-4";
  return (
    <NextLink href={href} className={[base, "vf-hover vf-weight", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </NextLink>
  );
}
