<script lang="ts">
	import { Seo } from '$lib/components';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { html, frontmatter } = data;
</script>

<Seo
	title={`${frontmatter.title} | Shindra David`}
	description={frontmatter.description}
	ogImage={frontmatter.thumbnailUrl}
	ogImageAlt={`Illustration for ${frontmatter.title}`}
	type="article"
	publishedOn={frontmatter.publishedOn}
/>

<main class="article container">
	<a class="back-link" href="/blog"><span aria-hidden="true">←</span> Back to the blog</a>
	<header>
		<ul class="article__tags" aria-label="Article topics">
			{#each frontmatter.tags as tag}<li>{tag}</li>{/each}
		</ul>
		<h1>{frontmatter.title}</h1>
		<p class="article__date">
			Published {new Intl.DateTimeFormat('en-UG', { dateStyle: 'long' }).format(
				new Date(frontmatter.publishedOn)
			)}
		</p>
	</header>

	<figure class="thumbnail">
		<img
			src={frontmatter.thumbnailUrl}
			alt="Illustration for {frontmatter.title}"
			width="1024"
			height="576"
			fetchpriority="high"
		/>
	</figure>

	<section class="content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted repository Markdown -->
		{@html html}
	</section>
</main>

<style lang="scss">
	@use '../../../styles/utils';
	.article {
		padding-block: var(--spacing-xl) var(--spacing-9xl);
		max-width: 900px;

		.back-link {
			display: inline-block;
			margin-bottom: var(--spacing-3xl);
			text-underline-offset: 4px;
		}

		header {
			text-align: center;
			margin-bottom: var(--spacing-2xl);
		}

		@include utils.respond-to('md-screens') {
			width: min(900px, calc(100% - 40px));
		}

		h1 {
			text-align: center;
			margin-bottom: var(--spacing-md);
			font-size: clamp(var(--fs-2xl), 6vw, 6.4rem);
			line-height: 1.08;
			color: var(--clr-txt-primary-on-bg-primary);
		}

		&__tags {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: var(--spacing-xs);
			margin-bottom: var(--spacing-md);

			li {
				list-style: none;
				margin: 0;
				color: var(--clr-accent-1);
				font-size: var(--fs-sm);
				font-weight: var(--fw-bold);
				text-transform: uppercase;
			}
		}

		&__date {
			font-size: var(--fs-sm);
		}

		.thumbnail {
			aspect-ratio: 16 / 9;
			overflow: hidden;
			border-radius: var(--radius-sm);

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		.content {
			max-width: 740px;
			margin: var(--spacing-3xl) auto 0;
		}
	}
</style>
