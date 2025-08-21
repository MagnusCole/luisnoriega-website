"use client";
import certificationsData from '../content/certifications.json';
import type { CertificationsContent, DeepReadonly } from '@/lib/types';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';

export default function Certifications() {
	const { certifications, skills } = (certificationsData as unknown as DeepReadonly<CertificationsContent>);

	// Refs para reveals
	const rootRef = useRef<HTMLElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const certsRef = useRef<HTMLDivElement | null>(null);
	const skillsRef = useRef<HTMLDivElement | null>(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			if (titleRef.current) {
				gsap.fromTo(
					titleRef.current,
					{ y: 28, autoAlpha: 0 },
					{ y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: rootRef.current, start: 'top 85%', end: 'top 45%', scrub: 0.6 } }
				);
			}
			if (certsRef.current) {
				gsap.from(certsRef.current.children, {
					y: 18,
					autoAlpha: 0,
					stagger: 0.06,
					ease: 'power2.out',
					scrollTrigger: { trigger: certsRef.current, start: 'top 90%', end: '+=40%', scrub: 0.6 },
				});
			}
			if (skillsRef.current) {
				gsap.from(skillsRef.current.children, {
					y: 16,
					autoAlpha: 0,
					stagger: 0.05,
					ease: 'power2.out',
					scrollTrigger: { trigger: skillsRef.current, start: 'top 90%', end: '+=30%', scrub: 0.6 },
				});
			}
		}, rootRef);
		return () => ctx.revert();
	}, { scope: rootRef });

	return (
		<section id="certs" ref={rootRef as React.RefObject<HTMLElement>} className="section container py-24 md:py-32">
			<h2
				ref={titleRef}
				className="font-black tracking-tight leading-[0.9] [text-wrap:balance]"
				style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
			>
				Certificaciones & Skills
			</h2>

			{/* Grid simple de certificaciones */}
			<div ref={certsRef} className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{certifications.map((cert) => (
					<div key={cert.id} className="rounded-xl border border-border bg-background/5 p-4 hover:bg-muted/5 transition-colors">
						<h4 className="font-semibold text-sm mb-1">{cert.title}</h4>
						<p className="text-xs text-muted-foreground">{cert.issuer}</p>
					</div>
				))}
			</div>

			{/* Skills técnicos */}
			{skills && (
				<div className="mt-12">
					<h3 className="text-lg font-semibold mb-4 text-muted-foreground">Skills Técnicos</h3>

					<div ref={skillsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{/* Marketing Tools */}
						<div>
							<h4 className="font-medium text-sm mb-3">Marketing Tools</h4>
							<div className="space-y-2">
								{skills.marketing_tools.slice(0, 4).map((tool) => (
									<div key={tool.name} className="flex items-center justify-between">
										<span className="text-sm">{tool.name}</span>
										<div className="flex items-center gap-2">
											<div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
												<div 
													className="h-full bg-foreground rounded-full"
													style={{ 
														width: tool.level === 'advanced' ? '100%' : 
																	 tool.level === 'intermediate' ? '70%' : '40%' 
													}}
												/>
											</div>
											<span className="text-xs text-muted-foreground w-8">
												{tool.years}a
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* AI Tools */}
						<div>
							<h4 className="font-medium text-sm mb-3">AI Tools</h4>
							<div className="space-y-2">
								{skills.ai_tools.slice(0, 4).map((ai) => (
									<div key={ai.name} className="flex items-center justify-between">
										<span className="text-sm">{ai.name}</span>
										<div className="flex items-center gap-2">
											<div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
												<div 
													className="h-full bg-foreground rounded-full"
													style={{ 
														width: ai.level === 'advanced' ? '100%' : 
																	 ai.level === 'intermediate' ? '70%' : '40%' 
													}}
												/>
											</div>
											<span className="text-xs text-muted-foreground w-8">
												{ai.years}a
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Technical */}
						<div>
							<h4 className="font-medium text-sm mb-3">Técnico</h4>
							<div className="space-y-2">
								{skills.technical.slice(0, 4).map((tech) => (
									<div key={tech.name} className="flex items-center justify-between">
										<span className="text-sm">{tech.name}</span>
										<div className="flex items-center gap-2">
											<div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
												<div 
													className="h-full bg-foreground rounded-full"
													style={{ 
														width: tech.level === 'advanced' ? '100%' : 
																	 tech.level === 'intermediate' ? '70%' : '40%' 
													}}
												/>
											</div>
											<span className="text-xs text-muted-foreground w-8">
												{tech.years}a
											</span>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Methodologies */}
						<div>
							<h4 className="font-medium text-sm mb-3">Metodologías</h4>
							<div className="space-y-2">
								{skills.methodologies.slice(0, 4).map((method) => (
									<div key={method.name} className="flex items-center justify-between">
										<span className="text-sm">{method.name}</span>
										<div className="flex items-center gap-2">
											<div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
												<div 
													className="h-full bg-foreground rounded-full"
													style={{ 
														width: method.level === 'advanced' ? '100%' : 
																	 method.level === 'intermediate' ? '70%' : '40%' 
													}}
												/>
											</div>
											<span className="text-xs text-muted-foreground w-8">
												{method.years}a
											</span>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
