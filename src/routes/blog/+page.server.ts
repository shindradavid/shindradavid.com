import type { PageServerLoad } from './$types';

import { getBlogPosts } from '$lib/server/markdown/utils';

export const load = (async () => ({ posts: await getBlogPosts() })) satisfies PageServerLoad;
