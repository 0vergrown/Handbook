import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Treat .md as components so mdsvex can compile them
	extensions: ['.svelte', '.md'],

	preprocess: [mdsvex(mdsvexConfig)],

	kit: {
		// Fully static output for GitHub Pages (no server code at runtime)
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),

		// On GitHub project pages the site is served from /<repo>/.
		// The deploy workflow sets BASE_PATH=/<repo>; locally it's empty.
		// `relative: false` -> emit absolute /<base>/… paths everywhere, so deep
		// links and the 404 fallback resolve correctly at any URL depth, and match
		// the base-prefixed links baked into markdown by mdsvex.config.js.
		paths: {
			base: process.env.BASE_PATH ?? '',
			relative: false
		},

		prerender: {
			handleHttpError: 'warn',
			handleMissingId: 'warn'
		}
	}
};

export default config;
