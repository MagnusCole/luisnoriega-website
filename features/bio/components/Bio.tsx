"use client";
import Image from 'next/image';
import bioData from '../content/bio.json';
import { useBioReveal, BioParticles } from '@/shared/motion';

export default function Bio() {
	const { name, tagline, avatar } = bioData as {
		name: string;
		tagline?: string;
		avatar?: string;
	};

	const { rootRef, titleRef, descRef, cardRef } = useBioReveal();

	return (
		<section
			id="bio"
			ref={rootRef as React.RefObject<HTMLElement>}
			className="section container relative grid items-center gap-12 lg:grid-cols-2 py-24 md:py-32"
		>
			{/* Partículas de fondo (lado de la imagen) */}
			<BioParticles />

			{/* Texto XXL y CTA */}
			<div className="relative z-10">
				<h2
					ref={titleRef}
					className="font-light tracking-tight leading-[0.9] [text-wrap:balance]"
					style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
				>
					{name}
				</h2>
				{tagline && (
					<p ref={descRef} className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl">
						{tagline}
					</p>
				)}

				<div className="mt-10 flex flex-wrap gap-4">
				</div>
			</div>

			{/* Retrato XXL */}
			<div className="justify-self-end">
				<figure
					ref={cardRef}
					className="relative rounded-xl overflow-hidden w-[320px] h-[420px] sm:w-[420px] sm:h-[560px] md:w-[520px] md:h-[680px] bg-neutral-900"
					style={{ maskImage: 'radial-gradient(white, black)', WebkitMaskImage: 'radial-gradient(white, black)' }}
				>
					{avatar && (
						<Image
							src={avatar}
							alt={`Retrato de ${name}`}
							fill
							priority
							sizes="(min-width: 1024px) 520px, (min-width: 640px) 420px, 320px"
							className="object-cover object-center opacity-95"
						/>
					)}
					{/* ligera textura */}
					<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_40%)] mix-blend-soft-light" />
				</figure>
			</div>
		</section>
	);
}
