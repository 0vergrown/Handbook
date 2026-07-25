/**
 * Blog index. Same idea as the docs pipeline but flat: one folder of posts,
 * sorted newest first.
 */
const RAW = import.meta.glob('/src/content/blog/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});
const LOADERS = import.meta.glob('/src/content/blog/*.md');

const BASE = '/src/content/blog/';

function parseFrontmatter(raw) {
	const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
	const meta = {};
	if (!m) return meta;
	for (const line of m[1].split(/\r?\n/)) {
		const kv = /^(\w[\w-]*):\s*(.*)$/.exec(line);
		if (!kv) continue;
		let value = kv[2].trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		meta[kv[1]] = value;
	}
	return meta;
}

/** @type {Map<string, any>} */
const POSTS = new Map();

for (const [path, raw] of Object.entries(RAW)) {
	const file = path.slice(BASE.length).replace(/\.md$/, '');
	const meta = parseFrontmatter(raw);
	if (meta.draft === 'true') continue;
	const slug = meta.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '');
	POSTS.set(slug, {
		slug,
		title: meta.title || slug,
		description: meta.description || '',
		date: meta.date || '',
		author: meta.author || 'Overgrown',
		load: LOADERS[path]
	});
}

const SORTED = [...POSTS.values()].sort((a, b) => (a.date < b.date ? 1 : -1));

export function listPosts() {
	return SORTED.map(({ load, ...rest }) => rest);
}

export async function getPost(slug) {
	const post = POSTS.get(slug);
	if (!post) return null;
	const mod = await post.load();
	const { load, ...meta } = post;
	return { ...meta, component: mod.default };
}

export function allBlogSlugs() {
	return [...POSTS.keys()];
}
