"use client";
import { useEffect, useRef } from "react";
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
} from "@/lib/three";
import { gsap, ScrollTrigger } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";

type Props = { className?: string };

// Lightweight points field used as a decorative background for Projects
export default function ProjectField({ className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (PRM()) return;
    const el = containerRef.current;
    if (!el) return;

    const width = el.clientWidth;
    const height = el.clientHeight;

  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    const scene = new Scene();
    const aspect = width / height;
    const frustum = 4; // visual scale
    const camera = new OrthographicCamera(
      -frustum * aspect,
      frustum * aspect,
      frustum,
      -frustum,
      -100,
      100
    );
    camera.position.z = 10;

    // Points
  const geometry = new BufferGeometry();
    const COUNT = 800;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  const material = new PointsMaterial({ size: 0.035, color: 0xffffff, transparent: true, opacity: 0.14 });
  const points = new Points(geometry, material);
    scene.add(points);

    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      points.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };
    render();

    // Scroll-driven subtle amplitude using GSAP
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        const st = ScrollTrigger.create({
          trigger: el.parentElement as Element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
          onUpdate: (self) => {
            const p = self.progress; // 0..1
            material.opacity = 0.08 + p * 0.18; // fade slightly
            material.size = 0.025 + p * 0.045; // grow slightly
          },
        });
        return () => st.kill();
      });
    }, el);

    const onResize = () => {
      if (!el) return;
  const w = el.clientWidth, h = el.clientHeight;
  renderer.setSize(w, h);
  const a = w / h;
  camera.left = -frustum * a;
  camera.right = frustum * a;
  camera.top = frustum;
  camera.bottom = -frustum;
  camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      try { cancelAnimationFrame(raf); } catch {}
      try { ctx.revert(); } catch {}
      try { mm.kill(); } catch {}
      try { renderer.dispose(); } catch {}
      try { geometry.dispose(); } catch {}
      try { material.dispose(); } catch {}
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} aria-hidden />;
}
