"use client";
import { useEffect, useState } from "react";
import { PRM } from "@/lib/a11y/prm";
import FunctionCallingLoader from "./FunctionCallingLoader";

type Props = { children: React.ReactNode };

// Shows the loader on first visit only (persisted in sessionStorage)
export default function AppLoaderGate({ children }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (PRM()) return; // never show on PRM
    try {
      const seen = sessionStorage.getItem("ln_seen_loader") === "1";
      if (!seen) {
        setShow(true);
      }
    } catch {}
  }, []);

  const onDone = () => {
    try { sessionStorage.setItem("ln_seen_loader", "1"); } catch {}
    setShow(false);
  };

  return (
    <>
      {show && <FunctionCallingLoader onComplete={onDone} />}
      {children}
    </>
  );
}
