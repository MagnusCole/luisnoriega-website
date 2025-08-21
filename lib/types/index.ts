// Barrel exports for domain types and utility types

export * from './certifications';

// Global content types
export interface BioContent {
	name: string;
	title: string;
	location: string;
	description: string;
	tagline: string;
	avatar: string;
	social: Record<string, string>;
	highlights: string[];
}

export interface ProjectLinkSet {
	live?: string;
	case_study?: string;
	prototype?: string;
}

export interface ProjectItem {
	id: string;
	title: string;
	description: string;
	image: string;
	tags: string[];
	status: 'completed' | 'in_progress' | 'archived';
	year: number;
	duration?: string;
	role?: string;
	highlights?: string[];
	links?: ProjectLinkSet;
}

export interface ProjectsContent {
	projects: ProjectItem[];
	categories?: Array<{ id: string; name: string; count?: number }>;
}

export interface BookItem {
	id: string;
	title: string;
	author: string;
	category: string;
	rating: number; // 1..5
	status: 'read' | 'currently_reading' | 'want_to_read';
	date_read?: string;
	date_started?: string;
	cover: string;
	isbn?: string;
	why_recommend?: string;
	key_takeaways?: string[];
	amazon_link?: string;
}

export interface BooksContent {
	recommended_books: BookItem[];
	reading_stats?: Record<string, number | string | string[]>;
	categories?: Array<{ id: string; name: string; count?: number }>;
}

export interface ContactInfo {
	email: string;
	location: string;
	timezone?: string;
	availability?: string;
	response_time?: string;
}

export interface ServiceItem {
	id: string;
	title: string;
	description: string;
	duration?: string;
	starting_price?: string;
}

export interface ProcessStep {
	step: number;
	title: string;
	description: string;
}

export interface ContactContent {
	contact_info: ContactInfo;
	services: ServiceItem[];
	process: ProcessStep[];
	social_links?: Array<{ platform: string; url: string; username?: string }>;
	cta?: { title: string; subtitle?: string; primary_button?: string; secondary_button?: string };
}

// Utility types
export type ValueOf<T> = T[keyof T];

export type DeepReadonly<T> = T extends (...args: unknown[]) => unknown
	? T
	: T extends object
	? { readonly [K in keyof T]: DeepReadonly<T[K]> }
	: T;

export type BrandedId<TBrand extends string> = string & { readonly __brand: TBrand };

