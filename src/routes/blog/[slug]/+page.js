import { error } from '@sveltejs/kit';
import { getPost, allBlogSlugs } from '$lib/content/blog.js';

export async function load({ params }) {
	const post = await getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { post };
}

export function entries() {
	return allBlogSlugs().map((slug) => ({ slug }));
}
