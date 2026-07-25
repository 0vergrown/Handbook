import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		// flexsearch ships CJS; let Vite pre-bundle it cleanly
		include: ['flexsearch']
	}
});
