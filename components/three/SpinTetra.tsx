"use client";

import { useEffect, useRef } from "react";
import { PRM, isDesktop, isTouch } from "@/lib/a11y/prm";

declare global { interface Window { plausible?: (event: string, options?: Record<string, unknown>) => void } }

let THREERef: typeof import("three") | null = null;

export default function SpinTetra() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (PRM() || !isDesktop() || isTouch()) return;

    const mount = ref.current!;
    let cleanup: (() => void) | null = null;

    (async () => {
      window.plausible?.("motion:spin-tetra:mounted");
      if (!THREERef) {
        THREERef = await import("three");
      }
      const THREE = THREERef!;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 3.2;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const setSize = (w: number, h: number) => {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      // initial size: use mount box or fallback to 220
      const initW = Math.round(mount.clientWidth) || 220;
      const initH = Math.round(mount.clientHeight) || 220;
      setSize(initW, initH);
      mount.appendChild(renderer.domElement);

      const geometry = new THREE.TetrahedronGeometry(1.1, 0);
      const material = new THREE.MeshStandardMaterial({
        color: 0x8ab4ff,
        roughness: 0.2,
        metalness: 0.65,
        envMapIntensity: 1.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      const dir = new THREE.DirectionalLight(0xffffff, 1.0);
      dir.position.set(3, 4, 2);
      scene.add(ambient, dir);

      let raf = 0;
      let paused = false;
      const animate = () => {
        if (!paused) {
          mesh.rotation.x += 0.004;
          mesh.rotation.y += 0.006;
          renderer.render(scene, camera);
        }
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      const onVis = () => { paused = document.hidden; };
      document.addEventListener("visibilitychange", onVis);

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          const w = Math.round(width) || initW;
          const h = Math.round(height) || initH;
          setSize(w, h);
        }
      });
      ro.observe(mount);

      cleanup = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("visibilitychange", onVis);
        ro.disconnect();
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        mount.removeChild(renderer.domElement);
      };
    })();

    return () => { if (cleanup) cleanup(); };
  }, []);

  return <div ref={ref} className="h-[220px] w-[220px]" aria-hidden />;
}
