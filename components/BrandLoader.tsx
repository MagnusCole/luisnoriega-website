"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function BrandLoader() {
  const [show, setShow] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  // session flag managed in initial effect

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const seen = sessionStorage.getItem("brand-loader-seen");
    if (!seen) {
      setShow(true);
      const t = setTimeout(() => {
        sessionStorage.setItem("brand-loader-seen", "1");
        setShow(false);
      }, 1300);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!show || !rootRef.current) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const tl = gsap.timeline({ onComplete: () => setShow(false) });
    tl.fromTo(
      rootRef.current,
      { opacity: 1 },
      { opacity: 1, duration: 0.2 }
    )
      .fromTo(
        rootRef.current.querySelector(".brand-mark"),
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
        0
      )
      .to(rootRef.current, { opacity: 0, duration: 0.4, ease: "power1.out", delay: 0.5 });
    return () => {
      tl.kill();
    };
  }, [show]);

  return show ? (
    <div ref={rootRef} className="fixed inset-0 z-[10000] grid place-items-center bg-background">
      <div className="brand-mark text-2xl font-bold tracking-tight">LN</div>
    </div>
  ) : null;
}
