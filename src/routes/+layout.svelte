<script lang="ts">
	import '../styles/global.scss';

	import type { LayoutData } from './$types';

	import NavLink from './NavLink.svelte';

	import { detectClickOutside } from '$lib/actions';

	import { afterNavigate } from '$app/navigation';

	import type { Snippet } from 'svelte';

	import { setThemeContext } from '$lib/state.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	interface Props {
		data: LayoutData;
		children: Snippet<[]>;
	}

	const { children, data }: Props = $props();

	let openDrawer = $state(false);

	const themeState = setThemeContext(data.theme);

	afterNavigate(() => {
		openDrawer = false;
	});
</script>

<svelte:head>
	<meta name="theme-color" content="#16181d" />
	<link rel="stylesheet" href="/remixicon/remixicon.css" />
	<!-- <link rel="manifest" href="manifest.webmanifest" /> -->
	<link rel="alternate" href="/rss.xml" type="application/rss+xml" title="RSS" />
</svelte:head>

<header class="header">
	<a href="/" class="header__logo">
		<img src="/images/logo.png" alt="Shindra David" />
	</a>

	<nav class="header__desktop-nav">
		<NavLink href="/" name="Home" />
		<NavLink href="/about-me" name="About me" />
		<NavLink href="/work-experience" name="Work experience" />
		<NavLink href="/my-work" name="My work" />
		<NavLink href="/blog" name="Blog" />
	</nav>

	<a href="/lets-connect" class="header__cta btn primary w-fit-content">Let's connect</a>

	<button
		class="header__burger"
		aria-label="Open navigation menu"
		onclick={() => (openDrawer = !openDrawer)}
	>
		<i class="ri-menu-line"></i>
	</button>
</header>

<nav
	class="mobile-nav"
	class:open={openDrawer}
	use:detectClickOutside
	onclickOutside={() => (openDrawer = false)}
>
	<NavLink href="/" name="Home" />
	<NavLink href="/about-me" name="About me" />
	<NavLink href="/work-experience" name="Work experience" />
	<NavLink href="/my-work" name="My work" />
	<NavLink href="/blog" name="Blog" />

	<a href="/lets-connect" class="mobile-nav__cta btn primary w-fit-content"> Let's connect </a>

	<ThemeSwitcher />
</nav>

<div class="main">
	{@render children()}
</div>

<footer class="footer">
	<p class="footer__copy">&copy; Shindra David {new Date().getFullYear()}. All rights reserved.</p>
	<p class="footer__credits">
		Built with <span style="color: hsl(0, 74%, 50%);"><i class="ri-heart-fill"></i></span> and
		<span style="color: hsl(12, 98%, 50%);"><i class="ri-svelte-fill"></i></span>
		by
		<a href="http://twitter.com/shindradavid" target="_blank" rel="noopener noreferrer">
			Shindra David
		</a>
	</p>

	<ThemeSwitcher />
</footer>

<style lang="scss">
	@use '../styles/utils';

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: var(--header-height);
		padding: var(--spacing-sm);
		position: fixed;
		z-index: utils.z('header', 'base');
		top: var(--spacing-sm);
		left: 50%;
		transform: translate(-50%, 0);
		background-color: var(--clr-bg-primary-alpha);
		backdrop-filter: blur(4px);
		width: 86vw;
		border-radius: 280px;
		box-shadow: var(--shadow-md);
		border: 1px solid var(--clr-divider-primary-on-bg-primary);

		@include utils.respond-to('lg-screens') {
			width: 72vw;
		}

		&__logo {
			img {
				height: 48px;
				width: 48px;
				border-radius: 50%;
			}
		}

		&__desktop-nav {
			display: none;

			&-cta {
				@include utils.respond-to('lg-screens') {
					display: none;
				}
			}

			@include utils.respond-to('lg-screens') {
				display: flex;
				align-items: center;
				gap: var(--spacing-xl);
			}
		}

		&__cta {
			display: none;

			@include utils.respond-to('lg-screens') {
				display: block;
				border-radius: 64px;
				font-weight: var(--fw-bold);
			}
		}

		&__burger {
			height: 48px;
			width: 48px;
			border-radius: 50%;
			border: 1px solid var(--clr-divider-primary-on-bg-primary);
			display: flex;
			align-items: center;
			justify-content: center;

			@include utils.respond-to('lg-screens') {
				display: none;
			}
		}
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-lg);
		position: fixed;
		z-index: utils.z('header', 'nav');
		top: calc(var(--header-height) + var(--spacing-md));
		left: 50%;
		transform: translate(-50%, 0);
		width: 86vw;
		background-color: var(--clr-bg-primary-alpha);
		backdrop-filter: blur(4px);
		padding: var(--spacing-lg) 0;
		border-radius: 28px;
		border: 1px solid var(--clr-divider-primary-on-bg-primary);

		/* Transition effect */
		max-height: 0;
		overflow: hidden;
		opacity: 0;
		transition:
			max-height 0.4s ease-in-out,
			opacity 0.3s ease-in-out;

		@include utils.respond-to('lg-screens') {
			display: none;
		}

		&.open {
			max-height: 480px;
			opacity: 1;
		}
	}

	.main {
		margin-top: calc(var(--header-height) + var(--spacing-lg));
		@include utils.add-section-lr-padding();
	}

	.footer {
		text-align: center;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin: var(--spacing-lg) 0 0 0;
		padding: var(--spacing-lg) 0;
		border-top: 1px solid var(--clr-divider-secondary-on-bg-primary);
		@include utils.add-section-lr-padding();

		p {
			margin: 0;
		}

		&__copy {
			font-size: var(--fs-sm);
		}

		&__credits {
			font-size: var(--fs-xs);
		}
	}
</style>
