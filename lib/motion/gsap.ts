import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let ready = false;
export function initGSAP() {
  if (ready) return gsap;
  if (typeof window === "undefined") return gsap;
  gsap.registerPlugin(ScrollTrigger);
  ready = true;
  return gsap;
}

export { gsap, ScrollTrigger };
