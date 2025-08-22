"use client";
import contact from '../content/contact.json';
import { useReveal } from '@/shared/motion/useReveal';

// Minimal contact: single headline + primary email button.
export default function ContactCTA() {
	const email = contact.contact_info.email;
		const ref = useReveal<HTMLElement>({});
		return (
			<section id="contact" ref={ref} className="py-32 text-center text-white bg-black reveal">
			<div className="container max-w-[900px] mx-auto px-[clamp(2rem,8vw,8rem)]">
				<h2 className="font-['Inter'] font-bold tracking-tight leading-none text-[clamp(2.5rem,7vw,5rem)]">
					{contact.cta.title}
				</h2>
				{contact.cta.subtitle && (
					<p className="mt-4 text-white/50 max-w-2xl mx-auto text-lg">
						{contact.cta.subtitle}
					</p>
				)}
				<div className="mt-10 flex justify-center">
					<a
						href={`mailto:${email}`}
						className="inline-flex items-center gap-2 rounded-full px-8 py-3 bg-white text-black font-semibold hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition"
						aria-label="Enviar email"
					>
						{contact.cta.primary_button}
						<svg aria-hidden viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
							<path d="M4 8l8 5 8-5" />
							<path d="M4 8v8h16V8" />
						</svg>
					</a>
				</div>
			</div>
		</section>
	);
}
