import { error, redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { docs } from '$lib/server/content.js';
import { TOPIC_ORDER } from '$lib/content/topics.js';

export function entries() {
	return [...docs.allSlugs(), ...docs.allSectionPaths(), ...TOPIC_ORDER].map((path) => ({ path }));
}

export function load({ params }) {
	const path = params.path.replace(/\/+$/, '');
	const parts = path.split('/');

	if (parts.length === 1) {
		const first = docs.firstPage(parts[0]);
		if (first) redirect(307, `${base}/docs/${first}/`);
		error(404, 'Not found');
	}

	if (parts.length === 2) {
		const section = docs.section(parts[0], parts[1]);
		if (!section) error(404, 'Not found');
		return { section };
	}

	const doc = docs.page(path);
	if (!doc) error(404, 'Not found');
	return { doc };
}
