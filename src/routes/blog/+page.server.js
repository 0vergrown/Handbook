import { blog } from '$lib/server/content.js';

export function load() {
	return { posts: blog.list() };
}
