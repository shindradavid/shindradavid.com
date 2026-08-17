<script lang="ts">
	import { Seo } from '$lib/components';
	import ServiceCard from '$lib/components/ServiceCard.svelte';
	import { getWhatsAppUrl, services } from '$lib/site';

	const projectMessage =
		'Hi Shindra, I found your services page and would like to discuss a digital project for my business.';

	const foundations = [
		{
			icon: 'ri-search-eye-line',
			title: 'A clear plan first',
			description:
				'We define the business problem, users, essential features, timeline and success criteria before development.'
		},
		{
			icon: 'ri-layout-4-line',
			title: 'Built around your workflow',
			description:
				'The design and technology follow how your customers and team actually work—not a generic feature list.'
		},
		{
			icon: 'ri-rocket-2-line',
			title: 'Launch and support',
			description:
				'Every project includes testing, deployment, handover and a clear path for maintenance or future improvements.'
		}
	];
</script>

<Seo
	title="Web Development Services & Pricing | Shindra David"
	description="Business websites from UGX 500,000 and custom e-commerce platforms and business systems from UGX 2,000,000 for growing Ugandan SMEs."
/>

<main class="services-page">
	<section class="services-hero container">
		<div>
			<span class="eyebrow">Services</span>
			<h1>Digital products built around how your business works.</h1>
			<p>
				From a focused business website to a custom operations platform, I design and build
				practical software that supports growth without adding unnecessary complexity.
			</p>
			<div class="services-hero__actions">
				<a
					href={getWhatsAppUrl(projectMessage)}
					class="btn primary"
					target="_blank"
					rel="noopener noreferrer"
				>
					<i class="ri-whatsapp-line" aria-hidden="true"></i> Discuss your project
				</a>
				<a href="/my-work" class="btn secondary">See client work</a>
			</div>
		</div>
		<aside aria-label="Working approach">
			<span>What to expect</span>
			<ul>
				<li><i class="ri-check-line" aria-hidden="true"></i> Clear scope and investment</li>
				<li><i class="ri-check-line" aria-hidden="true"></i> Responsive, accessible design</li>
				<li><i class="ri-check-line" aria-hidden="true"></i> Deployment and handover</li>
				<li><i class="ri-check-line" aria-hidden="true"></i> Ongoing support options</li>
			</ul>
		</aside>
	</section>

	<section class="service-options section">
		<div class="container">
			<header class="section-header">
				<span class="eyebrow">Choose a starting point</span>
				<h2>Services for each stage of growth</h2>
				<p>
					Starting prices cover a focused initial scope. Your final quote depends on features,
					integrations, content, and delivery requirements.
				</p>
			</header>

			<div class="service-grid">
				{#each services as service, index (service.slug)}
					<ServiceCard {service} {index} />
				{/each}
			</div>
		</div>
	</section>

	<section class="foundations section container">
		<header class="section-header">
			<span class="eyebrow">Included in every engagement</span>
			<h2>A dependable process, not just a handover</h2>
		</header>
		<div class="foundations__grid">
			{#each foundations as foundation}
				<article>
					<i class={foundation.icon} aria-hidden="true"></i>
					<h3>{foundation.title}</h3>
					<p>{foundation.description}</p>
				</article>
			{/each}
		</div>
	</section>

	<section class="services-cta container">
		<div>
			<span class="eyebrow">Not sure which service fits?</span>
			<h2>Start with the problem you want to solve.</h2>
			<p>Tell me about your business, your current process, and what you want to improve.</p>
		</div>
		<a
			href={getWhatsAppUrl(projectMessage)}
			class="btn primary"
			target="_blank"
			rel="noopener noreferrer"
			>Start on WhatsApp <i class="ri-arrow-right-up-line" aria-hidden="true"></i></a
		>
	</section>
</main>

<style lang="scss">
	@use '../../styles/utils';

	.services-hero {
		display: grid;
		align-items: center;
		gap: var(--spacing-3xl);
		padding-block: clamp(64px, 10vw, 128px);

		@include utils.respond-to('md-screens') {
			grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.6fr);
		}

		> div {
			max-width: 760px;
		}

		h1 {
			font-size: clamp(3.8rem, 7vw, 7.2rem);
			line-height: 1.04;
			letter-spacing: -0.04em;
			color: var(--clr-txt-primary-on-bg-primary);
			margin-bottom: var(--spacing-lg);
		}

		> div > p {
			max-width: 680px;
			font-size: var(--fs-md);
		}

		&__actions {
			display: flex;
			flex-wrap: wrap;
			gap: var(--spacing-sm);
			margin-top: var(--spacing-xl);

			.btn {
				width: auto;
				padding: 14px 20px;
			}
		}

		aside {
			padding: var(--spacing-xl);
			background: var(--clr-bg-secondary);
			border: 1px solid var(--clr-divider-primary-on-bg-secondary);
			border-radius: var(--radius-sm);

			> span {
				display: block;
				font-size: var(--fs-xs);
				font-weight: var(--fw-bold);
				text-transform: uppercase;
				letter-spacing: 0.08em;
				margin-bottom: var(--spacing-lg);
			}

			ul {
				display: grid;
				gap: var(--spacing-md);
			}

			li {
				display: flex;
				gap: var(--spacing-sm);
				list-style: none;
				margin: 0;
				color: var(--clr-txt-primary-on-bg-secondary);

				i {
					color: var(--clr-accent-1);
				}
			}
		}
	}

	.service-options {
		background: var(--clr-bg-secondary);
	}

	.service-grid,
	.foundations__grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
		gap: var(--spacing-lg);
	}

	.foundations__grid article {
		padding: var(--spacing-xl);
		border-top: 2px solid var(--clr-accent-1);
		background: var(--clr-bg-secondary);

		> i {
			display: inline-grid;
			place-items: center;
			width: 48px;
			height: 48px;
			font-size: var(--fs-lg);
			color: var(--clr-accent-1);
			background: var(--clr-bg-primary);
			border-radius: 50%;
			margin-bottom: var(--spacing-xl);
		}

		h3 {
			color: var(--clr-txt-primary-on-bg-secondary);
			margin-bottom: var(--spacing-sm);
		}
	}

	.services-cta {
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
			width: auto;
			padding: 14px 20px;
		}
	}
</style>
