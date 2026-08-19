<script lang="ts">
	import type { PageData } from './$types';

	import { PostCard, Seo } from '$lib/components';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const { posts } = data;
</script>

<Seo
	title="Blog | Shindra David"
	description="Read articles, tutorials, and insights on web development, mobile apps, JavaScript frameworks, and my personal journey as a self-taught developer in Uganda."
/>

<main class="main container">
	<header class="page-header">
		<h1>Blog</h1>
		<p>
			Join me as I explore new technologies, tackle coding challenges, and share my experiences in
			the world of software development.
		</p>
	</header>

	<section class="posts">
		<div class="posts__container">
			{#each posts as post}
				<PostCard {post} />
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	@use '../../styles/utils';
	.main {
		@include utils.respond-to('md-screens') {
			width: 75vw;
			margin: 0 auto;
		}

		.page-header {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: var(--spacing-lg) 0;

			@include utils.respond-to('md-screens') {
				width: 50vw;
				margin: 0 auto;
			}

			p {
				text-align: center;
			}
		}

		.posts {
			&__container {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
				gap: var(--spacing-lg);
			}
		}
	}
</style>
