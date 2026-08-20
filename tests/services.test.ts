import { expect, test } from '@playwright/test';

test('presents mobile app development for Android and iOS at the configured price', async ({
	page
}) => {
	await page.goto('/services');

	await expect(page.locator('.service-card h3')).toHaveText([
		'Mobile app development',
		'Custom business systems',
		'Business websites'
	]);
	await expect(page.getByRole('heading', { name: 'E-commerce platforms' })).toHaveCount(0);

	const service = page
		.locator('.service-card')
		.filter({ has: page.getByRole('heading', { name: 'Mobile app development' }) });
	const websiteService = page
		.locator('.service-card')
		.filter({ has: page.getByRole('heading', { name: 'Business websites' }) });

	await expect(service).toBeVisible();
	await expect(service).toContainText('Android and iOS');
	await expect(service.locator('.service-card__price')).toContainText('UGX 2,500,000');
	await expect(websiteService.locator('.service-card__price')).toContainText('UGX 550,000');
	await expect(
		service.getByRole('link', { name: /Enquire about mobile app development/i })
	).toHaveAttribute('href', /^https:\/\/wa\.me\/256782346200\?text=/);
});
