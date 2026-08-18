import type { PageServerLoad } from './$types';

import { getBlogPosts, getMyWork } from '$lib/server/markdown/utils';
import { getFeaturedProjects } from '$lib/utils/projects';

export const load = (async () => {
	const [posts, projects] = await Promise.all([getBlogPosts(), getMyWork()]);
	const featuredProjects = getFeaturedProjects(projects);

	return {
		posts: posts.slice(0, 3),
		featuredProjects
	};
}) satisfies PageServerLoad;
