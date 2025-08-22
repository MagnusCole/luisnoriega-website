"use client";
import contactData from '../content/contact.json';
import { useContactReveal } from "../motion/contactReveal";

export default function ContactCTA() {
	const { contact_info, cta } = contactData;
	const { rootRef, titleRef, subtitleRef, buttonsRef } = useContactReveal();

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
