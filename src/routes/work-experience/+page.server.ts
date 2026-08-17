import type { PageServerLoad } from './$types';

import { getWorkExperience } from '$lib/server/markdown/utils';

export const load = (async () => ({
	workExperience: await getWorkExperience()
})) satisfies PageServerLoad;
