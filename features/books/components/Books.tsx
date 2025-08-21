"use client";
import booksData from '../content/books.json';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';
import ProjectField from '@/components/three/ProjectField';

export default function Books() {
	const { recommended_books } = booksData;
	const featuredBook = recommended_books[0];

	const rootRef = useRef<HTMLElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const gridRef = useRef<HTMLDivElement | null>(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			if (titleRef.current) {
				gsap.fromTo(titleRef.current, { y: 28, autoAlpha: 0 }, {
					y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 85%', end: 'top 45%', scrub: 0.6 }
				});
			}
			if (gridRef.current) {
				gsap.from(gridRef.current.children, {
					y: 18, autoAlpha: 0, stagger: 0.08, ease: 'power2.out',
					scrollTrigger: { trigger: gridRef.current, start: 'top 85%', end: '+=40%', scrub: 0.6 }
				});
			}
		}, rootRef);
		return () => ctx.revert();
	}, { scope: rootRef });

	return (
		<section id="books" ref={rootRef as React.RefObject<HTMLElement>} className="section container py-24 md:py-32 relative">
			{/* Three background reuse */}
			<ProjectField className="absolute inset-0 -z-10" />
			<h2 ref={titleRef} className="font-light tracking-tight leading-[0.9] [text-wrap:balance]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
				Libros
			</h2>
			<p className="mt-4 text-base md:text-lg text-muted-foreground max-w-prose">
				Recomendaciones en formato físico, digital y audiolibro
			</p>

			{/* Libro destacado */}
			<div ref={gridRef} className="mt-10 grid gap-6 md:grid-cols-[180px,1fr] items-start">
				<div className="aspect-[3/4] rounded-xl bg-muted/30 grid place-content-center text-sm text-muted-foreground overflow-hidden">
					<span className="text-center px-3 leading-tight font-medium">
						{featuredBook.title}
					</span>
				</div>

				<article className="rounded-2xl bg-foreground text-background p-6 lg:p-8 shadow-sm">
					<div className="flex items-start justify-between mb-2">
						<h3 className="text-xl lg:text-2xl font-bold leading-tight">{featuredBook.title}</h3>
						<div className="flex gap-0.5 ml-3">
							{[...Array(5)].map((_, i) => (
								<span key={i} className={`text-sm ${i < featuredBook.rating ? 'opacity-100' : 'opacity-30'}`}>
									★
								</span>
							))}
						</div>
					</div>

					<p className="text-sm opacity-80 mb-1">por {featuredBook.author}</p>
					<span className="inline-block text-xs bg-background text-foreground px-2 py-1 rounded-md font-medium mb-4">
						{featuredBook.category}
					</span>

					<p className="opacity-90 leading-relaxed mb-4">{featuredBook.why_recommend}</p>

					{featuredBook.key_takeaways && featuredBook.key_takeaways.length > 0 && (
						<div>
							<h4 className="text-sm font-semibold mb-2 opacity-90">Key takeaways:</h4>
							<ul className="space-y-1">
								{featuredBook.key_takeaways.slice(0, 2).map((takeaway, index) => (
									<li key={index} className="text-sm opacity-80 flex items-start gap-2">
										<span className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0" />
										{takeaway}
									</li>
								))}
							</ul>
						</div>
					)}
				</article>
			</div>

			{/* Lista compacta de otros libros */}
			{recommended_books.length > 1 && (
				<div className="mt-10">
					<h3 className="text-lg font-semibold mb-4 text-muted-foreground">Otros recomendados</h3>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{recommended_books.slice(1, 4).map((book) => (
							<div key={book.id} className="border border-border rounded-xl p-4 hover:bg-muted/5 transition-colors">
								<h4 className="font-medium text-sm leading-tight mb-1">{book.title}</h4>
								<p className="text-xs text-muted-foreground mb-2">por {book.author}</p>
								<div className="flex items-center justify-between">
									<span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
										{book.category}
									</span>
									<div className="flex gap-0.5">
										{[...Array(5)].map((_, i) => (
											<span key={i} className={`text-xs ${i < book.rating ? 'opacity-100' : 'opacity-20'}`}>
												★
											</span>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
		</section>
	);
}
