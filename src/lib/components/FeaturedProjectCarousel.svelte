<script lang="ts">
	import type { Project } from '$lib/types';

	interface Props {
		projects: Project[];
	}

	let { projects }: Props = $props();
	let currentIndex = $state(0);
	let pointerStart = $state<{ x: number; y: number } | null>(null);

	$effect(() => {
		if (projects.length <= 1) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		const autoplay = setInterval(() => {
			goToSlide(currentIndex + 1);
		}, 5_000);

		return () => clearInterval(autoplay);
	});

	let currentProject = $derived(projects[currentIndex]);
	let slideAnnouncement = $derived(
		currentProject
			? `Featured project ${currentIndex + 1} of ${projects.length}: ${currentProject.title}`
			: ''
	);

	function goToSlide(index: number) {
		if (projects.length === 0) return;
		currentIndex = (index + projects.length) % projects.length;
	}

	function showPreviousSlide() {
		goToSlide(currentIndex - 1);
	}

	function showNextSlide() {
		goToSlide(currentIndex + 1);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') {
			event.preventDefault();
			showPreviousSlide();
		}

		if (event.key === 'ArrowRight') {
			event.preventDefault();
			showNextSlide();
		}
	}

	function handlePointerDown(event: PointerEvent) {
		if (event.pointerType === 'mouse') return;
		pointerStart = { x: event.clientX, y: event.clientY };
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function handlePointerUp(event: PointerEvent) {
		if (!pointerStart) return;

		const distanceX = event.clientX - pointerStart.x;
		const distanceY = event.clientY - pointerStart.y;
		pointerStart = null;

		if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY)) return;
		if (distanceX < 0) showNextSlide();
		else showPreviousSlide();
	}
</script>

