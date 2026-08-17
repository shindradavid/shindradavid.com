import type { PageServerLoad } from './$types';

import { getMyWork } from '$lib/server/markdown/utils';

export const load = (async () => ({ projects: await getMyWork() })) satisfies PageServerLoad;
