<script lang="ts">
	import type { PageData } from './$types';
	import { Seo } from '$lib/components';
	import { site } from '$lib/site';

	let { data }: { data: PageData } = $props();
	const { html, frontmatter } = data;
	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'CreativeWork',
		name: frontmatter.title,
		description: frontmatter.description,
		image: new URL(frontmatter.thumbnailUrl, site.url).toString(),
		creator: { '@type': 'Person', name: site.name, url: site.url },
		datePublished: frontmatter.publishedOn
	};
</script>

<Seo
	title={`${frontmatter.title} | Shindra David`}
	description={frontmatter.description}
	ogImage={frontmatter.thumbnailUrl}
	ogImageAlt={`Preview of ${frontmatter.title}`}
	{structuredData}
/>

<main class="case-study container">
	<a class="back-link" href="/my-work"><span aria-hidden="true">←</span> Back to all work</a>

	<header class="case-study__header">
		<span class="eyebrow"
			>{frontmatter.category === 'software' ? 'Software project' : 'Design project'}</span
		>
		<h1>{frontmatter.title}</h1>
		<p>{frontmatter.description}</p>
	</header>

	<figure class="thumbnail">
		<img src={frontmatter.thumbnailUrl} alt="Preview of {frontmatter.title}" fetchpriority="high" />
	</figure>

	<section class="overview" aria-label="Project details">
		<div class="overview__details">
			<div><span>Client</span><strong>{frontmatter.client}</strong></div>
			{#if frontmatter.role}<div><span>My role</span><strong>{frontmatter.role}</strong></div>{/if}
			{#if frontmatter.duration}<div>
					<span>Duration</span><strong>{frontmatter.duration}</strong>
				</div>{/if}
			{#if frontmatter.technologies.length}
				<div>
					<span>Technologies</span>
					<ul>
						{#each frontmatter.technologies as tech}<li>{tech}</li>{/each}
					</ul>
				</div>
			{/if}
		</div>

		{#if frontmatter.liveUrl || frontmatter.githubUrl || frontmatter.playStoreUrl || frontmatter.appStoreUrl}
			<div class="overview__actions">
				{#if frontmatter.liveUrl}
					<a
						href={frontmatter.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn primary"
					>
						Visit live project <i class="ri-arrow-right-up-line" aria-hidden="true"></i>
					</a>
				{/if}
				{#if frontmatter.playStoreUrl}
					<a
						href={frontmatter.playStoreUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn secondary"
					>
						Google Play <i class="ri-google-play-fill" aria-hidden="true"></i>
					</a>
				{/if}
				{#if frontmatter.appStoreUrl}
					<a
						href={frontmatter.appStoreUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn secondary"
					>
						App Store <i class="ri-apple-fill" aria-hidden="true"></i>
					</a>
				{/if}
				{#if frontmatter.githubUrl}
					<a
						href={frontmatter.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="btn secondary"
					>
						View source <i class="ri-github-line" aria-hidden="true"></i>
					</a>
				{/if}
			</div>
		{/if}
	</section>

	{#if frontmatter.outcomes?.length}
		<section class="outcomes" aria-labelledby="outcomes-title">
			<span class="eyebrow">Project outcomes</span>
			<h2 id="outcomes-title">What changed for the client</h2>
			<ul>
				{#each frontmatter.outcomes as outcome}<li>{outcome}</li>{/each}
			</ul>
		</section>
	{/if}

	<article class="content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted repository Markdown -->
		{@html html}
	</article>

	{#if frontmatter.testimonial}
		<figure class="testimonial">
			<blockquote>“{frontmatter.testimonial.quote}”</blockquote>
			<figcaption>
				{frontmatter.testimonial.name}{frontmatter.testimonial.role
					? `, ${frontmatter.testimonial.role}`
					: ''}, {frontmatter.testimonial.company}
			</figcaption>
		</figure>
	{/if}

	{#if frontmatter.gallery?.length}
		<section class="gallery" aria-labelledby="gallery-title">
			<h2 id="gallery-title">Project gallery</h2>
			<div>
				{#each frontmatter.gallery as image (image.src)}
					<figure>
						<img
							src={image.src}
							alt={image.caption ?? `Screenshot from ${frontmatter.title}`}
							loading="lazy"
							decoding="async"
						/>
						{#if image.caption}<figcaption>{image.caption}</figcaption>{/if}
					</figure>
				{/each}
			</div>
		</section>
	{/if}
</main>

<style lang="scss">
	.case-study {
		padding-block: var(--spacing-xl) var(--spacing-9xl);
		max-width: 980px;
	}

	.back-link {
		display: inline-block;
		margin-bottom: var(--spacing-3xl);
		text-underline-offset: 4px;
	}

	.case-study__header {
		max-width: 800px;
		margin-inline: auto;
		text-align: center;
		margin-bottom: var(--spacing-3xl);

		h1 {
			font-size: clamp(var(--fs-2xl), 6vw, 6.4rem);
			line-height: 1.08;
			color: var(--clr-txt-primary-on-bg-primary);
			margin-bottom: var(--spacing-md);
		}

		p {
			font-size: var(--fs-md);
		}
	}

	.thumbnail {
		overflow: hidden;
		border-radius: var(--radius-sm);
		background: var(--clr-bg-tertiary);
		aspect-ratio: 2 / 1;

		img {
			display: block;
			width: 100%;
			height: 100%;
			object-fit: contain;
			object-position: center top;
		}
	}

	.overview {
		display: grid;
		gap: var(--spacing-xl);
		padding: var(--spacing-xl);
		margin-block: var(--spacing-xl) var(--spacing-5xl);
		background: var(--clr-bg-secondary);
		border: 1px solid var(--clr-divider-primary-on-bg-secondary);
		border-radius: var(--radius-sm);

		&__details {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
			gap: var(--spacing-lg);

			> div {
				display: grid;
				align-content: start;
				gap: var(--spacing-xs);
			}

			span {
				font-size: var(--fs-xs);
				text-transform: uppercase;
				letter-spacing: 0.08em;
			}

			strong {
				color: var(--clr-txt-primary-on-bg-secondary);
			}

			ul {
				display: flex;
				flex-wrap: wrap;
				gap: var(--spacing-xs);
			}

			li {
				list-style: none;
				margin: 0;
				padding: var(--spacing-xs) var(--spacing-sm);
				background: var(--clr-bg-tertiary);
				border-radius: var(--radius-xxs);
				font-size: var(--fs-xs);
			}
		}

		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing-sm);

			.secondary {
				width: auto;
			}
		}
	}

	.content,
	.outcomes {
		max-width: 740px;
		margin-inline: auto;
	}

	:global(.content .case-study-visual) {
		width: min(980px, calc(100vw - 40px));
		margin: var(--spacing-2xl) 50% var(--spacing-4xl);
		transform: translateX(-50%);
	}

	:global(.content .case-study-visual img) {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid var(--clr-divider-primary-on-bg-secondary);
		border-radius: var(--radius-sm);
		background: var(--clr-bg-secondary);
	}

	:global(.content .case-study-visual figcaption) {
		max-width: 740px;
		margin: var(--spacing-sm) auto 0;
		font-size: var(--fs-sm);
		text-align: center;
	}

	.outcomes {
		padding: var(--spacing-xl);
		margin-bottom: var(--spacing-4xl);
		border-left: 4px solid var(--clr-accent-1);
		background: var(--clr-bg-secondary);

		h2 {
			color: var(--clr-txt-primary-on-bg-secondary);
			margin-bottom: var(--spacing-md);
		}
	}

	.testimonial {
		max-width: 740px;
		margin: var(--spacing-5xl) auto 0;
		padding: var(--spacing-xl);
		background: var(--clr-bg-secondary);
		border-radius: var(--radius-sm);

		blockquote {
			font-size: var(--fs-md);
			color: var(--clr-txt-primary-on-bg-secondary);
			margin-bottom: var(--spacing-md);
		}
	}

	.gallery {
		margin-top: var(--spacing-5xl);

		h2 {
			color: var(--clr-txt-primary-on-bg-primary);
			margin-bottom: var(--spacing-lg);
		}

		> div {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
			gap: var(--spacing-md);
		}

		figure {
			overflow: hidden;
			border-radius: var(--radius-xs);
		}

		figcaption {
			padding: var(--spacing-sm);
			font-size: var(--fs-sm);
			background: var(--clr-bg-secondary);
		}
	}
</style>
