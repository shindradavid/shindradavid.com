import fs from 'fs-extra';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { getMyWork } from '$lib/server/markdown/utils';
import parseMarkdown from '$lib/server/markdown/utils/parseMarkdown';
import { getWhatsAppUrl, services, site } from '$lib/site';
import type { ProjectFrontmatter } from '$lib/types';
import { isPathActive } from '$lib/utils/navigation';
import {
	getFeaturedProjects,
	getProjectServiceTypes,
	sortPortfolioProjects
} from '$lib/utils/projects';

describe('portfolio content', () => {
	it('loads the seven ranked featured projects in the requested order', async () => {
		const projects = await getMyWork();
		const featuredProjects = getFeaturedProjects(projects);
		const expectedSlugs = [
			'maurice-cakes-and-events',
			'maurice-school-of-baking-and-decoration',
			'ohns-transportation-company-website',
			'drew-tech-store',
			'mrp-authentic-autoparts',
			'preziosa-african-safaris',
			'coordinates-travel-and-tourism'
		];

		expect(projects.length).toBeGreaterThan(0);
		expect(projects.slice(0, 7).map((project) => project.slug)).toEqual(expectedSlugs);
		expect(featuredProjects.map((project) => project.slug)).toEqual(expectedSlugs);
		expect(featuredProjects.every((project) => project.isFeatured === true)).toBe(true);
		expect(featuredProjects.map((project) => project.featuredRank)).toEqual([1, 2, 3, 4, 5, 6, 7]);
		expect(projects.slice(0, 7).map((project) => project.portfolioRank)).toEqual([
			1, 2, 3, 4, 5, 6, 7
		]);
		expect(
			featuredProjects.every((project) =>
				fs.existsSync(path.join(process.cwd(), 'static', project.thumbnailUrl))
			)
		).toBe(true);
	});

	it('rejects missing featured projects and duplicate featured ranks', async () => {
		const projects = await getMyWork();
		const withoutFeaturedProjects = projects.map((project) => ({
			...project,
			isFeatured: false,
			featuredRank: undefined
		}));

		expect(() => getFeaturedProjects(withoutFeaturedProjects)).toThrow(
			'No featured projects configured'
		);

		const duplicatedRankProjects = projects.map((project) =>
			project.slug === 'mrp-authentic-autoparts' ? { ...project, featuredRank: 1 } : project
		);
		expect(() => getFeaturedProjects(duplicatedRankProjects)).toThrow(
			'Featured project rank 1 is used more than once'
		);
	});

	it('rejects duplicate portfolio ranks and leaves unranked projects after ranked work', async () => {
		const projects = await getMyWork();
		const duplicatedRankProjects = projects.map((project) =>
			project.slug === 'maurice-school-of-baking-and-decoration'
				? { ...project, portfolioRank: 1 }
				: project
		);

		expect(() => sortPortfolioProjects(duplicatedRankProjects)).toThrow(
			'Portfolio project rank 1 is used more than once'
		);
		expect(projects.slice(7).every((project) => project.portfolioRank === undefined)).toBe(true);
	});

	it('infers useful service filters for legacy project content', async () => {
		const projects = await getMyWork();
		const types = projects.flatMap(getProjectServiceTypes);

		expect(types).toContain('business-website');
		expect(types).toContain('business-system');
		expect(types).toContain('design');
	});

	it('publishes the Maurice Cakes commerce and operations case study', async () => {
		const projects = await getMyWork();
		const project = projects.find((item) => item.slug === 'maurice-cakes-and-events');
		const content = await fs.readFile(
			path.join(process.cwd(), 'content/my-work/maurice-cakes-and-events.md'),
			'utf8'
		);
		const { html } = await parseMarkdown<ProjectFrontmatter>(content);

		expect(project).toMatchObject({
			role: 'Full-stack developer',
			duration: 'Ongoing partnership',
			playStoreUrl: 'https://play.google.com/store/apps/details?id=com.kesdigital.mymaurice',
			appStoreUrl: 'https://apps.apple.com/ug/app/my-maurice/id6451052006'
		});
		expect(project?.outcomes).toHaveLength(4);
		expect(content.toLowerCase()).not.toContain(['maurice', 'school'].join(' '));
		expect(html).toContain('<figure class="case-study-visual">');
		expect(html).toContain('/images/my-work/maurice-cakes-and-events/storefront.webp');

		for (const image of [
			'order-workflow.webp',
			'whatsapp-inbox.webp',
			'storefront.webp',
			'daily-finance.webp'
		]) {
			expect(
				fs.existsSync(
					path.join(process.cwd(), 'static/images/my-work/maurice-cakes-and-events', image)
				)
			).toBe(true);
		}
	});
});

describe('site configuration', () => {
	it('marks only the matching navigation route as active', () => {
		expect(isPathActive('/my-work', '/services')).toBe(false);
		expect(isPathActive('/services', '/services')).toBe(true);
		expect(isPathActive('/services/business-websites', '/services')).toBe(true);
		expect(isPathActive('/my-work', '/')).toBe(false);
		expect(isPathActive('/', '/')).toBe(true);
	});

	it('builds an encoded WhatsApp enquiry link', () => {
		const url = new URL(getWhatsAppUrl('A website & shop'));

		expect(url.hostname).toBe('wa.me');
		expect(url.pathname).toBe(`/${site.whatsappNumber}`);
		expect(url.searchParams.get('text')).toBe('A website & shop');
	});

	it('defines the three core SME services in promotional order', () => {
		expect(services.map((service) => service.slug)).toEqual([
			'mobile-app',
			'business-system',
			'business-website'
		]);
		expect(services.map((service) => service.startingPriceUGX)).toEqual([
			2_500_000, 2_000_000, 550_000
		]);
	});
});
