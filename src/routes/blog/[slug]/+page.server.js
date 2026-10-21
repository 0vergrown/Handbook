import { error } from '@sveltejs/kit';
import { blog } from '$lib/server/content.js';

export function entries() {
	return blog.slugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const post = blog.get(params.slug);
	if (!post) error(404, 'Not found');
	return { post };
}
