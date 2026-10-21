<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import nav from 'virtual:handbook/nav';
	import { SITE } from '$lib/config.js';
	import { search } from '$lib/search.svelte.js';

	const missing = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{missing ? 'Page not found' : 'Something went wrong'} | {SITE.name}</title>
</svelte:head>

<main id="main" class="container not-found">
	<div class="row">
		<div class="col col--6 col--offset-3 markdown">
			{#if missing}
				<h1>Page not found</h1>
				<p>Nothing is published at this address. The page may have moved, or the link may have a typo in it.</p>
				<p>
					Try <button type="button" class="clean-btn inline-link" onclick={() => (search.open = true)}>searching the docs</button>
					or start from the <a href="{base}/docs/{nav.first.datapack}/">Data Pack overview</a>.
				</p>
			{:else}
				<h1>Something went wrong</h1>
				<p>{page.error?.message ?? 'The page failed to load.'}</p>
				<p><a href="{base}/docs/{nav.first.datapack}/">Back to the docs</a></p>
			{/if}
		</div>
	</div>
</main>

<style>
	.inline-link {
		color: var(--ifm-link-color);
		font: inherit;
	}

	.inline-link:hover {
		text-decoration: underline;
	}
</style>
