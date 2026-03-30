import path from 'path';

import fs from 'fs-extra';

import grayMatter from 'gray-matter';

import type { Project, ProjectFrontmatter } from '$lib/types';

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

			posts.push({
				slug: markdownFile.slice(0, -3),
				...(data as ProjectFrontmatter)
			});
		}

		posts = posts
			.filter((post) => post.isPublished)
			.sort((firstItem, secondItem) => {
				return new Date(secondItem.publishedOn).getTime() - new Date(firstItem.publishedOn).getTime();
			});

		return posts;
	} catch (err) {
		throw Error('Failed to get projects');
	}
};
