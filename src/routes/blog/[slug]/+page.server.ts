import type { PageServerLoad, EntryGenerator } from './$types';

import fs from 'fs-extra';

import { parseMarkdown } from '$lib/server/markdown/utils';

import { getBlogPosts } from '$lib/server/markdown/utils';

import { postDirPath } from '$lib/server/markdown/paths';
import type { Frontmatter } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const { slug } = params;
	const filePath = `${postDirPath}/${slug}.md`;
	if (!(await fs.pathExists(filePath))) error(404, 'Post not found');
	const markdown = await fs.readFile(filePath, 'utf-8');
	const { html, frontmatter } = await parseMarkdown<Frontmatter>(markdown);

	return { html, frontmatter };
}) satisfies PageServerLoad;

export const entries = (async () => {
	const posts = await getBlogPosts();
	const slugs = posts.map((post) => ({ slug: post.slug }));
	return slugs;
}) satisfies EntryGenerator;
