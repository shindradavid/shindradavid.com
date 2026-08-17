import type { RequestHandler } from './$types';

import { getBlogPosts, getMyWork, getWorkExperience } from '$lib/server/markdown/utils';
import { siteUrl } from '$lib/config';

export const GET: RequestHandler = async () => {
	const [posts, projects, experiences] = await Promise.all([
		getBlogPosts(),
		getMyWork(),
		getWorkExperience()
	]);
	const pages: Array<{ path: string; lastmod?: string }> = [
		{ path: '/' },
		{ path: '/about-me' },
		{ path: '/my-work' },
		{ path: '/services' },
		{ path: '/work-experience' },
		{ path: '/blog' },
		{ path: '/lets-connect' },
		...projects.map((project) => ({
			path: `/my-work/${project.slug}`,
			lastmod: project.publishedOn
		})),
		...experiences.map((experience) => ({ path: `/work-experience/${experience.slug}` })),
		...posts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.publishedOn }))
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.path}</loc>${page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': `public, max-age=${60 * 60}, s-maxage=${60 * 60 * 24}`
		}
	});
};
