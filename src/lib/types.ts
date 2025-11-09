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

export interface ProjectFrontmatter {
	id: number;
	title: string;
	description: string;
	category: 'software' | 'design';
	technologies: string[];
	gallery: string[];
	image: string;
	link: string;
	client: string;
	thumbnailUrl: string;
	liveUrl: string | undefined;
	publishedOn: string;
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
	images: {
		src: string;
		caption: string;
	}[];
}

export interface WorkExperience extends ExperienceFrontmatter {
	slug: string;
}
