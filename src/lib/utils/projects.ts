import type { Project, ServiceType } from '$lib/types';

export function getFeaturedProjects(projects: Project[]): Project[] {
	const featuredProjects = projects.filter((project) => project.isFeatured === true);

	if (featuredProjects.length === 0) {
		throw new Error(
			'No featured projects configured. Mark at least one published project as featured.'
		);
	}

	const ranks = new Set<number>();
	for (const project of featuredProjects) {
		const rank = project.featuredRank;
		if (typeof rank !== 'number' || !Number.isInteger(rank) || rank <= 0) {
			throw new Error(`Featured project "${project.slug}" must have a positive integer rank.`);
		}
		if (ranks.has(rank)) {
			throw new Error(`Featured project rank ${rank} is used more than once.`);
		}
		ranks.add(rank);
	}

	return featuredProjects.toSorted(
		(firstProject, secondProject) =>
			(firstProject.featuredRank as number) - (secondProject.featuredRank as number)
	);
}

export function getProjectServiceTypes(project: Project): ServiceType[] {
	if (project.serviceTypes?.length) return project.serviceTypes;
	if (project.category === 'design') return ['design'];

	const searchable = `${project.title} ${project.description}`.toLowerCase();
	const types: ServiceType[] = [];

	if (/e-commerce|ecommerce|online store|ordering/.test(searchable)) types.push('ecommerce');
	if (/system|erp|inventory|management/.test(searchable)) types.push('business-system');
	if (/mobile|app/.test(searchable)) types.push('mobile-app');
	if (types.length === 0 || /website|marketing/.test(searchable)) types.push('business-website');

	return types;
}
