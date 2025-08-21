// Domain types for Certifications and Skills

export type SkillLevel = 'basic' | 'intermediate' | 'advanced';

export interface SkillItem {
	name: string;
	level: SkillLevel;
	years: number; // experience in years
}

export type CertificationStatus = 'active' | 'expired' | 'revoked';

export interface Certification {
	id: string;
	title: string;
	issuer: string; // e.g., Google, Meta, IBM
	platform?: string; // e.g., Coursera, LinkedIn
	date: string; // ISO date string
	grade?: string;
	credential_id?: string;
	skills: ReadonlyArray<string>;
	image?: string;
	verify_url?: string;
	status?: CertificationStatus;
}

export interface CertificationsContent {
	certifications: Certification[];
	skills: {
		marketing_tools: SkillItem[];
		ai_tools: SkillItem[];
		technical: SkillItem[];
		methodologies: SkillItem[];
	};
}

