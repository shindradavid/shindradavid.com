<script lang="ts">
	import type { PageData } from './$types';

	import { Seo } from '$lib/components';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { html, frontmatter } = data;
</script>

<Seo title={frontmatter.title} description={frontmatter.description} />

<main class="work-experience-detail container">
	<h1>{frontmatter.title}</h1>

	<section class="overview">
		<div class="overview-details-grid">
			<div class="detail-item">
				<span class="detail-label">Company:</span>
				<span class="detail-value">{frontmatter.company}</span>
			</div>

			{#if frontmatter.duration}
				<div class="detail-item">
					<span class="detail-label">Duration:</span>
					<span class="detail-value">{frontmatter.duration}</span>
				</div>
			{/if}

			<div class="detail-item technologies-item">
				<span class="detail-label">Technologies:</span>
				<div class="tech-tags">
					{#each frontmatter.technologies as tech}
						<span class="tech-tag">{tech}</span>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<section class="content">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted repository Markdown -->
		{@html html}
	</section>

	<div class="image-gallery-section">
		{#if frontmatter.images && frontmatter.images.length > 0}
			<h3 class="gallery-heading">Gallery</h3>
			<div class="image-gallery">
				{#each frontmatter.images as image (image.src)}
					<figure class="gallery-item">
						<img
							src={image.src}
							alt={image.caption || 'Work example'}
							loading="lazy"
							decoding="async"
						/>
						{#if image.caption}
							<figcaption>{image.caption}</figcaption>
						{/if}
					</figure>
				{/each}
			</div>
		{:else}
			<p class="no-images-message">No images available for this project yet.</p>
		{/if}
	</div>
</main>

<style lang="scss">
	@use '../../../styles/utils';
	main {
		@include utils.respond-to('md-screens') {
			width: 50vw;
			margin: 0 auto;
		}

		h1 {
			text-align: center;
			margin-top: var(--spacing-lg);
			margin-bottom: var(--spacing-md);
			margin-left: auto;
			margin-right: auto;

			@include utils.respond-to('md-screens') {
				width: 40vw;
			}
		}

		.overview {
			background-color: var(--clr-bg-secondary);
			border-radius: var(--radius-sm); // Rounded corners
			padding: var(--spacing-xl); // Internal padding
			box-shadow: var(--shadow-md); // Shadow for depth
			margin-bottom: var(--spacing-4xl); // Space below overview section
			margin-top: var(--spacing-lg);

			.overview-details-grid {
				display: grid;
				grid-template-columns: 1fr; // Single column on mobile
				gap: var(--spacing-md); // Gap between detail items
				margin-bottom: var(--spacing-lg); // Space before buttons

				.detail-item {
					display: flex;
					flex-direction: column; // Stack label and value on mobile
					align-items: flex-start; // Align items to the start

					@include utils.respond-to('md-screens') {
						flex-direction: row; // Row layout on desktop
						align-items: center; // Align items vertically in the center
					}
				}

				.detail-label {
					font-weight: var(--fw-semibold); // Bold label
					color: var(--clr-txt-primary-on-bg-secondary); // Primary text color
					margin-bottom: var(--spacing-xxs); // Small space below label on mobile
					@include utils.respond-to('md-screens') {
						margin-right: var(--spacing-xs); // Space between label and value on desktop
						margin-bottom: 0; // Remove bottom margin on desktop
					}
				}

				.detail-value {
					color: var(--clr-txt-secondary-on-bg-secondary); // Secondary text color for value
					font-size: var(--fs-base); // Base font size
				}

				.tech-tags {
					display: flex;
					flex-wrap: wrap;
					gap: var(--spacing-xs); // Space between tags
					margin-top: var(--spacing-xs); // Small space above tags
					@include utils.respond-to('md-screens') {
						margin-top: 0; // Remove top margin on desktop if in row
					}

					.tech-tag {
						background-color: var(--clr-bg-tertiary); // Tertiary background for tech tags
						color: var(--clr-txt-tertiary-on-bg-secondary); // Tertiary text color
						font-size: var(--fs-xs); // Extra small font size
						font-weight: var(--fw-medium);
						padding: var(--spacing-xs) var(--spacing-sm); // Padding
						border-radius: var(--radius-xxs); // Rounded corners
						white-space: nowrap; // Prevent wrapping within a tag
					}
				}
			}
		}

		.content {
			margin-top: var(--spacing-lg);
		}

		.image-gallery-section {
			margin-top: var(--spacing-6xl); // Space above the gallery section
			margin-bottom: var(--spacing-9xl); // Space below the gallery section
			@include utils.add-section-lr-padding; // Apply horizontal padding
		}

		.gallery-heading {
			font-size: var(--fs-xl);
			text-align: center;
			margin-bottom: var(--spacing-lg);
			color: var(--clr-txt-primary-on-bg-primary);
		}

		.image-gallery {
			display: grid;
			// Responsive columns: auto-fit creates as many columns as fit,
			// minmax ensures columns are at least 280px wide (or 100% on small screens)
			grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
			gap: var(--spacing-md); // Gap between grid items (images)
			grid-auto-rows: minmax(
				150px,
				auto
			); // Allows rows to grow based on content, with a minimum height
		}

		.gallery-item {
			position: relative;
			overflow: hidden; // Ensures content respects border-radius
			border-radius: var(--radius-xs); // Rounded corners for each image card
			box-shadow: var(--shadow); // Subtle shadow for depth
			background-color: var(
				--clr-bg-tertiary
			); // Background for items, visible if image is slow to load or not found
			display: flex; // Use flex to center image if it doesn't fill completely
			justify-content: center;
			align-items: center;
			cursor: pointer; // Indicate interactivity

			img {
				width: 100%;
				height: 100%; // Make image fill the container
				object-fit: cover; // Crop image to fit without distorting aspect ratio
				display: block; // Remove extra space below image
				transition: transform var(--animation-speed-normal) var(--animation-fn-ease-in-out);
			}

			&:hover img {
				transform: scale(1.05); // Slight zoom effect on hover
			}

			figcaption {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				padding: var(--spacing-sm);
				// Gradient overlay for better text readability on images
				background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
				color: var(--clr-txt-primary-on-bg-primary); // Text color for caption
				font-size: var(--fs-xs);
				text-align: center;
				opacity: 0; // Hidden by default
				transition: opacity var(--animation-speed-fast) var(--animation-fn-ease-in-out);
				pointer-events: none; // Allows clicks to pass through to the image/link if desired
			}

			&:hover figcaption {
				opacity: 1; // Show caption on hover
			}
		}

		.no-images-message {
			text-align: center;
			font-size: var(--fs-md);
			color: var(--clr-txt-secondary-on-bg-primary);
			padding: var(--spacing-6xl) 0;
		}
	}
</style>
