"use client";
import MagneticButton from "@/components/ui/MagneticButton";
import Button from "@/components/ui/Button";
import { useEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { gsap } from "@/lib/motion/gsap";
import NeonGradient from "@/components/ui/NeonGradient";
import FloatingIco from "@/components/three/FloatingIco";

declare global {
	interface Window { plausible?: (event: string, options?: Record<string, unknown>) => void }
}

export default function Hero() {
	const headlineRef = useRef<HTMLHeadingElement | null>(null);
	const [showVideo, setShowVideo] = useState(false);
	const lightRef = useRef<HTMLDivElement | null>(null);
	const [canDecorate, setCanDecorate] = useState(false);
	useEffect(() => {
		if (!headlineRef.current) return;
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const desktop = window.matchMedia('(min-width: 768px)').matches;
		if (!reduce && desktop) setShowVideo(true);
		setCanDecorate(!reduce && desktop && !window.matchMedia('(hover: none) and (pointer: coarse)').matches);
		const split = new SplitType(headlineRef.current, { types: "words,chars" });
		const tl = gsap.timeline();
		if (!reduce) {
			tl.from(split.chars, {
				yPercent: 120,
				opacity: 0,
				stagger: 0.02,
				ease: "power3.out",
				duration: 0.6,
			});
			const paragraph = document.querySelector<HTMLParagraphElement>(".hero-sub");
			if (paragraph) {
				tl.from(paragraph, { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" }, "<0.05");
			}
		}
		return () => {
			split.revert();
			tl.kill();
		};
	}, []);
	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduce) return;
		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		if (!isDesktop) return;

		const ctx = gsap.context(() => {
			gsap.to(".hero-parallax-1", {
				yPercent: -8,
				ease: "none",
				scrollTrigger: { trigger: ".hero", start: "top bottom", end: "bottom top", scrub: true },
			});
			gsap.to(".hero-parallax-2", {
				yPercent: -14,
				ease: "none",
				scrollTrigger: { trigger: ".hero", start: "top bottom", end: "bottom top", scrub: true },
			});
		});
		return () => ctx.revert();
	}, []);

	// Cursor-reactive soft light (desktop only)
	useEffect(() => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		if (reduce || !isDesktop || !lightRef.current) return;
		const el = lightRef.current;
		const onMove = (e: MouseEvent) => {
			const { clientX: x, clientY: y } = e;
			el.style.background = `radial-gradient(240px 240px at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 60%)`;
		};
		window.addEventListener('mousemove', onMove);
		return () => window.removeEventListener('mousemove', onMove);
	}, []);

	return (
		<section className="hero relative overflow-hidden border-b border-border">
			{canDecorate && (
				<NeonGradient className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-screen" />
			)}
			<div ref={lightRef} className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden />
			{/* Optional video background (desktop only) */}
			{showVideo && (
				<video
					className="absolute inset-0 h-full w-full object-cover opacity-[0.08]"
					autoPlay
					playsInline
					muted
					loop
					preload="none"
					aria-hidden
				>
					<source src="/hero-loop.mp4" type="video/mp4" />
				</video>
			)}
			{/* Parallax accent layers */}
	<div className="hero-parallax-1 pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
	<div className="hero-parallax-2 pointer-events-none absolute -inset-x-10 inset-y-0 bg-[radial-gradient(40%_40%_at_80%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
			<div className="noise-overlay" />
			<div className="container py-28 md:py-40 relative">
				<h1
					className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.95]"
					ref={headlineRef}
				>
					Compramos. Escalamos. Trasciendes.
				</h1>
				<p className="hero-sub mt-6 max-w-2xl text-lg text-muted-foreground">
					Adquirimos y profesionalizamos PYMES en LATAM para continuidad, valor y crecimiento sostenido.
				</p>
				<div className="mt-10 flex items-center gap-4">
					<Button href="/portafolio" variant="primary" onClick={() => { window.plausible?.("cta:hero:ver-portafolio"); }}>
						Ver portafolio
					</Button>
					<MagneticButton href="/portafolio#caso-b2b" className="vf-hover vf-weight inline-flex items-center justify-center rounded-full border border-border px-6 py-3 font-medium hover:bg-white/5 transition" onClick={() => { window.plausible?.("cta:hero:lead-gen-b2b"); }}>
						LeadGen B2B
					</MagneticButton>
				</div>
				{/* Desktop-only 3D accent */}
				{canDecorate && (
					<div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 md:block" aria-hidden>
						<div className="absolute -inset-12 -z-10">
							<NeonGradient className="h-full w-full opacity-[0.25]" />
						</div>
						<div className="relative mx-auto">
							<FloatingIco size={280} />
						</div>
					</div>
				)}
			</div>
		</section>
	);
}
