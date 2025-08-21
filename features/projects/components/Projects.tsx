"use client";
import projectsData from '../content/projects.json';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import ProjectField from '@/components/three/ProjectField';

export default function Projects() {
	const { projects } = projectsData;
	const rootRef = useRef<HTMLElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const gridRef = useRef<HTMLDivElement | null>(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			if (titleRef.current) {
				gsap.fromTo(titleRef.current, { y: 28, autoAlpha: 0 }, {
					y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 80%', end: 'top 40%', scrub: 0.6 }
				});
			}
			if (gridRef.current) {
				gsap.from(gridRef.current.children, {
					y: 18, autoAlpha: 0, stagger: 0.08, ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 70%', end: '+=40%', scrub: 0.6 }
				});
			}
		}, rootRef);
		return () => ctx.revert();
	}, { scope: rootRef });

	return (
		<section id="projects" ref={rootRef as React.RefObject<HTMLElement>} className="section container py-24 md:py-32 relative">
			{/* Three background */}
			<ProjectField className="absolute inset-0 -z-10" />
			<h2 ref={titleRef} className="font-light tracking-tight leading-[0.9] [text-wrap:balance]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
				Proyectos
			</h2>
			<div ref={gridRef} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{projects.map((project) => (
					<article
						key={project.id}
						className="group rounded-2xl bg-foreground text-background p-6 shadow-sm hover:translate-y-[-2px] transition-all duration-300"
					>
						<div className="flex items-start justify-between mb-3">
							<h3 className="font-bold text-lg leading-tight">{project.title}</h3>
							<span className="text-xs opacity-60">{project.year}</span>
						</div>
            
						<p className="text-sm opacity-80 leading-relaxed mb-4 line-clamp-3">
							{project.description}
						</p>
            
						<div className="flex flex-wrap gap-1.5 mb-4">
							{project.tags.slice(0, 3).map((tag) => (
								<span 
									key={tag}
									className="text-xs px-2 py-1 bg-background text-foreground rounded-md font-medium"
								>
									{tag}
								</span>
							))}
							{project.tags.length > 3 && (
								<span className="text-xs opacity-60">+{project.tags.length - 3}</span>
							)}
						</div>

						<div className="flex items-center justify-between">
							<span className="text-xs font-medium opacity-80">{project.role}</span>
							<div className="flex items-center gap-2">
								{project.status === 'completed' && (
									<span className="w-2 h-2 bg-green-400 rounded-full" title="Completado" />
								)}
								{project.status === 'in_progress' && (
									<span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" title="En progreso" />
								)}
							</div>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
