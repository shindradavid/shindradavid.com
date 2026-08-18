export type Frontmatter = {
	title: string;
	description: string;
	thumbnailUrl: string;
	publishedOn: string;
	tags: string[];
};

export interface Post extends Frontmatter {
	slug: string;
}

export type Theme = 'dark' | 'light' | 'system';

export type ServiceType =
	| 'business-website'
	| 'ecommerce'
	| 'business-system'
	| 'mobile-app'
	| 'design';

export interface Testimonial {
	quote: string;
	name: string;
	role?: string;
	company: string;
}

export interface ProjectFrontmatter {
	title: string;
	description: string;
	category: 'software' | 'design';
	technologies: string[];
	client: string;
	thumbnailUrl: string;
	liveUrl?: string;
	playStoreUrl?: string;
	appStoreUrl?: string;
	githubUrl?: string;
	role?: string;
	duration?: string;
	serviceTypes?: ServiceType[];
	isFeatured?: boolean;
	featuredRank?: number;
	outcomes?: string[];
	testimonial?: Testimonial;
	gallery?: Array<{ src: string; caption?: string }>;
	publishedOn: string;
	isPublished: boolean;
}

export interface Project extends ProjectFrontmatter {
	slug: string;
}

export interface ExperienceFrontmatter {
	id: number;
	order: string;
	duration: string;
	title: string;
	company: string;
	description: string;
	technologies: string[];
	link: string;
	images?: {
		src: string;
		caption: string;
	}[];
}

export interface WorkExperience extends ExperienceFrontmatter {
	slug: string;
}

export interface Service {
	slug: ServiceType;
	title: string;
	description: string;
	idealFor: string;
	deliverables: string[];
	startingPriceUGX?: number;
}
