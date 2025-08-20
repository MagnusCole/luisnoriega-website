"use client";

import { useEffect, useRef } from "react";
import { PRM, isDesktop, isTouch } from "@/lib/a11y/prm";

export default function FloatingIco({ size = 260 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
  if (PRM() || !isDesktop() || isTouch() || !ref.current) return;
    let cleanup: (() => void) | null = null;
    (async () => {
      const THREE = await import("three");
      const mount = ref.current!;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 3.4;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      const setSize = (w: number, h: number) => {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      setSize(size, size);
      mount.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.1, 1);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.7,
        envMapIntensity: 1.1,
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const ambient = new THREE.AmbientLight(0xffffff, 0.6);
      const dir = new THREE.DirectionalLight(0xffffff, 0.9);
      dir.position.set(2, 3, 1);
      scene.add(ambient, dir);

      let raf = 0;
      const clock = new THREE.Clock();
      let paused = false;
      const animate = () => {
        const t = clock.getElapsedTime();
        if (!paused) {
          mesh.rotation.x += 0.0035;
          mesh.rotation.y += 0.0045;
          mesh.position.y = Math.sin(t * 0.9) * 0.08;
          renderer.render(scene, camera);
        }
        raf = requestAnimationFrame(animate);
      };
      raf = requestAnimationFrame(animate);

      const onVis = () => { paused = document.hidden; };
      document.addEventListener('visibilitychange', onVis);

      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect;
          const w = Math.round(cr.width) || size;
          const h = Math.round(cr.height) || size;
          setSize(w, h);
        }
      });
      ro.observe(mount);

      cleanup = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener('visibilitychange', onVis);
        ro.disconnect();
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        mount.removeChild(renderer.domElement);
      };
    })();

    return () => {
      if (cleanup) cleanup();
    };
  }, [size]);
  return <div ref={ref} style={{ width: size, height: size }} aria-hidden />;
}
