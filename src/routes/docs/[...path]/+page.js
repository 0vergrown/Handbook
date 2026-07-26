import { redirect, error } from '@sveltejs/kit';
import { base } from '$app/paths';
import {
	getPage,
	getFirstPage,
	firstPageOfSection,
	allSlugs,
	allSectionPaths
} from '$lib/content/index.js';
import { TOPIC_ORDER } from '$lib/content/topics.js';

export async function load({ params }) {
	const path = params.path;
	const parts = path.split('/');

	// /docs/<topic> -> redirect to the topic's first page
	if (parts.length === 1) {
		const first = getFirstPage(parts[0]);
		if (first) redirect(307, `${base}/docs/${first}`);
		error(404, 'Unknown documentation section');
	}

	// /docs/<topic>/<section> -> redirect to that section's first page
	if (parts.length === 2) {
		const first = firstPageOfSection(parts[0], parts[1]);
		if (first) redirect(307, `${base}/docs/${first}`);
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
