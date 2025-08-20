"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/motion/gsap";
import { PRM } from "@/lib/a11y/prm";
import Counter from "@/components/ui/Counter";


export default function PortfolioStories() {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => { initGSAP(); }, []);
	useEffect(() => {
		if (PRM()) return;
		const mm = gsap.matchMedia();
		const ctx = gsap.context(() => {
			mm.add("(min-width: 768px)", () => {
				document.querySelectorAll<HTMLElement>(".story").forEach((el) => {
					const isFirst = el.id === "caso-aqxion";
					if (isFirst) {
						ScrollTrigger.create({
							trigger: el,
							start: "top top+=10%",
							end: "+=80%",
							pin: true,
							pinSpacing: true,
						});
					}
					gsap.fromTo(
						el.querySelector(".story-title"),
						{ yPercent: 20, opacity: 0 },
						{ yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 80%" } }
					);
					gsap.fromTo(
						el.querySelector(".story-media"),
						{ yPercent: 10, opacity: 0 },
						{ yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 70%" } }
					);
					// stagger metrics counters
					const metrics = el.querySelectorAll(".story-metric");
					if (metrics.length) {
						gsap.fromTo(
							metrics,
							{ y: 10, opacity: 0 },
							{ y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 65%" } }
						);
					}
					// subtle bg parallax
					const bglayer = el.querySelector(".story-bg");
					if (bglayer) {
						gsap.to(bglayer, { yPercent: -8, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
					}
				});
			});
		}, ref);
		return () => { ctx.revert(); mm.revert(); };
	}, []);

	return (
		<div ref={ref} className="mt-12 space-y-24">
			{/* AQXION story */}
			<section id="caso-aqxion" className="story border-t border-border pt-10 relative overflow-hidden">
				<div className="story-bg pointer-events-none absolute inset-0 opacity-10" style={{ background: "radial-gradient(600px 200px at 20% 30%, rgba(255,255,255,0.08), transparent)" }} />
				<div className="grid gap-8 md:grid-cols-12 md:items-center">
					<div className="md:col-span-6">
						<h2 className="story-title h4">AQXION — Holding de adquisición</h2>
						<p className="body mt-4 text-muted-foreground max-w-2xl">Problema → Tesis → Sistema → Resultado.</p>
						<ul className="mt-6 grid grid-cols-2 gap-4">
							<li>
								<p className="caption">Holdings</p>
								<p className="h5 story-metric"><Counter to={1} /></p>
							</li>
							<li>
								<p className="caption">Empresas</p>
								<p className="h5 story-metric"><Counter to={2} /></p>
							</li>
						</ul>
					</div>
					<div className="story-media md:col-span-6 relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
						<Image
							src={`/og?title=${encodeURIComponent("AQXION Holding")}&kpi=${encodeURIComponent("2 Empresas")}`}
							alt="AQXION preview"
							fill
							sizes="(min-width: 768px) 640px, 100vw"
							priority={false}
								loading="lazy"
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>

			{/* B2B Lead-Gen story */}
			<section id="caso-b2b" className="story border-t border-border pt-10 relative overflow-hidden">
				<div className="story-bg pointer-events-none absolute inset-0 opacity-10" style={{ background: "radial-gradient(600px 200px at 80% 40%, rgba(255,255,255,0.08), transparent)" }} />
				<div className="grid gap-8 md:grid-cols-12 md:items-center">
					<div className="md:col-span-6">
						<h2 className="story-title h4">Lead‑Gen B2B — Automatización</h2>
						<p className="body mt-4 text-muted-foreground max-w-2xl">Problema → Sistema → Resultado (con KPIs reales).</p>
						<ul className="mt-6 grid grid-cols-2 gap-4">
							<li>
								<p className="caption">SQL</p>
								<p className="h5 story-metric"><Counter to={35} prefix="+" suffix="%" /></p>
							</li>
							<li>
								<p className="caption">CAC</p>
								<p className="h5 story-metric"><Counter to={18} prefix="-" suffix="%" /></p>
							</li>
							<li>
								<p className="caption">Reply Rate</p>
								<p className="h5 story-metric"><Counter to={22} prefix="+" suffix="%" /></p>
							</li>
						</ul>
					</div>
					<div className="story-media md:col-span-6 relative aspect-[16/9] overflow-hidden rounded-2xl border border-border">
						<Image
							src={`/og?title=${encodeURIComponent("Lead‑Gen B2B")}&kpi=${encodeURIComponent("+35% SQL")}`}
							alt="Lead‑Gen preview"
							fill
							sizes="(min-width: 768px) 640px, 100vw"
							priority={false}
								loading="lazy"
							style={{ objectFit: "cover" }}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}
