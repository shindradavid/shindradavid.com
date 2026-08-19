<script lang="ts">
	import '../styles/global.scss';

	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import { afterNavigate } from '$app/navigation';

	import NavLink from './NavLink.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { detectClickOutside } from '$lib/actions';
	import { setThemeContext } from '$lib/state.svelte';
	import { getWhatsAppUrl } from '$lib/site';

	interface Props {
		data: LayoutData;
		children: Snippet<[]>;
	}

	const { children, data }: Props = $props();
	let openDrawer = $state(false);
	const footerNavigation = [
		{ href: '/', label: 'Home' },
		{ href: '/my-work', label: 'My work' },
		{ href: '/services', label: 'Services' },
		{ href: '/work-experience', label: 'Work experience' },
		{ href: '/about-me', label: 'About me' },
		{ href: '/blog', label: 'Blog' }
	];
	const socialLinks = [
		{ href: 'https://linkedin.com/in/shindradavid', label: 'LinkedIn' },
		{ href: 'https://github.com/shindradavid', label: 'GitHub' },
		{ href: 'https://x.com/shindradavid', label: 'X / Twitter' },
		{ href: 'https://instagram.com/shindra_david', label: 'Instagram' }
	];

	setThemeContext(data.theme);

	afterNavigate(() => {
		openDrawer = false;
	});

	function closeOnEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') openDrawer = false;
	}
</script>

<svelte:head>
	<meta name="theme-color" content="#16181d" />
	<link rel="stylesheet" href="/remixicon/remixicon.css" />
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" title="Shindra David RSS" />
</svelte:head>

<svelte:window onkeydown={closeOnEscape} />

<a class="skip-link" href="#main-content">Skip to content</a>

<header class="header">
	<a href="/" class="header__logo" aria-label="Shindra David, home">
		<img src="/images/avatar-2-icon.webp" alt="" width="48" height="48" decoding="async" />
		<span>Shindra David</span>
	</a>

	<nav class="header__desktop-nav" aria-label="Main navigation">
		<NavLink href="/" name="Home" />
		<NavLink href="/my-work" name="My work" />
		<NavLink href="/services" name="Services" />
		<NavLink href="/work-experience" name="Work experience" />
		<NavLink href="/about-me" name="About me" />
		<NavLink href="/blog" name="Blog" />
	</nav>

	<a
		href={getWhatsAppUrl()}
		class="header__cta btn primary"
		target="_blank"
		rel="noopener noreferrer"
	>
		Start a project
	</a>

	<button
		type="button"
		class="header__burger"
		aria-label={openDrawer ? 'Close navigation menu' : 'Open navigation menu'}
		aria-expanded={openDrawer}
		aria-controls="mobile-navigation"
		data-mobile-navigation-toggle
		onclick={() => (openDrawer = !openDrawer)}
	>
		<i class={openDrawer ? 'ri-close-line' : 'ri-menu-line'} aria-hidden="true"></i>
	</button>
</header>

