import { listPosts } from '$lib/content/blog.js';

export function load() {
	return { posts: listPosts() };
}
