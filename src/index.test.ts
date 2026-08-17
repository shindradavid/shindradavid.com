import fs from 'fs-extra';
import path from 'path';
import { describe, expect, it } from 'vitest';

import { getMyWork } from '$lib/server/markdown/utils';
import parseMarkdown from '$lib/server/markdown/utils/parseMarkdown';
import { getWhatsAppUrl, services, site } from '$lib/site';
import type { ProjectFrontmatter } from '$lib/types';
import { isPathActive } from '$lib/utils/navigation';
import { getProjectServiceTypes } from '$lib/utils/projects';

describe('portfolio content', () => {
	it('loads published projects with valid images and three featured projects', async () => {
		const projects = await getMyWork();
		const featuredProjects = projects.filter((project) => project.featuredRank !== undefined);

		expect(projects.length).toBeGreaterThan(0);
		expect(featuredProjects).toHaveLength(3);
		expect(new Set(featuredProjects.map((project) => project.featuredRank)).size).toBe(3);
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

	it('defines the three core SME services', () => {
		expect(services.map((service) => service.slug)).toEqual([
			'business-website',
			'ecommerce',
			'business-system'
		]);
		expect(services.map((service) => service.startingPriceUGX)).toEqual([
			500_000, 2_000_000, 2_000_000
		]);
	});
});
