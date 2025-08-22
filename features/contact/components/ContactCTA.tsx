"use client";
import contactData from '../content/contact.json';
import { useContactReveal } from "../motion/contactReveal";

export default function ContactCTA() {
	const { contact_info, cta, social_links } = contactData;
	const { rootRef, titleRef, subtitleRef, buttonsRef } = useContactReveal();

	// Find LinkedIn link
	const linkedinLink = social_links.find(link => link.platform === "LinkedIn");

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
				{/* Primary CTA - Email */}
				<a
					href={`mailto:${contact_info.email}`}
					className="inline-flex items-center justify-center rounded-full px-8 py-3 bg-foreground text-background font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground transition-opacity"
					aria-label="Escríbeme por correo"
				>
					{cta.primary_button}
				</a>

				{/* Secondary CTA - LinkedIn */}
				{linkedinLink && (
					<a
						href={linkedinLink.url}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 border border-border text-foreground font-semibold hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground transition-colors"
						aria-label="Conecta conmigo en LinkedIn"
					>
						<span>{cta.secondary_button}</span>
						<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
					</a>
				)}
			</div>
		</section>
	);
}
