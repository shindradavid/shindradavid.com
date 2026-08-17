<script lang="ts">
	import { Seo } from '$lib/components';
	import MyWorkCard from '$lib/components/MyWorkCard.svelte';

	import type { PageData } from './$types';
	import { getProjectServiceTypes } from '$lib/utils/projects';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { projects } = data;

	type Filter = 'all' | 'web' | 'business-system' | 'design';
	let activeCategory = $state<Filter>('all');

	let filteredProjects = $derived(
		projects.filter((project) => {
			if (activeCategory === 'all') {
				return true;
			}
			const serviceTypes = getProjectServiceTypes(project);
			if (activeCategory === 'web') {
				return serviceTypes.includes('business-website') || serviceTypes.includes('ecommerce');
			}
			return serviceTypes.includes(activeCategory);
		})
	);
</script>

<Seo
	title="My Work | Shindra David"
	description="Explore my portfolio of web and mobile app projects built with SvelteKit, React, React Native, Node.js, and PostgreSQL. See how I bring ideas to life through clean code and creative design."
/>

<main class="main work-page container">
	<section class="page-header hero-section">
		<h1>My Work</h1>
		<p>
			Explore a selection of my software development projects and design creations. Each project
			reflects my commitment to robust solutions and compelling aesthetics.
		</p>
	</section>

	<section class="filter-section">
		<button
			type="button"
			class="button {activeCategory === 'all' ? 'primary' : 'secondary'}"
			aria-pressed={activeCategory === 'all'}
			onclick={() => (activeCategory = 'all')}
		>
			All
		</button>
		<button
			type="button"
			class="button {activeCategory === 'web' ? 'primary' : 'secondary'}"
			aria-pressed={activeCategory === 'web'}
			onclick={() => (activeCategory = 'web')}
		>
			Websites & E-commerce
		</button>
		<button
			type="button"
			class="button {activeCategory === 'business-system' ? 'primary' : 'secondary'}"
			aria-pressed={activeCategory === 'business-system'}
			onclick={() => (activeCategory = 'business-system')}
		>
			Business Systems
		</button>
		<button
			type="button"
			class="button {activeCategory === 'design' ? 'primary' : 'secondary'}"
			aria-pressed={activeCategory === 'design'}
			onclick={() => (activeCategory = 'design')}
		>
			Design
		</button>
	</section>

	<section class="projects-grid-section">
		<p class="sr-only" aria-live="polite">Showing {filteredProjects.length} projects</p>
		{#each filteredProjects as project (project.slug)}
			<MyWorkCard {project} />
		{/each}

		{#if filteredProjects.length === 0}
			<p class="no-projects-message">
				No projects found for this category. Please select another filter or check back later!
			</p>
		{/if}
	</section>
</main>

<style lang="scss">
	@use '../../styles/utils';

	// Base styling for the entire work page
	.work-page {
		min-height: 100vh; // Ensure page takes at least full viewport height
		background-color: var(--clr-bg-primary); // Use primary background color
		color: var(--clr-txt-primary-on-bg-primary); // Use primary text color
	}

	// Hero section styling
	.hero-section {
		padding-top: var(--spacing-2xl); // Top padding
		padding-bottom: var(--spacing-2xl); // Bottom padding
		text-align: center; // Center align text

		h1 {
			font-size: var(--fs-xl); // Large heading font size
			margin-bottom: var(--spacing-md); // Space below heading
			color: var(--clr-txt-primary-on-bg-primary); // Primary text color for heading
		}

		p {
			font-size: var(--fs-base); // Medium font size for paragraph
			max-width: 700px; // Limit paragraph width for readability
			margin: 0 auto; // Center paragraph horizontally
			color: var(--clr-txt-secondary-on-bg-primary); // Secondary text color for paragraph
		}
	}

	// Filter section styling
	.filter-section {
		display: flex; // Use flexbox for button layout
		justify-content: center; // Center buttons horizontally
		gap: var(--spacing-sm); // Space between buttons
		margin-bottom: var(--spacing-2xl); // Space below filter section
		flex-wrap: wrap; // Allow buttons to wrap on smaller screens

		.button {
			padding: var(--spacing-sm) var(--spacing-md);
			font-size: var(--fs-sm);
			font-weight: var(--fw-bold);
			border-radius: var(--radius-base);
			transition: background-color var(--animation-speed-fast) var(--animation-fn-ease-in-out);

			&.primary {
				background-color: var(--clr-btn-bg-primary);
				color: var(--clr-txt-primary-on-btn-bg-primary);
			}

			&.secondary {
				background-color: var(--clr-bg-secondary);
				color: var(--clr-txt-primary-on-bg-secondary);
			}
		}
	}

	.projects-grid-section {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--spacing-xl);
		padding-bottom: var(--spacing-9xl);

		@include utils.respond-to('md-screens') {
			grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
			gap: var(--spacing-2xl) var(--spacing-xl);
		}

		.no-projects-message {
			grid-column: 1 / -1;
			text-align: center;
			font-size: var(--fs-md);
			color: var(--clr-txt-secondary-on-bg-primary);
			padding: var(--spacing-6xl) 0;
		}
	}
</style>
