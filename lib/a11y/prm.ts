export const PRM = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;
export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
