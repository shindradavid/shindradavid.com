import path from 'path';

import type { Theme } from '$lib/types';
import { site } from '$lib/site';

export const postDirPath = path.join(process.cwd(), '/content/posts');
export const myWorkDirPath = path.join(process.cwd(), '/content/my-work');
export const workExperienceDirPath = path.join(process.cwd(), '/content/work-experience');
export const siteUrl = site.url;
export const cookieExpirationTime = 60 * 60 * 24 * 14;
export const defaultTheme: Theme = 'dark';
