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

export function sortPortfolioProjects(projects: Project[]): Project[] {
	const ranks = new Set<number>();

	for (const project of projects) {
		const rank = project.portfolioRank;
		if (rank === undefined) continue;
		if (!Number.isInteger(rank) || rank <= 0) {
			throw new Error(`Portfolio project "${project.slug}" must have a positive integer rank.`);
		}
		if (ranks.has(rank)) {
			throw new Error(`Portfolio project rank ${rank} is used more than once.`);
		}
		ranks.add(rank);
	}

	return projects.toSorted((firstProject, secondProject) => {
		const firstRank = firstProject.portfolioRank;
		const secondRank = secondProject.portfolioRank;

		if (firstRank !== undefined && secondRank !== undefined) return firstRank - secondRank;
		if (firstRank !== undefined) return -1;
		if (secondRank !== undefined) return 1;

		const dateDifference =
			new Date(secondProject.publishedOn).getTime() - new Date(firstProject.publishedOn).getTime();
		return dateDifference || firstProject.slug.localeCompare(secondProject.slug);
	});
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
