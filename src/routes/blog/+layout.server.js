import { blog } from '$lib/server/content.js';

export function load() {
	return { sidebar: blog.sidebar() };
}
