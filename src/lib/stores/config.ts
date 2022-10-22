import type { Readable } from 'svelte/store';

import { readable } from 'svelte/store';

export const site: Readable<string> = readable('https://shindradavid.vercel.app');
