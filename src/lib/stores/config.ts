import type { Readable } from 'svelte/store';

import { readable } from 'svelte/store';

export const siteURL: Readable<string> = readable('https://shindradavid.vercel.app');