{#if openDrawer}
	<nav
		id="mobile-navigation"
		class="mobile-nav"
		aria-label="Mobile navigation"
		use:detectClickOutside={{ ignore: '[data-mobile-navigation-toggle]' }}
		onclickOutside={() => (openDrawer = false)}
	>
		<NavLink href="/" name="Home" />
		<NavLink href="/my-work" name="My work" />
		<NavLink href="/services" name="Services" />
		<NavLink href="/work-experience" name="Work experience" />
		<NavLink href="/about-me" name="About me" />
		<NavLink href="/blog" name="Blog" />
		<a
			href={getWhatsAppUrl()}
			class="mobile-nav__cta btn primary"
			target="_blank"
			rel="noopener noreferrer">Start a project</a
		>
		<ThemeSwitcher />
	</nav>
{/if}

<div class="main" id="main-content">
	{@render children()}
</div>

<footer class="footer">
	<div class="footer__shell">
		<section class="footer__cta" aria-labelledby="footer-cta-title">
			<div>
				<p class="footer__availability">
					<span aria-hidden="true"></span> Available for selected projects
				</p>
				<h2 id="footer-cta-title">Ready to improve how your business works online?</h2>
				<p>
					Tell me what you want to build or improve, and I’ll help you identify the right next step.
				</p>
			</div>
			<a
				href={getWhatsAppUrl(
					'Hi Shindra, I found your portfolio and would like to discuss a project for my business.'
				)}
				class="btn primary footer__cta-button"
				target="_blank"
				rel="noopener noreferrer"
			>
				Start a conversation <i class="ri-arrow-right-up-line" aria-hidden="true"></i>
			</a>
		</section>

		<div class="footer__main">
			<div class="footer__brand">
				<a href="/" class="footer__identity" aria-label="Shindra David, home">
					<img src="/images/avatar-2-icon.webp" alt="" width="48" height="48" loading="lazy" />
					<span>Shindra David</span>
				</a>
				<p>Full-stack developer building useful websites and business systems for growing SMEs.</p>
				<p class="footer__location">
					<i class="ri-map-pin-2-line" aria-hidden="true"></i> Kampala, Uganda
				</p>
			</div>

			<nav class="footer__links" aria-label="Footer navigation">
				<p>Explore</p>
				{#each footerNavigation as link}
					<a href={link.href}>{link.label}</a>
				{/each}
			</nav>

			<nav class="footer__links" aria-label="Social links">
				<p>Connect</p>
				<a href="/lets-connect">Contact</a>
				{#each socialLinks as link}
					<a href={link.href} target="_blank" rel="noopener noreferrer">
						{link.label}<i class="ri-arrow-right-up-line" aria-hidden="true"></i>
					</a>
				{/each}
			</nav>
		</div>

		<div class="footer__bottom">
			<p>&copy; {new Date().getFullYear()} Shindra David. All rights reserved.</p>
			<div class="footer__utilities">
				<a href="/rss.xml"><i class="ri-rss-line" aria-hidden="true"></i> RSS</a>
				<div class="footer__theme">
					<span>Theme</span>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	</div>
</footer>

<a
	href={getWhatsAppUrl()}
	class="btn whatsapp-fab"
	target="_blank"
	rel="noopener noreferrer"
	aria-label="Chat with Shindra on WhatsApp"
>
	<i class="ri-whatsapp-fill" aria-hidden="true"></i>
</a>

<style lang="scss">
	@use '../styles/utils';

	.whatsapp-fab {
		position: fixed;
		bottom: var(--spacing-xl);
		right: var(--spacing-md);
		z-index: utils.z('fab');
		width: 56px;
		height: 56px;
		padding: 0;
		margin: 0;
		border-radius: 50%;
		background-color: #25d366;
		color: #ffffff;
		font-size: var(--fs-xl);
		line-height: 1;
		box-shadow: var(--shadow-md);
	}

	.skip-link {
		position: fixed;
		top: var(--spacing-sm);
		left: var(--spacing-sm);
		z-index: utils.z('max');
		padding: var(--spacing-sm) var(--spacing-md);
		background: var(--clr-accent-1);
		color: var(--clr-txt-primary-on-btn-bg-primary);
		transform: translateY(-160%);

		&:focus {
			transform: translateY(0);
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 72px;
		padding: 10px 12px;
		position: fixed;
		z-index: utils.z('header', 'base');
		top: 12px;
		left: 50%;
		transform: translateX(-50%);
		background-color: var(--clr-bg-primary-alpha);
		backdrop-filter: blur(14px);
		width: min(1180px, calc(100% - 24px));
		border-radius: 999px;
		box-shadow: var(--shadow-md);
		border: 1px solid var(--clr-divider-tertiary-on-bg-primary);

		&__logo {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
			text-decoration: none;
			font-weight: var(--fw-bold);
			color: var(--clr-txt-primary-on-bg-primary);

			img {
				border-radius: 50%;
			}

			span {
				display: none;

				@include utils.respond-to('md-screens') {
					display: inline;
				}
			}
		}

		&__desktop-nav,
		&__cta {
			display: none;
		}

		@include utils.respond-to('lg-screens') {
			padding-inline: var(--spacing-md);

			&__desktop-nav {
				display: flex;
				align-items: center;
				gap: var(--spacing-xl);
			}

			&__cta {
				display: inline-flex;
				border-radius: 999px;
			}
		}

		&__burger {
			height: 48px;
			width: 48px;
			border-radius: 50%;
			border: 1px solid var(--clr-divider-tertiary-on-bg-primary);
			display: grid;
			place-items: center;
			font-size: var(--fs-lg);

			@include utils.respond-to('lg-screens') {
				display: none;
			}
		}
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-sm);
		position: fixed;
		z-index: utils.z('header', 'nav');
		top: 92px;
		left: 12px;
		width: calc(100% - 24px);
		max-height: calc(100dvh - 104px);
		overflow-y: auto;
		overscroll-behavior: contain;
		background-color: var(--clr-bg-primary-alpha);
		backdrop-filter: blur(14px);
		padding: var(--spacing-md);
		border-radius: var(--radius-base);
		border: 1px solid var(--clr-divider-tertiary-on-bg-primary);
		box-shadow: var(--shadow-lg);

		// NavLink renders in a child component, so target its anchors globally
		:global(a:not(.mobile-nav__cta)) {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			min-height: 44px;
			padding: var(--spacing-sm) 12px;
			font-size: var(--fs-md);
			text-align: center;
			border-radius: var(--radius-xs);
		}

		&__cta {
			width: 100%;
			min-height: 44px;
			margin: 0;
		}

		:global(.theme-switcher) {
			margin-block: 0;
		}

		@include utils.respond-to('lg-screens') {
			display: none;
		}
	}

	.main {
		padding-top: 96px;
		min-height: 70vh;
	}

	.footer {
		padding: var(--spacing-xl) max(20px, calc((100% - 1180px) / 2)) var(--spacing-lg);
		background: var(--clr-bg-secondary);
		border-top: 1px solid var(--clr-divider-primary-on-bg-secondary);

		&__shell {
			max-width: 1180px;
			margin-inline: auto;
		}

		&__cta {
			display: grid;
			align-items: end;
			gap: var(--spacing-2xl);
			position: relative;
			overflow: hidden;
			padding: clamp(28px, 5vw, 56px);
			background: var(--clr-bg-primary);
			border: 1px solid var(--clr-divider-tertiary-on-bg-primary);
			border-radius: var(--radius-base);
			box-shadow: inset 4px 0 0 var(--clr-accent-1);

			@include utils.respond-to('md-screens') {
				grid-template-columns: minmax(0, 1fr) auto;
			}

			> div {
				max-width: 780px;
			}

			h2 {
				font-size: clamp(var(--fs-xl), 4vw, 4.8rem);
				line-height: 1.1;
				letter-spacing: -0.025em;
				color: var(--clr-txt-primary-on-bg-primary);
				margin-bottom: var(--spacing-sm);
			}
		}

		&__availability {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
			width: fit-content;
			font-size: var(--fs-xs);
			font-weight: var(--fw-bold);
			text-transform: uppercase;
			letter-spacing: 0.08em;
			margin-bottom: var(--spacing-md);

			span {
				width: 8px;
				height: 8px;
				background: var(--clr-ok);
				border-radius: 50%;
				box-shadow: 0 0 0 4px var(--clr-bg-success);
			}
		}

		&__cta-button {
			width: fit-content;
			white-space: nowrap;
			padding: 14px 20px;
		}

		&__main {
			display: grid;
			gap: var(--spacing-2xl);
			padding-block: var(--spacing-3xl);

			@include utils.respond-to('md-screens') {
				grid-template-columns: minmax(300px, 1.8fr) repeat(2, minmax(140px, 0.6fr));
			}
		}

		&__brand {
			max-width: 460px;

			> p:not(.footer__location) {
				margin-block: var(--spacing-md);
			}
		}

		&__identity {
			display: inline-flex;
			align-items: center;
			gap: var(--spacing-sm);
			font-family: var(--ff-headings);
			font-size: var(--fs-md);
			font-weight: var(--fw-bold);
			text-decoration: none;
			color: var(--clr-txt-primary-on-bg-secondary);

			img {
				border-radius: 50%;
			}
		}

		&__location {
			display: flex;
			align-items: center;
			gap: var(--spacing-xs);
			font-size: var(--fs-sm);
		}

		&__links {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: var(--spacing-sm);

			p {
				font-size: var(--fs-xs);
				font-weight: var(--fw-bold);
				text-transform: uppercase;
				letter-spacing: 0.1em;
				color: var(--clr-txt-primary-on-bg-secondary);
				margin-bottom: var(--spacing-sm);
			}

			a {
				display: inline-flex;
				align-items: center;
				gap: var(--spacing-xs);
				text-decoration: none;
				font-size: var(--fs-sm);

				&:hover {
					color: var(--clr-accent-1);
				}

				i {
					font-size: var(--fs-base);
				}
			}
		}

		&__bottom {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			gap: var(--spacing-md) var(--spacing-xl);
			font-size: var(--fs-sm);
			padding-top: var(--spacing-lg);
			border-top: 1px solid var(--clr-divider-primary-on-bg-secondary);
		}

		&__utilities,
		&__theme {
			display: flex;
			align-items: center;
			gap: var(--spacing-md);
		}

		&__utilities > a {
			display: inline-flex;
			align-items: center;
			gap: var(--spacing-xs);
			text-decoration: none;
		}

		&__theme > span {
			font-size: var(--fs-xs);
			font-weight: var(--fw-bold);
			text-transform: uppercase;
			letter-spacing: 0.08em;
		}
	}
</style>
