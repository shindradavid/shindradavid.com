<script lang="ts">
	import { getThemeState } from '$lib/state.svelte';

	const themeState = getThemeState();
</script>

<div class="theme-switcher">
	<button
		type="button"
		aria-label="Switch to system theme"
		aria-pressed={themeState.theme === 'system'}
		class="switch-option {themeState.theme === 'system' ? 'active' : ''}"
		onclick={() => (themeState.theme = 'system')}
	>
		<i class="ri-computer-line"></i>
	</button>

	<button
		type="button"
		aria-label="Switch to light theme"
		aria-pressed={themeState.theme === 'light'}
		class="switch-option {themeState.theme === 'light' ? 'active' : ''}"
		onclick={() => (themeState.theme = 'light')}
	>
		<i class="ri-sun-line"></i>
	</button>

	<button
		type="button"
		aria-label="Switch to dark theme"
		aria-pressed={themeState.theme === 'dark'}
		class="switch-option {themeState.theme === 'dark' ? 'active' : ''}"
		onclick={() => (themeState.theme = 'dark')}
	>
		<i class="ri-moon-line"></i>
	</button>
</div>

<style lang="scss">
	.theme-switcher {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacing-sm);
		background: var(--clr-bg-primary);
		border: 1px solid var(--clr-divider-primary-on-bg-primary);
		border-radius: 56px;
		padding: 4px;
		width: fit-content;
		margin: var(--spacing-sm) 0;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.switch-option {
		flex: 1;
		text-align: center;
		padding: 14px;
		font-size: var(--fs-md);
		cursor: pointer;
		transition:
			background 0.3s,
			color 0.3s;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 1;
	}

	.active {
		background: var(--clr-accent);
		color: white;
	}
</style>
