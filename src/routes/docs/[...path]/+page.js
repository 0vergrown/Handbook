const PAGES = import.meta.glob('/src/content/docs/**/*.md');

export async function load({ data }) {
	if (!data.doc) return data;
	const module = await PAGES[data.doc.file]();
	return { ...data, component: module.default };
}
