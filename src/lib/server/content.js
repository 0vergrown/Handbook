import { buildBlog, buildCatalog } from '$lib/content/catalog.js';

const DOCS = import.meta.glob('/src/content/docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const POSTS = import.meta.glob('/src/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

export const docs = buildCatalog(DOCS);
export const blog = buildBlog(POSTS);
