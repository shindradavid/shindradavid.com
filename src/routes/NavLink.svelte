<script lang="ts">
	import { page } from '$app/state';
	import { isPathActive } from '$lib/utils/navigation';

	interface Props {
		href: string;
		name: string;
	}

	let { href, name }: Props = $props();
	const active = $derived(isPathActive(page.url.pathname, href));
</script>

<a {href} aria-current={active ? 'page' : undefined} class:active>{name}</a>

<style lang="scss">
	a {
		text-decoration: none;
		font-size: var(--fs-sm);
		font-weight: var(--fw-bold);
		color: var(--clr-txt-secondary-on-bg-primary);
		transition: color var(--animation-speed-fast) ease;

		&:hover {
			color: var(--clr-txt-primary-on-bg-primary);
		}

		&.active {
			color: var(--clr-accent-1);
		}
	}
</style>
