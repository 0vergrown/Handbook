<script>
	import { SITE } from '$lib/config.js';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import OnThisPage from '$lib/components/OnThisPage.svelte';
	import PageEnd from '$lib/components/PageEnd.svelte';

	let { data } = $props();

	const doc = $derived(data.doc);
	const Doc = $derived(data.doc.component);
</script>

<svelte:head>
	<title>{doc.title} • {doc.breadcrumbs[0].title} • {SITE.name}</title>
	<meta name="description" content={doc.description || `${doc.title} — ${SITE.name}`} />
</svelte:head>

<article class="doc">
	<OnThisPage headings={doc.headings} />

	<div class="doc-inner">
		<header>
			<Breadcrumbs crumbs={doc.breadcrumbs.slice(0, -1)} />
			<h1>{doc.title}</h1>
			{#if doc.description}
				<p class="lead">{doc.description}</p>
			{/if}
		</header>

		<div class="prose">
			{#key doc.slug}
				<Doc />
			{/key}
		</div>

		<PageEnd prev={doc.prev} next={doc.next} />
	</div>
</article>

<style>
	.doc {
		position: relative;
	}
	.doc-inner {
		max-width: var(--sk-page-content-width);
		margin: 0 auto;
		padding: var(--sk-page-padding-top) var(--sk-page-padding-side) var(--sk-page-padding-bottom);
	}
	header {
		margin-bottom: 3rem;
	}
	h1 {
		font: var(--sk-font-h1);
		font-size: clamp(3.2rem, 6vw, 4.4rem);
		margin-bottom: 1rem;
	}
	.lead {
		font: var(--sk-font-body);
		font-size: 2rem;
		color: var(--sk-fg-3);
		max-width: var(--sk-page-content-width);
	}
</style>
