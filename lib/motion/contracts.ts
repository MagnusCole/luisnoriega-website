import { gsap, ScrollTrigger, initGSAP } from "./gsap";
import { PRM } from "../a11y/prm";

type RevealOptions = {
  y?: number;
  opacityFrom?: number;
  duration?: number; // micro motion: 0.2–0.3s
  stagger?: number;
  once?: boolean;
  rootMargin?: string;
  ease?: string;
};

/**
 * reveal()
 * Micro entrance animation for elements on enter viewport.
 * Respects PRM and uses small budgets by default.
 * Returns a cleanup function.
 */
export function reveal(
  target: string | Element | Element[] | NodeListOf<Element>,
  opts: RevealOptions = {}
) {
  const duration = opts.duration ?? 0.28;
  const y = opts.y ?? 12;
  const opacityFrom = opts.opacityFrom ?? 0;
  const ease = opts.ease ?? "power2.out";
  const once = opts.once ?? true;
  const rootMargin = opts.rootMargin ?? "-10% 0px";

  const elements: Element[] =
    typeof target === "string"
      ? Array.from(document.querySelectorAll(target))
      : (target instanceof Element
          ? [target]
          : Array.from(target as Element[]));

  if (elements.length === 0) return () => {};

  // PRM: just make them visible without animation
  if (PRM()) {
    elements.forEach((el) => {
      (el as HTMLElement).style.opacity = "1";
      (el as HTMLElement).style.transform = "none";
    });
    return () => {};
  }

  // Use IntersectionObserver to trigger; gsap for tweening when available
  initGSAP();
  const observers: IntersectionObserver[] = [];
  const tweens: gsap.core.Tween[] = [];

  elements.forEach((el) => {
    const node = el as HTMLElement;
    // set initial state (no jank if already visible)
    node.style.willChange = "transform, opacity";
    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry.isIntersecting) return;
        const tween = gsap.fromTo(
          node,
          { opacity: opacityFrom, y },
          { opacity: 1, y: 0, duration, ease, clearProps: "transform,opacity" }
        );
        tweens.push(tween);
        if (once) {
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 }
    );
    io.observe(node);
    observers.push(io);
  });

  return () => {
    observers.forEach((o) => o.disconnect());
    tweens.forEach((t) => t.kill());
  };
}

type PinOptions = {
  start?: string;
  end?: string;
  pinSpacing?: boolean;
  scrub?: boolean | number;
};

/**
 * pinOnce()
 * Creates a single pin ScrollTrigger for emphasis within a block.
 * Caller should ensure "one pin per block" discipline.
 * Returns a cleanup function.
 */
export function pinOnce(trigger: Element | string, opts: PinOptions = {}) {
  if (PRM()) return () => {};
  initGSAP();
  const trg = typeof trigger === "string" ? document.querySelector(trigger) : trigger;
  if (!trg) return () => {};
  const st = ScrollTrigger.create({
    trigger: trg as Element,
    start: opts.start ?? "top top+=20%",
    end: opts.end ?? "+=80%",
    pin: true,
    pinSpacing: opts.pinSpacing ?? true,
    scrub: opts.scrub ?? false,
  });
  return () => st.kill();
}

type MaskOptions = {
  color?: string;
  durationIn?: number; // <= 0.8s transitions
  durationOut?: number; // <= 0.8s transitions
  ease?: string;
  fastExit?: boolean;
  overlayEl?: HTMLElement;
  onComplete?: () => void;
};

/**
 * maskTransition()
 * Route/page transition using a full-screen clip-path mask.
 * Creates an overlay if none provided and removes it after.
 */
export function maskTransition(opts: MaskOptions = {}): { cancel: () => void } {
  const reduce = PRM();
  const fastExit = opts.fastExit ?? (typeof document !== "undefined" && document.visibilityState === "hidden");
  // Defaults tuned to stay under the 800ms route-transition budget (0.4 + 0.35 = 0.75s)
  const durationIn = Math.min(opts.durationIn ?? 0.4, 0.8);
  const durationOut = Math.min(opts.durationOut ?? (fastExit ? 0.1 : 0.35), 0.8);
  const ease = opts.ease ?? "power3.inOut";

  if (reduce) {
    opts.onComplete?.();
    return { cancel: () => {} };
  }

  initGSAP();

  let overlay = opts.overlayEl;
  let owned = false;
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.setAttribute("aria-hidden", "true");
    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      zIndex: "9999",
      background: opts.color ?? "black",
      clipPath: "inset(0 100% 0 0)",
      pointerEvents: "none",
    } as CSSStyleDeclaration);
    document.body.appendChild(overlay);
    owned = true;
  }

  const tl = gsap.timeline({
    onComplete: () => {
      opts.onComplete?.();
      if (owned && overlay) overlay.remove();
    },
  });
  tl.set(overlay!, { clipPath: "inset(0 100% 0 0)" })
    .to(overlay!, { clipPath: "inset(0 0% 0 0)", duration: durationIn, ease })
    .to(overlay!, { clipPath: "inset(0 0 0 100%)", duration: durationOut, ease });

  return { cancel: () => tl.kill() };
}
