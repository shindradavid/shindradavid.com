import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			styles: 'styles/*',
			layouts: 'src/layouts/*',
			components: 'src/components/*'
		}
	}
};

export default config;
