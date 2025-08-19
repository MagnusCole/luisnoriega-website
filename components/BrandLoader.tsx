"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BrandLoader() {
  const [show, setShow] = useState(false);

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

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          className="fixed inset-0 z-[10000] grid place-items-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }}
            className="text-2xl font-bold tracking-tight"
          >
            LN
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
