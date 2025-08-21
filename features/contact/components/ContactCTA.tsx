"use client";
import contactData from '../content/contact.json';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/motion/gsap';

export default function ContactCTA() {
	const { contact_info, cta, social_links } = contactData;

	const rootRef = useRef<HTMLElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const subtitleRef = useRef<HTMLParagraphElement | null>(null);
	const buttonsRef = useRef<HTMLDivElement | null>(null);
	const socialsRef = useRef<HTMLDivElement | null>(null);

	useGSAP(() => {
		const ctx = gsap.context(() => {
			if (titleRef.current) {
				gsap.fromTo(titleRef.current, { y: 28, autoAlpha: 0 }, {
					y: 0, autoAlpha: 1, duration: 0.6, ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 85%', end: 'top 45%', scrub: 0.6 }
				});
			}
			if (subtitleRef.current) {
				gsap.fromTo(subtitleRef.current, { y: 16, autoAlpha: 0 }, {
					y: 0, autoAlpha: 1, duration: 0.5, ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 80%', end: '+=20%', scrub: 0.6 }
				});
			}
			if (buttonsRef.current) {
				gsap.from(buttonsRef.current.children, {
					y: 14, autoAlpha: 0, stagger: 0.08, ease: 'power2.out',
					scrollTrigger: { trigger: rootRef.current, start: 'top 75%', end: '+=25%', scrub: 0.6 }
				});
			}
			if (socialsRef.current) {
				gsap.from(socialsRef.current.children, {
					y: 12, autoAlpha: 0, stagger: 0.06, ease: 'power2.out',
					scrollTrigger: { trigger: socialsRef.current, start: 'top 90%', end: '+=20%', scrub: 0.6 }
				});
			}
		}, rootRef);
		return () => ctx.revert();
	}, { scope: rootRef });

	return (
		<section id="contact" ref={rootRef as React.RefObject<HTMLElement>} className="section container py-24 md:py-32 text-center">
			<h2 ref={titleRef} className="font-light tracking-tight leading-[0.9] [text-wrap:balance]" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}>
				{cta.title}
			</h2>

			{cta.subtitle && (
				<p ref={subtitleRef} className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
					{cta.subtitle}
				</p>
			)}

			<div ref={buttonsRef} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
				<a
					href={`mailto:${contact_info.email}`}
					className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-foreground text-background font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground transition-opacity"
					aria-label="Escríbeme por correo"
				>
					{cta.primary_button}
				</a>
			</div>
		</section>
	);
}
