import path from 'path';

import fs from 'fs-extra';

import grayMatter from 'gray-matter';

import type { ExperienceFrontmatter, WorkExperience } from '$lib/types';
import { validateExperienceFrontmatter } from './validateFrontmatter';

export default async () => {
	try {
		const postDirPath = path.join(process.cwd(), '/content/work-experience');
		const markdownFiles = (await fs.readdir(postDirPath)).filter((fileName) => {
			return fileName.endsWith('.md');
		});

		let workExperience: WorkExperience[] = [];

		for (const markdownFile of markdownFiles) {
			const file = await fs.readFile(`${postDirPath}/${markdownFile}`, 'utf-8');

			const { data } = grayMatter(file);
			validateExperienceFrontmatter(data, markdownFile);

			workExperience.push({
				slug: markdownFile.slice(0, -3),
				...(data as ExperienceFrontmatter)
			});
		}

		workExperience = workExperience.sort((firstItem, secondItem) => {
			const orderA = parseInt(firstItem.order, 10);
			const orderB = parseInt(secondItem.order, 10);
			return orderA - orderB;
		});

		return workExperience;
	} catch (err) {
		throw new Error(
			`Failed to get work experience: ${err instanceof Error ? err.message : String(err)}`
		);
	}
};
