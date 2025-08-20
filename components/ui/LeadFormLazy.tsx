"use client";
import React, { useEffect, useRef, useState } from "react";

export default function LeadFormLazy(props: { source?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShow(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={ref}>
      {show ? (
        // Dynamic import only after in-view
        <LazyInner source={props.source} />
      ) : (
        <div aria-hidden className="h-[420px] rounded-md border border-border bg-muted/10" />
      )}
    </div>
  );
}

function LazyInner(props: { source?: string }) {
  const [Comp, setComp] = useState<React.ComponentType<{ source?: string }> | null>(null);
  useEffect(() => {
    let mounted = true;
    import("./LeadForm").then((m) => {
      if (!mounted) return;
      const C = m.default as React.ComponentType<{ source?: string }>;
      setComp(() => C);
    });
    return () => {
      mounted = false;
    };
  }, []);
  return Comp ? <Comp source={props.source} /> : null;
}
