"use client";
import { useEffect, useState } from "react";
import { PRM } from "@/lib/a11y/prm";
import FunctionCallingLoader from "./FunctionCallingLoader";

interface AppLoaderGateProps {
  children: React.ReactNode;
  /** always: show every hard load; once: show only first visit (persist) */
  mode?: "always" | "once";
  /** localStorage key for persistence + skip button */
  storageKey?: string;
  /** force fast timeline (e.g. for development) */
  forceFast?: boolean;
}

const DEFAULT_KEY = "app_loader_seen_v1";

// Optimized loader gate. Respects PRM (never shows). Supports one-time mode & fast mode.
export default function AppLoaderGate({
  children,
  mode = "once",
  storageKey = DEFAULT_KEY,
  forceFast,
}: AppLoaderGateProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (PRM()) return; // motion reduction: skip entirely
    if (mode === "once") {
      try {
        if (localStorage.getItem(storageKey)) return; // already seen
      } catch {
        // ignore storage errors
      }
    }
    setShow(true);
  }, [mode, storageKey]);

  const handleComplete = () => {
    if (mode === "once") {
      try { localStorage.setItem(storageKey, "1"); } catch { /* ignore */ }
    }
    setShow(false);
  };

  return (
    <>
      {show && (
        <FunctionCallingLoader
          onComplete={handleComplete}
          skipLocalStorageKey={storageKey}
          forceFast={forceFast}
        />
      )}
      {children}
    </>
  );
}
