import { expect, test } from '@playwright/test';

const iconDimensions = [
	['/favicon-16x16.png?v=2', 16],
	['/favicon-32x32.png?v=2', 32],
	['/favicon.png?v=2', 128],
	['/apple-touch-icon.png?v=2', 180],
	['/android-chrome-192x192.png?v=2', 192],
	['/android-chrome-512x512.png?v=2', 512],
	['/images/avatar-2-icon.webp', 720],
	['/images/avatar-2-icon.png', 720],
	['/images/avatar-2.png', 1254]
] as const;

test('uses the refreshed avatar for site identity and default metadata', async ({ page }) => {
	await page.goto('/');

	await expect(page.locator('img[src="/images/avatar-2-icon.webp"]')).toHaveCount(2);
	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		'https://shindradavid.com/images/avatar-2.png'
	);
	await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
		'content',
		'https://shindradavid.com/images/avatar-2.png'
	);
	await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
		'content',
		'Illustrated portrait of Shindra David coding on a laptop'
	);
	const structuredData = await page
		.locator('script[type="application/ld+json"]')
		.evaluate((script) => script.textContent);
	expect(structuredData).toContain('https://shindradavid.com/images/avatar-2.png');
});

test('serves square favicon and application icon variants', async ({ page, request }) => {
	await page.goto('/');

	await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
		'href',
		/\/apple-touch-icon\.png\?v=2$/
	);
	await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
		'href',
		/\/site\.webmanifest\?v=2$/
	);

	const dimensions = await page.evaluate(async (assets) => {
		return Promise.all(
			assets.map(
				([src]) =>
					new Promise<[number, number]>((resolve, reject) => {
						const image = new Image();
						image.onload = () => resolve([image.naturalWidth, image.naturalHeight]);
						image.onerror = () => reject(new Error(`Could not load ${src}`));
						image.src = src;
					})
			)
		);
	}, iconDimensions);

	for (const [index, [, expectedSize]] of iconDimensions.entries()) {
		expect(dimensions[index]).toEqual([expectedSize, expectedSize]);
	}

	const favicon = await request.get('/favicon.ico?v=2');
	expect(favicon.ok()).toBeTruthy();

	const manifestResponse = await request.get('/site.webmanifest?v=2');
	expect(manifestResponse.ok()).toBeTruthy();
	const manifest = await manifestResponse.json();
	expect(manifest.icons).toEqual([
		{
			src: '/android-chrome-192x192.png?v=2',
			sizes: '192x192',
			type: 'image/png'
		},
		{
			src: '/android-chrome-512x512.png?v=2',
			sizes: '512x512',
			type: 'image/png'
		}
	]);
});

test('project metadata retains its project-specific image', async ({ page }) => {
	await page.goto('/my-work/maurice-cakes-and-events');

	await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
		'content',
		/maurice-cakes-and-events/
	);
});
