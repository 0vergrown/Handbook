import { getFirstPage } from '$lib/content/index.js';

// Everything is static — prerender the whole site to plain HTML for GitHub Pages.
//
// trailingSlash MUST stay 'always'. GitHub Pages resolves a directory before an
// extensionless .html file, so `/docs/datapack/entity-conditions` (which is also
// a real directory holding that section's pages) 301s to the slashed form and
// 404s unless the landing page was written as `<dir>/index.html`. 'always' is
// what makes the prerenderer emit index.html instead of <section>.html.
export const prerender = true;
export const trailingSlash = 'always';

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
