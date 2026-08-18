import { expect, test } from '@playwright/test';

test('homepage presents the client offer and conversion path', async ({ page }) => {
	await page.goto('/');

	await expect(
		page.getByRole('heading', {
			level: 1,
			name: 'Websites and business systems that help Ugandan SMEs grow.'
		})
	).toBeVisible();
	await expect(
		page.getByRole('heading', {
			level: 2,
			name: 'Practical digital tools for your next stage of growth'
		})
	).toBeVisible();
	await expect(
		page.getByRole('link', { name: 'Start a project', exact: true }).first()
	).toHaveAttribute('href', /^https:\/\/wa\.me\/256782346200\?text=/);
	await expect(page.getByRole('link', { name: 'Blog' }).first()).toBeVisible();
});

test('featured project carousel supports manual navigation and project links', async ({ page }) => {
	await page.goto('/');

	const carousel = page.getByRole('region', { name: 'Featured projects' });
	await expect(carousel).toBeVisible();
	await expect(
		carousel.getByRole('link', { name: /View Maurice Cakes & Events.*case study/ })
	).toHaveAttribute('href', '/my-work/maurice-cakes-and-events');

	await carousel.getByRole('button', { name: 'Next featured project' }).click();
	await expect(
		carousel.getByRole('link', { name: /View Mr\. P Authentic Autoparts.*case study/ })
	).toBeVisible();

	await carousel.getByRole('button', { name: /Show OHN'S Transportation/ }).click();
	await expect(
		carousel.getByRole('link', { name: /View OHN'S Transportation.*case study/ })
	).toHaveAttribute('href', '/my-work/ohns-transportation-company-website');

	await carousel.getByRole('button', { name: 'Next featured project' }).click();
	await expect(
		carousel.getByRole('link', { name: /View Maurice Cakes & Events.*case study/ })
	).toBeVisible();

	await carousel.getByRole('link', { name: /View Maurice Cakes & Events.*case study/ }).focus();
	await page.keyboard.press('ArrowLeft');
	await expect(
		carousel.getByRole('link', { name: /View OHN'S Transportation.*case study/ })
	).toBeVisible();
});

test('featured project carousel stacks below the hero and supports touch swipes', async ({
	page
}) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');

	const heroContent = page.locator('.hero__content');
	const carousel = page.getByRole('region', { name: 'Featured projects' });
	const viewport = carousel.locator('.featured-carousel__viewport');
	const [heroContentBox, carouselBox, viewportBox] = await Promise.all([
		heroContent.boundingBox(),
		carousel.boundingBox(),
		viewport.boundingBox()
	]);

	expect(heroContentBox).not.toBeNull();
	expect(carouselBox).not.toBeNull();
	expect(viewportBox).not.toBeNull();
	expect(carouselBox!.y).toBeGreaterThan(heroContentBox!.y + heroContentBox!.height);

	await viewport.dispatchEvent('pointerdown', {
		pointerId: 1,
		pointerType: 'touch',
		clientX: viewportBox!.x + viewportBox!.width - 20,
		clientY: viewportBox!.y + viewportBox!.height / 2
	});
	await viewport.dispatchEvent('pointerup', {
		pointerId: 1,
		pointerType: 'touch',
		clientX: viewportBox!.x + 20,
		clientY: viewportBox!.y + viewportBox!.height / 2
	});

	await expect(
		carousel.getByRole('link', { name: /View Mr\. P Authentic Autoparts.*case study/ })
	).toBeVisible();
});

test('portfolio filters update the visible project set', async ({ page }) => {
	await page.goto('/my-work');
	const countBefore = await page.locator('.project-card').count();

	await page.getByRole('button', { name: 'Design' }).click();
	await expect(page.getByText(/Showing \d+ projects/)).toHaveText(/Showing \d+ projects/);
	const countAfter = await page.locator('.project-card').count();

	expect(countBefore).toBeGreaterThan(countAfter);
	expect(countAfter).toBeGreaterThan(0);
});

test('mobile navigation exposes state and supports Escape', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/');

	const menuButton = page.getByRole('button', { name: 'Open navigation menu' });
	await menuButton.click();
	await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
	await expect(page.getByRole('button', { name: 'Close navigation menu' })).toHaveAttribute(
		'aria-expanded',
		'true'
	);

	await page.keyboard.press('Escape');
	await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
});

test('project pages expose project-specific metadata', async ({ page }) => {
	await page.goto('/my-work/maurice-cakes-and-events');

	await expect(page).toHaveTitle(/Maurice Cakes & Events/);
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
		'href',
		'https://shindradavid.com/my-work/maurice-cakes-and-events'
	);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		/maurice-cakes-and-events/
	);
});

test('crawler endpoints include published content', async ({ request }) => {
	const sitemap = await request.get('/sitemap.xml');
	const robots = await request.get('/robots.txt');

	expect(sitemap.ok()).toBeTruthy();
	expect(await sitemap.text()).toContain('/my-work/maurice-cakes-and-events');
	expect(robots.ok()).toBeTruthy();
	expect(await robots.text()).toContain('Sitemap: https://shindradavid.com/sitemap.xml');
});
