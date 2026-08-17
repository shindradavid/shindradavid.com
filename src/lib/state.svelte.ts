import type { Theme } from '$lib/types';

import { getContext, setContext } from 'svelte';

import { browser } from '$app/environment';

import Cookie from 'js-cookie';

class ThemeState {
	private _theme = $state<Theme>('system');

	constructor(initialValue: Theme) {
		this._theme = initialValue;
	}

	get theme() {
		return this._theme;
	}

	set theme(newTheme: Theme) {
		if (browser) {
			document.body.setAttribute('data-theme', newTheme);
			Cookie.set('theme', newTheme, {
				expires: 14,
				path: '/',
				httpOnly: false
			});
		}

		this._theme = newTheme;
	}
}

export const THEME_CTX = 'theme';

export function setThemeContext(initialValue: Theme) {
	return setContext(THEME_CTX, new ThemeState(initialValue));
}

export function getThemeState() {
	return getContext<ReturnType<typeof setThemeContext>>(THEME_CTX);
}
