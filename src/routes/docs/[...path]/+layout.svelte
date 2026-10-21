<script>
	import { page } from '$app/state';
	import nav from 'virtual:handbook/nav';
	import DocSidebar from '$lib/components/DocSidebar.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';

	let { children } = $props();

	const topic = $derived(page.params.path?.split('/')[0] ?? '');
	const sections = $derived(nav.topics[topic] ?? []);
</script>

<div class="docs-wrapper">
	<BackToTop />
	<DocSidebar {sections} />
	<main id="main" class="doc-main-container">
		<div class="container">
			{@render children()}
		</div>
	</main>
</div>
