"use client";
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/motion/gsap';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
  Color,
} from '@/lib/three';
import { PRM } from '@/lib/a11y/prm';

export default function BioParticles() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (PRM()) return;
    const isDesktop = matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 300;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() * 2 - 1) * 1.0;
      positions[i3 + 1] = (Math.random() * 2 - 1) * 0.8;
      positions[i3 + 2] = 0;
      speeds[i] = 0.12 + Math.random() * 0.28;
    }

    const geom = new BufferGeometry();
    geom.setAttribute('position', new Float32BufferAttribute(positions, 3));

    const mat = new PointsMaterial({
      size: 0.012,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      color: new Color('#ffffff'),
      opacity: 0.28,
    });

    const pts = new Points(geom, mat);
    scene.add(pts);

    const setSize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
    };
    setSize();
    const ro = new ResizeObserver(setSize);
    ro.observe(container);

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      const pos = geom.getAttribute('position') as Float32BufferAttribute;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos.array[i3 + 0] += Math.sin(t * speeds[i] + i) * 0.0005;
        pos.array[i3 + 1] += Math.cos(t * speeds[i] + i) * 0.0005;
      }
      pos.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // Scroll-driven: fade/scale subtly across section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.parentElement ?? container,
        start: 'top 90%',
        end: 'bottom 10%',
        scrub: 0.6,
      },
    });
    tl.fromTo(mat, { opacity: 0.08 }, { opacity: 0.28, ease: 'none' });

    return () => {
      tl.scrollTrigger?.kill();
      ro.disconnect();
      cancelAnimationFrame(raf);
      geom.dispose();
      mat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{ opacity: 0.5 }}
    />
  );
}
