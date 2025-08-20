"use client";
import dynamic from "next/dynamic";
import { PRM, isDesktop } from "@/lib/a11y/prm";

type Scene = { id: string; title: string; subtitle?: string };

const ScrollScenesClient = dynamic<{ scenes: Scene[] }>(() => import("./ScrollScenesClient"), { ssr: false, loading: () => null });

export default function ScrollScenesLazy(props: { scenes: Scene[] }) {
  if (PRM() || !isDesktop()) return null;
  return <ScrollScenesClient scenes={props.scenes} />;
}
