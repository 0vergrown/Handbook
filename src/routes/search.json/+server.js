import { json } from '@sveltejs/kit';
import { blog, docs } from '$lib/server/content.js';

export const prerender = true;
export const trailingSlash = 'never';

export function GET() {
	return json([...docs.searchBlocks(), ...blog.searchBlocks()]);
}