{#if currentProject}
	<section class="featured-carousel" aria-roledescription="carousel" aria-label="Featured projects">
		<p class="sr-only" aria-live="polite" aria-atomic="true">{slideAnnouncement}</p>

		<div class="featured-carousel__frame">
			<div class="featured-carousel__chrome" aria-hidden="true">
				<div class="featured-carousel__window-dots"><span></span><span></span><span></span></div>
				<span class="featured-carousel__slug">{currentProject.slug}</span>
				<span class="featured-carousel__badge">{currentProject.category}</span>
			</div>

			<div
				class="featured-carousel__viewport"
				onpointerdown={handlePointerDown}
				onpointerup={handlePointerUp}
				onpointercancel={() => (pointerStart = null)}
			>
				<div
					class="featured-carousel__track"
					style:transform={`translateX(-${currentIndex * 100}%)`}
				>
					{#each projects as project, index (project.slug)}
						<a
							href="/my-work/{project.slug}"
							class="featured-carousel__slide"
							aria-label="View {project.title} case study"
							aria-hidden={index !== currentIndex}
							tabindex={index === currentIndex ? 0 : -1}
							onkeydown={handleKeydown}
						>
							<img
								src={project.thumbnailUrl}
								alt="Preview of {project.title}"
								loading={index === 0 ? 'eager' : 'lazy'}
								fetchpriority={index === 0 ? 'high' : 'auto'}
								decoding="async"
							/>
						</a>
					{/each}
				</div>
			</div>

			<div class="featured-carousel__footer">
				<div class="featured-carousel__project">
					<p>
						{String(currentIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
						· {currentProject.category === 'software' ? 'Software' : 'Design'}
					</p>
					<a href="/my-work/{currentProject.slug}" onkeydown={handleKeydown}
						>{currentProject.title}</a
					>
				</div>

				{#if projects.length > 1}
					<div class="featured-carousel__navigation">
						<button
							type="button"
							aria-label="Previous featured project"
							onclick={showPreviousSlide}
							onkeydown={handleKeydown}
						>
							<i class="ri-arrow-left-line" aria-hidden="true"></i>
						</button>

						<div class="featured-carousel__dots" role="group" aria-label="Choose featured project">
							{#each projects as project, index (project.slug)}
								<button
									type="button"
									class:active={index === currentIndex}
									aria-label="Show {project.title}"
									aria-current={index === currentIndex ? 'true' : undefined}
									onclick={() => goToSlide(index)}
									onkeydown={handleKeydown}
								></button>
							{/each}
						</div>

						<button
							type="button"
							aria-label="Next featured project"
							onclick={showNextSlide}
							onkeydown={handleKeydown}
						>
							<i class="ri-arrow-right-line" aria-hidden="true"></i>
						</button>
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}

<style lang="scss">
	.featured-carousel {
		width: min(100%, 580px);
		min-width: 0;
		justify-self: center;

		&__frame {
			overflow: hidden;
			background: var(--clr-bg-secondary);
			border: 1px solid var(--clr-divider-primary-on-bg-secondary);
			border-radius: var(--radius-sm);
			box-shadow: var(--shadow-2xl);
		}

		&__chrome {
			display: grid;
			grid-template-columns: auto minmax(0, 1fr) auto;
			align-items: center;
			gap: var(--spacing-sm);
			padding: 12px var(--spacing-md);
			background: var(--clr-bg-tertiary);
			border-bottom: 1px solid var(--clr-divider-primary-on-bg-secondary);
		}

		&__window-dots {
			display: flex;
			gap: 5px;

			span {
				width: 7px;
				height: 7px;
				background: var(--clr-divider-secondary-on-bg-secondary);
				border-radius: 50%;
			}

			span:first-child {
				background: var(--clr-accent-1);
			}
		}

		&__slug,
		&__badge,
		&__project p {
			font-family: monospace;
			font-size: 1.1rem;
			letter-spacing: 0.08em;
			text-transform: uppercase;
		}

		&__slug {
			overflow: hidden;
			color: var(--clr-txt-tertiary-on-bg-tertiary);
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&__badge {
			padding: 4px 7px;
			color: var(--clr-txt-primary-on-btn-bg-primary);
			background: var(--clr-accent-1);
			border-radius: var(--radius-xxs);
		}

		&__viewport {
			overflow: hidden;
			margin: 14px;
			background: var(--clr-bg-primary);
			border-radius: var(--radius-xs);
			touch-action: pan-y;
		}

		&__track {
			display: flex;
			transition: transform var(--animation-speed-normal) var(--animation-fn-ease-in-out);
		}

		&__slide {
			flex: 0 0 100%;
			aspect-ratio: 2 / 1;
			overflow: hidden;
			background: var(--clr-bg-tertiary);

			&:focus-visible {
				outline: 3px solid var(--clr-accent-1);
				outline-offset: -4px;
			}

			img {
				display: block;
				width: 100%;
				height: 100%;
				object-fit: contain;
				object-position: center top;
			}
		}

		&__footer {
			display: flex;
			align-items: end;
			justify-content: space-between;
			gap: var(--spacing-md);
			padding: 2px var(--spacing-md) var(--spacing-md);
		}

		&__project {
			min-width: 0;

			p {
				margin-bottom: 5px;
				color: var(--clr-accent-1);
			}

			a {
				display: -webkit-box;
				overflow: hidden;
				color: var(--clr-txt-primary-on-bg-secondary);
				font-size: clamp(var(--fs-base), 2.2vw, var(--fs-md));
				font-weight: var(--fw-bold);
				line-height: 1.2;
				text-decoration: none;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				line-clamp: 2;

				&:hover {
					text-decoration: underline;
					text-underline-offset: 4px;
				}
			}
		}

		&__navigation,
		&__dots {
			display: flex;
			align-items: center;
		}

		&__navigation {
			flex-shrink: 0;
			gap: var(--spacing-sm);

			> button {
				display: inline-grid;
				width: 34px;
				height: 34px;
				padding: 0;
				place-items: center;
				color: var(--clr-txt-primary-on-bg-secondary);
				background: transparent;
				border: 1px solid var(--clr-divider-primary-on-bg-secondary);
				border-radius: 50%;
				cursor: pointer;

				&:hover,
				&:focus-visible {
					color: var(--clr-txt-primary-on-btn-bg-primary);
					background: var(--clr-accent-1);
					border-color: var(--clr-accent-1);
				}
			}
		}

		&__dots {
			gap: 6px;

			button {
				width: 8px;
				height: 8px;
				padding: 0;
				background: var(--clr-divider-secondary-on-bg-secondary);
				border: 0;
				border-radius: 999px;
				cursor: pointer;
				transition:
					width var(--animation-speed-fast) var(--animation-fn-ease-out),
					background-color var(--animation-speed-fast) var(--animation-fn-ease-out);

				&.active {
					width: 24px;
					background: var(--clr-accent-1);
				}

				&:focus-visible {
					outline: 2px solid var(--clr-accent-1);
					outline-offset: 3px;
				}
			}
		}
	}

	@media (max-width: 520px) {
		.featured-carousel {
			&__chrome {
				padding-inline: 12px;
			}

			&__footer {
				align-items: flex-start;
				flex-direction: column;
			}

			&__navigation {
				align-self: stretch;
				justify-content: space-between;
				width: 100%;
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.featured-carousel__track,
		.featured-carousel__dots button {
			transition: none;
		}
	}
</style>
