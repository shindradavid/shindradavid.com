import fs from 'fs-extra';
import path from 'path';

import type { ExperienceFrontmatter, Frontmatter, ProjectFrontmatter } from '$lib/types';

type UnknownRecord = Record<string, unknown>;

function fail(source: string, field: string, reason: string): never {
	throw new Error(`${source}: frontmatter field "${field}" ${reason}`);
}

function requireString(data: UnknownRecord, field: string, source: string) {
	if (typeof data[field] !== 'string' || data[field].trim() === '') {
		fail(source, field, 'must be a non-empty string');
	}
}

function requireStringArray(data: UnknownRecord, field: string, source: string) {
	if (
		!Array.isArray(data[field]) ||
		!(data[field] as unknown[]).every((value) => typeof value === 'string')
	) {
		fail(source, field, 'must be an array of strings');
	}
}

function requireDate(data: UnknownRecord, field: string, source: string) {
	if (data[field] instanceof Date) {
		data[field] = data[field].toISOString().slice(0, 10);
	}
	requireString(data, field, source);
	if (Number.isNaN(Date.parse(data[field] as string))) {
		fail(source, field, 'must be a valid date');
	}
}

function requireImage(data: UnknownRecord, field: string, source: string) {
	requireString(data, field, source);
	const imagePath = data[field] as string;
	if (!imagePath.startsWith('/')) {
		fail(source, field, 'must be a root-relative path');
	}
	if (!fs.existsSync(path.join(process.cwd(), 'static', imagePath))) {
		fail(source, field, `references a missing file (${imagePath})`);
	}
}

function validateOptionalUrl(data: UnknownRecord, field: string, source: string) {
	if (data[field] === undefined) return;
	requireString(data, field, source);

	try {
		const url = new URL(data[field] as string);
		if (!['http:', 'https:'].includes(url.protocol)) {
			fail(source, field, 'must use the http or https protocol');
		}
	} catch {
		fail(source, field, 'must be a valid URL');
	}
}

export function validatePostFrontmatter(
	data: UnknownRecord,
	source: string
): asserts data is UnknownRecord & Frontmatter {
	requireString(data, 'title', source);
	requireString(data, 'description', source);
	requireImage(data, 'thumbnailUrl', source);
	requireDate(data, 'publishedOn', source);
	requireStringArray(data, 'tags', source);
}

export function validateProjectFrontmatter(
	data: UnknownRecord,
	source: string
): asserts data is UnknownRecord & ProjectFrontmatter {
	requireString(data, 'title', source);
	requireString(data, 'description', source);
	requireString(data, 'client', source);
	requireImage(data, 'thumbnailUrl', source);
	requireDate(data, 'publishedOn', source);
	requireStringArray(data, 'technologies', source);
	for (const field of ['liveUrl', 'githubUrl', 'playStoreUrl', 'appStoreUrl']) {
		validateOptionalUrl(data, field, source);
	}
	if (!['software', 'design'].includes(data.category as string)) {
		fail(source, 'category', 'must be "software" or "design"');
	}
	if (typeof data.isPublished !== 'boolean') {
		fail(source, 'isPublished', 'must be a boolean');
	}
}

export function validateExperienceFrontmatter(
	data: UnknownRecord,
	source: string
): asserts data is UnknownRecord & ExperienceFrontmatter {
	if (typeof data.order === 'number') data.order = String(data.order).padStart(2, '0');
	for (const field of ['order', 'duration', 'title', 'company', 'description']) {
		requireString(data, field, source);
	}
	requireStringArray(data, 'technologies', source);
	if (data.images !== undefined && !Array.isArray(data.images)) {
		fail(source, 'images', 'must be an array');
	}
}
