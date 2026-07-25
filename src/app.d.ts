// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {}
}

declare module '*.md' {
	import type { Component } from 'svelte';
	export const metadata: Record<string, any>;
	const component: Component;
	export default component;
}

export {};
