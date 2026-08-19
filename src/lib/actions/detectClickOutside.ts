import type { Action } from 'svelte/action';

interface ClickOutsideOptions {
	ignore?: string;
}

const detectClickOutside: Action<HTMLElement, ClickOutsideOptions | undefined> = (
	node,
	options
) => {
	let ignoreSelector = options?.ignore;

	const handleClick = (event: MouseEvent) => {
		const eventTarget = event.target as HTMLElement | null;

		if (eventTarget && ignoreSelector && eventTarget.closest(ignoreSelector)) return;

		if (eventTarget && !node.contains(eventTarget)) {
			node.dispatchEvent(new CustomEvent('clickOutside'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		update(updatedOptions) {
			ignoreSelector = updatedOptions?.ignore;
		},
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export default detectClickOutside;
