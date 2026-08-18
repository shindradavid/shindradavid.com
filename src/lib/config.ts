import type { Theme } from '$lib/types';
import { site } from '$lib/site';

export const siteUrl = site.url;
export const cookieExpirationTime = 60 * 60 * 24 * 14;
export const defaultTheme: Theme = 'dark';
