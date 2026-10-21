import raw from '/src/content/license.md?raw';
import { extractHeadings } from '$lib/content/parse.js';

export function load() {
	return { headings: extractHeadings(raw) };
}
