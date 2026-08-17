<script lang="ts">
	import type { Post } from '$lib/types';

	let { post }: { post: Post } = $props();
</script>

<a href="/blog/{post.slug}">
	<article class="post">
		<div class="aspect-ratio-16x9">
			<img
				class="post__thumbnail"
				src={post.thumbnailUrl}
				alt="Illustration for {post.title}"
				width="1024"
				height="576"
				loading="lazy"
				decoding="async"
			/>
		</div>

		<div class="details">
			<time datetime={post.publishedOn}>
				{new Intl.DateTimeFormat('en-UG', { dateStyle: 'medium' }).format(
					new Date(post.publishedOn)
				)}
			</time>
			<ul class="post__tags">
				{#each post.tags as tag}
					<li class="tag tag-{tag}">{tag}</li>
				{/each}
			</ul>

			<h3 class="post__title">{post.title}</h3>

			<p class="post__description">{post.description}</p>
		</div>
	</article>
</a>

<style lang="scss">
	a {
		text-decoration: none;

		.post {
			background-color: var(--clr-bg-secondary);
			border-radius: var(--radius-base);
			box-shadow: var(--shadow-md);
			transition:
				transform var(--animation-speed-normal) var(--animation-fn-ease-out),
				box-shadow var(--animation-speed-normal) var(--animation-fn-ease-out);

			&:hover {
				transform: translateY(-5px);
				box-shadow: var(--shadow-lg);
			}

			.details {
				padding: var(--spacing-lg);

				time {
					font-size: var(--fs-sm);
					color: var(--clr-txt-tertiary-on-bg-secondary);
				}
			}

			&__thumbnail {
				border-top-left-radius: var(--radius-base);
				border-top-right-radius: var(--radius-base);
			}

			&__tags {
				display: flex;
				align-items: center;
				gap: var(--spacing-xs);
				padding: var(--spacing-sm) 0;

				.tag {
					margin-left: 0;
					list-style-type: none;
					display: flex;
					gap: var(--spacing-xs);
				}
			}

			&__title {
				font-size: var(--fs-lg);
			}

			&__description {
				font-size: var(--fs-base);
			}
		}
	}
</style>
