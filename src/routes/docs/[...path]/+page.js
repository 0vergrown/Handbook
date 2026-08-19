import { redirect, error } from '@sveltejs/kit';
import { base } from '$app/paths';
import {
	getPage,
	getFirstPage,
	getSection,
	allSlugs,
	allSectionPaths
} from '$lib/content/index.js';
import { TOPIC_ORDER } from '$lib/content/topics.js';

export async function load({ params }) {
	// trailingSlash is 'always' (see src/routes/+layout.js), so the rest param
	// arrives with an empty final segment — strip it before matching a slug.
	const path = params.path.replace(/\/+$/, '');
	const parts = path.split('/');

	// /docs/<topic> -> redirect to the topic's first page
	if (parts.length === 1) {
		const first = getFirstPage(parts[0]);
		if (first) redirect(307, `${base}/docs/${first}`);
		error(404, 'Unknown documentation section');
	}

	// /docs/<topic>/<section> -> the category's own landing page
	if (parts.length === 2) {
		const section = getSection(parts[0], parts[1]);
		if (section) return { section };
		error(404, 'Unknown documentation section');
	}

	const doc = await getPage(path);
	if (!doc) error(404, 'Page not found');

	return { doc };
}

// Prerender every page, plus topic- and section-landing redirects.
export function entries() {
	return [...allSlugs(), ...allSectionPaths(), ...TOPIC_ORDER].map((path) => ({ path }));
}
