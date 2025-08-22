"use client";

import { useEffect, useRef } from "react";
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  TextureLoader,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  SRGBColorSpace,
  type IUniform,
  type Texture,
} from "@/lib/three";
import Image from "next/image";

// Extend minimal types (non-invasive) if needed for colorSpace property
interface ColorSpaceCapable { outputColorSpace?: unknown }
interface TextureColorSpace { colorSpace?: unknown }

// Simple fragment shader for basic image display
const fragmentShader = /* glsl */ `
precision mediump float;

uniform sampler2D uBase;
varying vec2 vUv;

void main(){
  vec4 base = texture2D(uBase, vUv);
  gl_FragColor = base;
}
`;

const vertexShader = /* glsl */ `
precision mediump float;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

interface LuisCanvasProps {
  className?: string;
  intensity?: number;
  edgeInner?: number;
  edgeOuter?: number;
  feather?: number;
  speed?: number;
  warp?: number;
}

interface Uniforms {
  uBase: IUniform;
}

export default function LuisCanvas({ className = "", intensity = 1, edgeInner = 0.25, edgeOuter = 0.55, feather = 0.04, speed = 1, warp = 0.06 }: LuisCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!containerRef.current) return;
    if (prefersReducedMotion) return; // fallback handled by static image below

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const renderer = new WebGLRenderer({ antialias: true, alpha: true }) as WebGLRenderer & ColorSpaceCapable;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(width, height);
    if ('outputColorSpace' in renderer) renderer.outputColorSpace = SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 10);
    camera.position.z = 1;

    const loader = new TextureLoader();
    const baseTex = loader.load('/images/luis/luis-desktop.png', 
      (texture) => console.log('Base texture loaded:', texture),
      undefined,
      (error) => console.error('Base texture failed to load:', error)
    ) as Texture & TextureColorSpace;
    if ('colorSpace' in baseTex) baseTex.colorSpace = SRGBColorSpace;

    const uniforms: Uniforms = {
      uBase: { value: baseTex },
    };

    const material = new ShaderMaterial({
      uniforms: uniforms as unknown as { [uniform: string]: IUniform },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    const geometry = new PlaneGeometry(2, 2);
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    let running = true;
    let frameId: number;

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { running = entry.isIntersecting; });
    }, { threshold: 0.05 });
    observer.observe(containerRef.current);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!running) return;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      baseTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [intensity, edgeInner, edgeOuter, feather, speed, warp, prefersReducedMotion]);

  return (
    <div className={"relative w-full h-full " + className} ref={containerRef} aria-hidden>
      {prefersReducedMotion && (
        <Image
          src="/images/luis/luis-desktop.png"
          alt="Luis"
          fill
          sizes="(max-width: 768px) 60vw, 40vw"
          priority
          className="object-contain select-none pointer-events-none"
          draggable={false}
        />
      )}
    </div>
  );
}
