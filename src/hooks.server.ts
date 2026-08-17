import type { Handle } from '@sveltejs/kit';

import type { Theme } from '$lib/types';

import { cookieExpirationTime, defaultTheme } from '$lib/config';

export const handle = (async ({ resolve, event }) => {
	const { cookies, locals } = event;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const cookieTheme = cookies.get('theme');
	const theme: Theme = ['dark', 'light', 'system'].includes(cookieTheme ?? '')
		? (cookieTheme as Theme)
		: defaultTheme;

	locals.theme = theme;

	if (cookieTheme !== theme) {
		cookies.set('theme', theme, {
			maxAge: cookieExpirationTime,
			path: '/',
			httpOnly: false,
			sameSite: 'lax'
		});
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<body', `<body data-theme="${theme}"`)
	});
	return response;
}) satisfies Handle;
