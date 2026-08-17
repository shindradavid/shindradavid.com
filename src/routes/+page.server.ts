import type { PageServerLoad } from './$types';

import { getBlogPosts, getMyWork } from '$lib/server/markdown/utils';

export const load = (async () => {
	const [posts, projects] = await Promise.all([getBlogPosts(), getMyWork()]);
	const rankedProjects = projects.filter((project) => project.featuredRank !== undefined);
	const featuredProjects = (rankedProjects.length >= 3 ? rankedProjects : projects)
		.toSorted((a, b) => (a.featuredRank ?? 999) - (b.featuredRank ?? 999))
		.slice(0, 3);

	return {
		posts: posts.slice(0, 3),
		featuredProjects
	};
}) satisfies PageServerLoad;
