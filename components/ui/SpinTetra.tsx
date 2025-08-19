"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SpinTetra() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = matchMedia("(min-width: 768px)").matches;
    const isTouch = matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (reduce || !desktop || isTouch) return;

    const mount = ref.current!;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(220, 220);
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
    const animate = () => {
      mesh.rotation.x += 0.004;
      mesh.rotation.y += 0.006;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={ref} className="h-[220px] w-[220px]" aria-hidden />;
}
