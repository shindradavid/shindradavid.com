import { expect, test } from '@playwright/test';

test('work experience details keep mobile content inside the page gutters', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 });
	await page.goto('/work-experience/freelance');

	const detail = page.locator('.work-experience-detail');
	await expect(detail).toBeVisible();

	const box = await detail.boundingBox();
	expect(box).not.toBeNull();
	expect(box!.x).toBeGreaterThanOrEqual(20);
	expect(390 - (box!.x + box!.width)).toBeGreaterThanOrEqual(20);
	expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});
