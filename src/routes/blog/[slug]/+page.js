const POSTS = import.meta.glob('/src/content/blog/*.md');

export async function load({ data }) {
	const module = await POSTS[data.post.file]();
	return { ...data, component: module.default };
}
