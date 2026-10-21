import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';
import { docs } from '$lib/server/content.js';

export function load() {
	redirect(307, `${base}/docs/${docs.firstPage('datapack')}/`);
}
