<script lang="ts">
	import { getWhatsAppUrl } from '$lib/site';
	import type { Service } from '$lib/types';

	let { service, index }: { service: Service; index: number } = $props();
</script>

<article class="service-card">
	<span class="service-card__number">{String(index + 1).padStart(2, '0')}</span>
	<h3>{service.title}</h3>
	<p>{service.description}</p>
	<p class="service-card__ideal"><strong>Best for:</strong> {service.idealFor}</p>
	<ul>
		{#each service.deliverables as deliverable}
			<li><i class="ri-check-line" aria-hidden="true"></i><span>{deliverable}</span></li>
		{/each}
	</ul>

	<div class="service-card__footer">
		{#if service.startingPriceUGX}
			<p class="service-card__price">
				<span>Starting at</span>
				<strong>UGX {service.startingPriceUGX.toLocaleString()}</strong>
			</p>
		{/if}
		<a
			href={getWhatsAppUrl(
				`Hi Shindra, I would like to discuss ${service.title.toLowerCase()} for my business.`
			)}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Enquire about {service.title} on WhatsApp"
		>
			Discuss this service <span aria-hidden="true">→</span>
		</a>
	</div>
</article>

<style lang="scss">
	.service-card {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: var(--spacing-xl);
		border: 1px solid var(--clr-divider-primary-on-bg-secondary);
		border-radius: var(--radius-sm);
		background: var(--clr-bg-primary);

		&__number {
			color: var(--clr-accent-1);
			font-weight: var(--fw-bold);
			margin-bottom: var(--spacing-xl);
		}

		h3 {
			font-size: var(--fs-lg);
			color: var(--clr-txt-primary-on-bg-primary);
			margin-bottom: var(--spacing-sm);
		}

		&__ideal {
			font-size: var(--fs-sm);
			margin-block: var(--spacing-lg);
		}

		ul {
			display: grid;
			gap: var(--spacing-sm);
			margin-bottom: var(--spacing-xl);
		}

		li {
			list-style: none;
			margin: 0;
			display: flex;
			align-items: start;
			gap: var(--spacing-sm);
			font-size: var(--fs-sm);

			i {
				color: var(--clr-accent-1);
				line-height: inherit;
			}
		}

		&__footer {
			display: grid;
			gap: var(--spacing-md);
			margin-top: auto;
			padding-top: var(--spacing-lg);
			border-top: 1px solid var(--clr-divider-tertiary-on-bg-primary);

			a {
				width: fit-content;
				font-weight: var(--fw-bold);
				text-underline-offset: 4px;
			}
		}

		&__price {
			display: grid;
			gap: var(--spacing-xs);

			span {
				font-size: var(--fs-xs);
				text-transform: uppercase;
				letter-spacing: 0.08em;
			}

			strong {
				font-size: var(--fs-md);
				color: var(--clr-txt-primary-on-bg-primary);
			}
		}
	}
</style>
