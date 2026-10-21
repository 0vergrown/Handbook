import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { handbookContent } from './src/lib/content/vite-plugin.js';

export default defineConfig({
	plugins: [handbookContent(), sveltekit()]
});
