<script lang="ts">
	import { Seo } from '$lib/components';
	import { getWhatsAppUrl } from '$lib/site';

	const socialLinks = [
		{
			icon: 'ri-linkedin-box-fill',
			label: 'LinkedIn',
			value: 'shindradavid',
			url: 'https://linkedin.com/in/shindradavid'
		},
		{
			icon: 'ri-twitter-x-fill',
			label: 'X',
			value: '@shindradavid',
			url: 'https://x.com/shindradavid'
		},
		{
			icon: 'ri-instagram-fill',
			label: 'Instagram',
			value: '@shindra_david',
			url: 'https://instagram.com/shindra_david'
		},
		{
			icon: 'ri-github-fill',
			label: 'GitHub',
			value: 'shindradavid',
			url: 'https://github.com/shindradavid'
		}
	];
</script>

<Seo
	title="Let's Connect | Shindra David"
	description="Have a project idea or collaboration in mind? Get in touch with me for web development, mobile app design, or digital solutions. Let’s build something impactful together."
/>

<main>
	<section class="connect-page">
		<div class="contact-card">
			<span class="eyebrow">Let’s work together</span>
			<h1>Tell me what your business needs next.</h1>
			<p>
				Share your goal, current challenge and ideal timeline. I’ll reply with useful questions and
				the best next step.
			</p>

			<a
				class="whatsapp-cta btn primary"
				href={getWhatsAppUrl(
					'Hi Shindra, I found your portfolio and would like to discuss a project for my business.'
				)}
				target="_blank"
				rel="noopener noreferrer"
			>
				<i class="ri-whatsapp-line" aria-hidden="true"></i> Start on WhatsApp
			</a>

			<h2>Or find me elsewhere</h2>

			<div class="social-grid">
				{#each socialLinks as { icon, label, value, url }}
					<a class="social-card" href={url} target="_blank" rel="noopener noreferrer">
						<i class={icon}></i>
						<div class="text">
							<span class="label">{label}</span>
							<span class="value">{value}</span>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>
</main>

<style lang="scss">
	@use '../../styles/utils';

	.connect-page {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--spacing-sm);
		background-color: var(--clr-bg-primary);
		color: var(--clr-txt-primary-on-bg-primary);
		min-height: 80vh;

		.contact-card {
			background: var(--clr-bg-secondary, #1e1e1e);
			padding: var(--spacing-lg);
			border-radius: var(--radius-lg, 12px);
			box-shadow: 0 4px 12px var(--clr-shadow, rgba(0, 0, 0, 0.2));
			width: 100%;
			max-width: 768px;
			text-align: center;

			.whatsapp-cta {
				padding: 14px 20px;
				margin-bottom: var(--spacing-2xl);
			}

			h2 {
				font-size: var(--fs-md);
				margin-bottom: var(--spacing-md);
				color: var(--clr-txt-primary-on-bg-secondary);
			}

			h1 {
				margin-bottom: var(--spacing-lg);
				color: var(--clr-accent-1);
			}

			p {
				margin-bottom: var(--spacing-xl);
				color: var(--clr-txt-secondary-on-bg-primary);
			}

			.social-grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
				gap: var(--spacing-lg);

				.social-card {
					display: flex;
					align-items: center;
					gap: var(--spacing-md);
					background-color: var(--clr-bg-primary);
					border: 1px solid var(--clr-outline-secondary-on-bg-primary);
					padding: var(--spacing-md);
					border-radius: var(--radius-md);
					text-decoration: none;
					transition:
						background-color 0.3s,
						border-color 0.3s;

					&:hover {
						border-color: var(--clr-accent-1);
						transform: translateY(-5px);
					}

					i {
						font-size: var(--fs-3xl);
						color: var(--clr-accent-1);
					}

					.text {
						display: flex;
						flex-direction: column;
						align-items: flex-start;

						.label {
							font-weight: bold;
							color: var(--clr-txt-primary-on-bg-primary);
						}

						.value {
							font-size: var(--fs-base);
							color: var(--clr-txt-secondary-on-bg-primary);
						}
					}
				}
			}
		}
	}
</style>
