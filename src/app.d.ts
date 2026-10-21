declare global {
	namespace App {}
}

declare module '*.md' {
	import type { Component } from 'svelte';
	export const metadata: Record<string, any>;
	const component: Component;
	export default component;
}

declare module 'virtual:handbook/nav' {
	type NavItem = { title: string; slug: string };
	type NavGroup = { key: string; title: string; items: NavItem[] };
	type NavSection = { key: string; slug: string; title: string; items: NavItem[]; groups: NavGroup[] };
	const nav: { topics: Record<string, NavSection[]>; first: Record<string, string | null> };
	export default nav;
}

export {};
