"use client";
import React, { useEffect, useRef, useState } from "react";

export default function MetricsStripLazy() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setShow(true);
        io.disconnect();
      }
    }, { rootMargin: "160px" });
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={ref}>
      {show ? <Inner /> : <div className="border-y border-border bg-white/5"><div className="container py-8" /></div>}
    </div>
  );
}

function Inner() {
  const [Comp, setComp] = useState<React.ComponentType | null>(null);
  useEffect(() => {
    let mounted = true;
    import("./MetricsStrip").then((m) => {
      if (!mounted) return;
      setComp(() => m.default as React.ComponentType);
    });
    return () => { mounted = false; };
  }, []);
  return Comp ? <Comp /> : null;
}
