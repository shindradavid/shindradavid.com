<script lang="ts">
	import type { PageData } from './$types';

	import { FeaturedProjectCarousel, MyWorkCard, PostCard, Seo } from '$lib/components';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import { getWhatsAppUrl, services, site } from '$lib/site';

	let { data }: { data: PageData } = $props();
	const { featuredProjects, posts } = data;
	const testimonials = featuredProjects.flatMap((project) =>
		project.testimonial ? [project.testimonial] : []
	);
	const projectMessage =
		'Hi Shindra, I found your portfolio and would like to discuss a mobile app, business system or website for my business.';
</script>

<Seo title={site.title} description={site.description} />

<main>
	<section class="hero container">
		<div class="hero__content">
			<span class="eyebrow">Full-stack developer in Uganda</span>
			<h1>Mobile apps, business systems and websites that help Ugandan SMEs grow.</h1>
			<p>
				I design and build Android and iOS apps, custom operations software and fast business
				websites—from idea to launch and ongoing support.
			</p>
			<div class="hero__actions">
				<a
					href={getWhatsAppUrl(projectMessage)}
					class="btn primary hero__primary"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i class="ri-whatsapp-line" aria-hidden="true"></i>
					Start a project
				</a>
				<a href="#featured-work" class="btn secondary hero__secondary">See client work</a>
			</div>
			<p class="hero__note">
				<span aria-hidden="true">●</span> Available for selected mobile app, software and website projects
			</p>
		</div>

		<FeaturedProjectCarousel projects={featuredProjects} />
	</section>

	<section class="section container" id="featured-work">
		<header class="section-header">
			<span class="eyebrow">Selected work</span>
			<h2>Solutions built around real businesses</h2>
			<p>
				A selection of websites and systems designed to make customer experiences clearer and
				operations easier to manage.
			</p>
		</header>

		<div class="project-grid">
			{#each featuredProjects as project (project.slug)}
				<MyWorkCard {project} />
			{/each}
		</div>
		<a href="/my-work" class="text-link">View all client work <span aria-hidden="true">→</span></a>
	</section>

	<section class="section services">
		<div class="container">
			<header class="section-header">
				<span class="eyebrow">Services</span>
				<h2>Practical digital tools for your next stage of growth</h2>
				<p>
					Every engagement is scoped around the business problem—not a one-size-fits-all template.
				</p>
			</header>

			<div class="service-grid">
				{#each services as service, index (service.slug)}
					<ServiceCard {service} {index} />
				{/each}
			</div>
			<a href="/services" class="text-link"
				>Compare services and pricing <span aria-hidden="true">→</span></a
			>
		</div>
	</section>

	<section class="section container process">
		<header class="section-header">
			<span class="eyebrow">How we work</span>
			<h2>A clear path from idea to launch</h2>
		</header>
		<ol>
			<li>
				<span>01</span>
				<div>
					<h3>Discover</h3>
					<p>We clarify your goals, users, workflows and definition of success.</p>
				</div>
			</li>
			<li>
				<span>02</span>
				<div>
					<h3>Plan</h3>
					<p>You receive a focused scope, timeline and investment before development begins.</p>
				</div>
			</li>
			<li>
				<span>03</span>
				<div>
					<h3>Build</h3>
					<p>I design and develop in clear milestones, with regular opportunities for feedback.</p>
				</div>
			</li>
			<li>
				<span>04</span>
				<div>
					<h3>Launch</h3>
					<p>We test, deploy, train your team and agree on the support you need next.</p>
				</div>
			</li>
		</ol>
	</section>

	{#if testimonials.length > 0}
		<section class="section testimonials">
			<div class="container">
				<header class="section-header">
					<span class="eyebrow">Client feedback</span>
					<h2>What it is like to work together</h2>
				</header>
				<div class="testimonial-grid">
					{#each testimonials as testimonial}
						<figure>
							<blockquote>“{testimonial.quote}”</blockquote>
							<figcaption>
								{testimonial.name}, {testimonial.role
									? `${testimonial.role}, `
									: ''}{testimonial.company}
							</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</section>
	{/if}

	<section class="section container insights">
		<header class="section-header insights__header">
			<div>
				<span class="eyebrow">From the blog</span>
				<h2>Useful notes from building and learning</h2>
			</div>
			<a href="/blog" class="text-link">Read all articles <span aria-hidden="true">→</span></a>
		</header>
		<div class="post-grid">
			{#each posts as post (post.slug)}
				<PostCard {post} />
			{/each}
		</div>
	</section>

	<section class="cta-section container">
		<div>
			<span class="eyebrow">Have a project in mind?</span>
			<h2>Let’s turn it into a useful, dependable product.</h2>
			<p>Tell me what your business needs. I’ll reply with the best next step.</p>
		</div>
		<a
			href={getWhatsAppUrl(projectMessage)}
			class="btn primary"
			target="_blank"
			rel="noopener noreferrer"
			>Chat on WhatsApp <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a
		>
	</section>
</main>

<style lang="scss">
	@use '../styles/utils';

	.hero {
		display: grid;
		align-items: center;
		gap: var(--spacing-3xl);
		min-height: calc(100svh - 96px);
		padding-block: clamp(48px, 8vw, 96px);

		@include utils.respond-to('md-screens') {
			grid-template-columns: minmax(0, 1fr) minmax(360px, 1fr);
		}

		&__content {
			max-width: 760px;
		}

		h1 {
			font-size: clamp(3rem, 5vw, 5rem);
			line-height: 1.03;
			letter-spacing: -0.04em;
			color: var(--clr-txt-primary-on-bg-primary);
			margin-bottom: var(--spacing-lg);
		}

		&__content > p:not(.hero__note) {
			font-size: clamp(var(--fs-base), 2vw, var(--fs-md));
			max-width: 660px;
		}

		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing-sm);
			margin-top: var(--spacing-xl);
		}

		&__primary,
		&__secondary {
			width: auto !important;
			padding: 14px 20px;
		}

		&__note {
			font-size: var(--fs-sm);
			margin-top: var(--spacing-md);

			span {
				color: var(--clr-ok);
			}
		}
	}

	.project-grid,
	.post-grid,
	.service-grid,
	.testimonial-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: var(--spacing-lg);
	}

	.text-link {
		display: inline-block;
		color: var(--clr-txt-primary-on-bg-primary);
		font-weight: var(--fw-bold);
		margin-top: var(--spacing-xl);
		text-underline-offset: 5px;
	}

	.services,
	.testimonials {
		background: var(--clr-bg-secondary);
	}

	.process ol {
		display: grid;
		gap: var(--spacing-md);
		grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
	}

	.process li {
		list-style: none;
		margin: 0;
		padding: var(--spacing-lg);
		border-top: 2px solid var(--clr-accent-1);
		background: var(--clr-bg-secondary);

		> span {
			display: block;
			color: var(--clr-accent-1);
			font-weight: var(--fw-bold);
			margin-bottom: var(--spacing-xl);
		}

		h3 {
			color: var(--clr-txt-primary-on-bg-secondary);
			margin-bottom: var(--spacing-xs);
		}
	}

	.testimonials figure {
		padding: var(--spacing-xl);
		background: var(--clr-bg-primary);
		border-radius: var(--radius-sm);
	}

	.testimonials blockquote {
		font-size: var(--fs-md);
		color: var(--clr-txt-primary-on-bg-primary);
		margin-bottom: var(--spacing-lg);
	}

	.insights__header {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		justify-content: space-between;
		gap: var(--spacing-lg);
		max-width: none;

		.text-link {
			margin-top: 0;
		}
	}

	.cta-section {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: var(--spacing-xl);
		padding: clamp(32px, 6vw, 72px);
		margin-bottom: clamp(64px, 9vw, 112px);
		background: var(--clr-bg-secondary);
		border: 1px solid var(--clr-divider-primary-on-bg-secondary);
		border-radius: var(--radius-base);

		> div {
			max-width: 700px;
		}

		h2 {
			font-size: clamp(var(--fs-xl), 4vw, var(--fs-2xl));
			line-height: 1.15;
			color: var(--clr-txt-primary-on-bg-secondary);
			margin-bottom: var(--spacing-sm);
		}

		.btn {
			padding: 14px 20px;
		}
	}
</style>
