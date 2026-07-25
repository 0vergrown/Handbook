<script>
	import '$lib/styles/index.css';
	// Self-hosted fonts (no external requests — works offline / on GitHub Pages)
	import '@fontsource/fira-sans/400.css';
	import '@fontsource/fira-sans/500.css';
	import '@fontsource/dm-serif-display/400.css';
	import '@fontsource/fira-mono/400.css';
	import '@fontsource/fira-mono/500.css';

	import Nav from '$lib/components/Nav.svelte';
	import SearchModal from '$lib/components/SearchModal.svelte';

	let { children, data } = $props();
</script>

<a href="#main" class="skip-link">Skip to content</a>

<Nav datapackHome={data.datapackHome} addonHome={data.addonHome} />

<main id="main">
	{@render children()}
</main>

<SearchModal />

<style>
	main {
		position: relative;
		padding-top: var(--sk-nav-height);
		min-height: 100vh;
	}

	.skip-link {
		position: fixed;
		top: -100px;
		left: 1rem;
		z-index: 300;
		padding: 0.8rem 1.6rem;
		background: var(--sk-bg-1);
		border: 1px solid var(--sk-fg-accent);
		border-radius: var(--sk-border-radius);
		color: var(--sk-fg-1);
		transition: top 0.15s;
	}
	.skip-link:focus {
		top: 1rem;
	}
</style>
