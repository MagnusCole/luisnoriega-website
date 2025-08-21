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
  Vector2,
} from '@/lib/three';
import { PRM } from '@/lib/a11y/prm';

// Lightweight particles field for footer background (desktop only)
export default function FooterParticles() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cleanupRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (PRM()) return; // respect reduced motion

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

    // Controls driven by ScrollTrigger
    const controls = {
      ampNear: 1,
      ampFar: 0.8,
      sizeNear: 0.01,
      sizeFar: 0.006,
      opacityNear: 0.28,
      opacityFar: 0.18,
    };

    // Near layer
    const nearCount = 500;
    const nearPositions = new Float32Array(nearCount * 3);
    const nearSpeeds = new Float32Array(nearCount);
    for (let i = 0; i < nearCount; i++) {
      const i3 = i * 3;
      nearPositions[i3 + 0] = (Math.random() * 2 - 1) * 1.5;
      nearPositions[i3 + 1] = (Math.random() * 2 - 1) * 1.0;
      nearPositions[i3 + 2] = 0;
      nearSpeeds[i] = 0.18 + Math.random() * 0.35;
    }
    const nearGeom = new BufferGeometry();
    nearGeom.setAttribute('position', new Float32BufferAttribute(nearPositions, 3));
    const nearMat = new PointsMaterial({
      size: controls.sizeNear,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      color: new Color('#ffffff'),
      opacity: controls.opacityNear,
    });
    const nearPoints = new Points(nearGeom, nearMat);
    scene.add(nearPoints);

    // Far layer
    const farCount = 400;
    const farPositions = new Float32Array(farCount * 3);
    const farSpeeds = new Float32Array(farCount);
    for (let i = 0; i < farCount; i++) {
      const i3 = i * 3;
      farPositions[i3 + 0] = (Math.random() * 2 - 1) * 1.8;
      farPositions[i3 + 1] = (Math.random() * 2 - 1) * 1.2;
      farPositions[i3 + 2] = 0;
      farSpeeds[i] = 0.12 + Math.random() * 0.25;
    }
    const farGeom = new BufferGeometry();
    farGeom.setAttribute('position', new Float32BufferAttribute(farPositions, 3));
    const farMat = new PointsMaterial({
      size: controls.sizeFar,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      color: new Color('#ffffff'),
      opacity: controls.opacityFar,
    });
    const farPoints = new Points(farGeom, farMat);
    scene.add(farPoints);

    // Resize handling
    const setSize = () => {
      const { width, height } = container.getBoundingClientRect();
      renderer.setSize(width, height);
    };

    setSize();
    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

  let raf = 0;
  let t = 0;
    const mouse = new Vector2(0, 0);

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
      mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });

    const animate = () => {
      t += 0.016; // ~60fps timestep
      const posNear = nearGeom.getAttribute('position') as Float32BufferAttribute;
      for (let i = 0; i < nearCount; i++) {
        const i3 = i * 3;
        posNear.array[i3 + 0] += Math.sin(t * nearSpeeds[i] + i) * 0.0006 * controls.ampNear + mouse.x * 0.0008;
        posNear.array[i3 + 1] += Math.cos(t * nearSpeeds[i] + i) * 0.0006 * controls.ampNear + mouse.y * 0.0006;
      }
      posNear.needsUpdate = true;

      const posFar = farGeom.getAttribute('position') as Float32BufferAttribute;
      for (let i = 0; i < farCount; i++) {
        const i3 = i * 3;
        posFar.array[i3 + 0] += Math.sin(t * farSpeeds[i] + i) * 0.0004 * controls.ampFar + mouse.x * 0.0004;
        posFar.array[i3 + 1] += Math.cos(t * farSpeeds[i] + i) * 0.0004 * controls.ampFar + mouse.y * 0.0003;
      }
      posFar.needsUpdate = true;

      // Reflect size/opacity changes
      nearMat.size = controls.sizeNear;
      nearMat.opacity = controls.opacityNear;
      farMat.size = controls.sizeFar;
      farMat.opacity = controls.opacityFar;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    // Scroll-driven controls (scrubbed)
    const triggerEl = container.parentElement ?? container;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 0.6,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
    });

    tl.to(controls, { ampNear: 1.8, ampFar: 1.2, duration: 1, ease: 'power1.out' })
      .to(controls, { sizeNear: 0.016, sizeFar: 0.009, opacityNear: 0.45, opacityFar: 0.28, ease: 'power1.out' }, '<');

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', onPointerMove);
      tl.scrollTrigger?.kill();
      tl.kill();
      nearGeom.dispose();
      nearMat.dispose();
      farGeom.dispose();
      farMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };

    return () => cleanupRef.current?.();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
  className="pointer-events-none absolute inset-0 z-0"
      style={{ opacity: 0.35 }}
    />
  );
}
