import { getFirstPage } from '$lib/content/index.js';

// Everything is static — prerender the whole site to plain HTML for GitHub Pages.
export const prerender = true;
export const trailingSlash = 'never';

export function load() {
	const dp = getFirstPage('datapack');
	const ad = getFirstPage('addon');
	const cp = getFirstPage('compat');
	return {
		datapackHome: dp ? `/docs/${dp}` : '/docs/datapack',
		addonHome: ad ? `/docs/${ad}` : '/docs/addon',
		compatHome: cp ? `/docs/${cp}` : '/docs/compat'
	};
}
