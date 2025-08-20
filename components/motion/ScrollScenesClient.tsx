"use client";
import dynamic from "next/dynamic";

type Scene = { id: string; title: string; subtitle?: string };
type Props = { scenes: Scene[] };

const ScrollScenes = dynamic<Props>(() => import("./ScrollScenes"), { ssr: false, loading: () => null });
export default ScrollScenes;
