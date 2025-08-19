"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_=+*\/[]{}—•^?#@£$%&";

export default function TextScramble({ text, className = "" }: { text: string; className?: string }) {
  const [output, setOutput] = useState(text);
  const frame = useRef(0);
  const lastText = useRef(text);

  useEffect(() => {
    let raf = 0;
    const from = lastText.current;
    const to = text;
    const maxLen = Math.max(from.length, to.length);
    const duration = 22; // frames

    const animate = () => {
      frame.current += 1;
      const newText = Array.from({ length: maxLen })
        .map((_, i) => {
          const progress = frame.current / duration;
          const shouldReveal = progress > i / maxLen;
          if (shouldReveal) return to[i] ?? "";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setOutput(newText);
      if (frame.current < duration) raf = requestAnimationFrame(animate);
      else setOutput(to);
    };

    frame.current = 0;
  raf = requestAnimationFrame(animate);
  lastText.current = text;
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return <span className={className}>{output}</span>;
}
