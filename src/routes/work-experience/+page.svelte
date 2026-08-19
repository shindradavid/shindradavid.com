<script lang="ts">
	import { Seo, WorkExperienceCard } from '$lib/components';

	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { workExperience } = data;
</script>

<Seo
	title="Work Experience | Shindra David"
	description="Discover my journey as a full-stack developer — from learning HTML and Python to mastering SvelteKit, NestJS, and React Native. See how my experience shapes the work I do today."
/>

<main class="main work-page container">
	<section class="work-experience-section">
		<h1>Work Experience</h1>
		<p class="intro-paragraph">
			My journey in software development and design has been shaped by diverse roles, from
			freelancing to leading IT initiatives at Maurice Group.
		</p>

		<div class="experience-list">
			{#each workExperience as experience (experience.order)}
				<WorkExperienceCard {experience} />
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	@use 'sass:color';
	@use '../../styles/utils';

	.work-experience-section {
		padding-top: var(--spacing-9xl);
		padding-bottom: var(--spacing-9xl);
		background-color: var(--clr-bg-primary);
		color: var(--clr-txt-primary-on-bg-primary);

		h1 {
			text-align: center;
			font-size: var(--fs-2xl);
			margin-bottom: var(--spacing-md);
			color: var(--clr-txt-primary-on-bg-primary);
		}

		.intro-paragraph {
			text-align: center;
			font-size: var(--fs-md);
			max-width: 700px;
			margin: 0 auto var(--spacing-6xl) auto;
			color: var(--clr-txt-secondary-on-bg-primary);
		}
	}

	.experience-list {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3xl);
		max-width: 900px;
		margin: 0 auto;
	}
</style>
