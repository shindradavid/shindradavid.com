import path from 'path';

import fs from 'fs-extra';

import grayMatter from 'gray-matter';

import type { Project, ProjectFrontmatter } from '$lib/types';
import { sortPortfolioProjects } from '$lib/utils/projects';
import { validateProjectFrontmatter } from './validateFrontmatter';

export default async () => {
	try {
		const postDirPath = path.join(process.cwd(), '/content/my-work');
		const markdownFiles = (await fs.readdir(postDirPath)).filter((fileName) => {
			return fileName.endsWith('.md');
		});

		let posts: Project[] = [];

		for (const markdownFile of markdownFiles) {
			const file = await fs.readFile(`${postDirPath}/${markdownFile}`, 'utf-8');

			const { data } = grayMatter(file);
			validateProjectFrontmatter(data, markdownFile);

			posts.push({
				slug: markdownFile.slice(0, -3),
				...(data as ProjectFrontmatter)
			});
		}

		posts = sortPortfolioProjects(posts.filter((post) => post.isPublished));

		return posts;
	} catch (err) {
		throw new Error(`Failed to get projects: ${err instanceof Error ? err.message : String(err)}`);
	}
};
