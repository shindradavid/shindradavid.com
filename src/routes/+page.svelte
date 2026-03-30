<script lang="ts">
	import type { PageData } from './$types';

	import { /*PostCard,*/ WorkExperienceCard, MyWorkCard, Seo } from '$lib/components';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { /*posts,*/ projects, workExperience } = data;
</script>

<Seo
	title="Shindra David – Full-Stack Developer & Graphic Designer in Uganda"
	description="I’m Shindra David, a self-taught full-stack developer and graphic designer passionate about building modern web and mobile applications using Svelte, Node.js, and React. Explore my projects and journey in tech."
/>

<main>
	<section class="hero">
		<h1 class="hero__heading">Hi, I’m Shindra David</h1>
		<p class="hero__subheading">
			Am a full-stack developer passionate about crafting modern, scalable web and mobile
			applications. From backend logic to frontend experiences, I love solving problems and turning
			ideas into reality.
		</p>

		<!-- <div class="hero__ctas">
			<a href="/blog" class="btn btn-primary">Read My Blog</a>
		</div> -->
	</section>

	<!-- <section class="posts">
		<header class="posts__header">
			<h2 class="title">Blog</h2>
			<p class="subtitle">Stay updated with my thoughts on software development and tech.</p>
		</header>

		<div class="posts__container">
			{#each posts.slice(0, 3) as post}
				<PostCard {post} />
			{/each}
		</div>

		<a href="/blog" class="posts__cta btn btn-primary">View all</a>
	</section> -->

	<section class="projects">
		<header class="projects__header">
			<h2 class="title">My work</h2>
			<p class="subtitle">Stay updated with my work.</p>
		</header>

		<div class="projects__container">
			{#each projects.slice(0, 3) as project}
				<MyWorkCard {project} />
			{/each}
		</div>

		<a href="/my-work" class="projects__cta btn btn-primary">View all</a>
	</section>

	<section class="work-experience-section">
		<h2>Work Experience</h2>
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
	@use '../styles/utils';

	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-lg) 0;

		@include utils.respond-to('md-screens') {
			width: 40vw;
			margin: 0 auto;
		}

		&__subheading {
			text-align: center;
		}
	}

	.posts {
		display: flex;
		flex-direction: column;
		align-items: center;

		&__header {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: var(--spacing-sm);
			margin-bottom: var(--spacing-xl);

			p {
				text-align: center;
			}

			@include utils.respond-to('md-screens') {
				max-width: 40vw;
			}
		}
		&__container {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
			justify-items: center;
			gap: var(--spacing-lg);
		}

		&__cta {
			margin-top: var(--spacing-md);
			margin-bottom: var(--spacing-lg);
		}
	}

	.projects {
		&__header {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			justify-self: center;
			align-self: center;
			margin-top: var(--spacing-sm);
			margin-bottom: var(--spacing-xl);

			p {
				text-align: center;
			}

			@include utils.respond-to('md-screens') {
				max-width: 40vw;
			}
		}

		&__container {
			display: grid;
			gap: var(--spacing-lg);
			grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		}

		&__cta {
			display: flex;
			justify-self: center;
			align-self: center;
			margin-top: var(--spacing-md);
			margin-bottom: var(--spacing-lg);
		}
	}

	.work-experience-section {
		padding-top: var(--spacing-9xl);
		padding-bottom: var(--spacing-9xl);
		background-color: var(--clr-bg-primary);
		color: var(--clr-txt-primary-on-bg-primary);

		h2 {
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
