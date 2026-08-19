<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import OnThisPage from '$lib/components/OnThisPage.svelte';
	import PageEnd from '$lib/components/PageEnd.svelte';

	let { data } = $props();

	const doc = $derived(data.doc);
	const Doc = $derived(data.doc?.component);
	const section = $derived(data.section);

	const head = $derived(
		section
			? {
					title: `${section.title} • ${section.breadcrumbs[0].title} • ${SITE.name}`,
					description: `Every page in the ${section.title} section of the ${section.breadcrumbs[0].title} reference.`
				}
			: {
					title: `${doc.title} • ${doc.breadcrumbs[0].title} • ${SITE.name}`,
					description: doc.description || `${doc.title} — ${SITE.name}`
				}
	);
</script>

<svelte:head>
	<title>{head.title}</title>
	<meta name="description" content={head.description} />
</svelte:head>

{#if section}
	<article class="doc">
		<div class="doc-inner">
			<header>
				<Breadcrumbs crumbs={section.breadcrumbs.slice(0, -1)} />
				<h1>{section.title}</h1>
				<p class="lead">
					{section.count}
					{section.count === 1 ? 'page' : 'pages'} in this section.
				</p>
			</header>

			{#if section.pages.length}
				<ul class="index">
					{#each section.pages as page (page.slug)}
						<li>
							<a href="{base}/docs/{page.slug}">
								<span class="name">{page.navTitle}</span>
								{#if page.description}<span class="blurb">{page.description}</span>{/if}
							</a>
						</li>
					{/each}
				</ul>
			{/if}

			{#each section.groups as group (group.key)}
				<h2>{group.title}</h2>
				<ul class="index">
					{#each group.pages as page (page.slug)}
						<li>
							<a href="{base}/docs/{page.slug}">
								<span class="name">{page.navTitle}</span>
								{#if page.description}<span class="blurb">{page.description}</span>{/if}
							</a>
						</li>
					{/each}
				</ul>
			{/each}
		</div>
	</article>
{:else}
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
{/if}

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
	h2 {
		font: var(--sk-font-h2);
		margin: 4rem 0 1.6rem;
	}
	.index {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.8rem;
		grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
	}
	.index a {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
		height: 100%;
		padding: 1.2rem 1.6rem;
		border: 1px solid var(--sk-border);
		border-radius: var(--sk-border-radius, 0.6rem);
		background: var(--sk-bg-2);
		text-decoration: none;
		color: inherit;
	}
	.index a:hover {
		border-color: var(--sk-fg-accent);
	}
	.name {
		font: var(--sk-font-ui-medium, inherit);
		font-weight: 600;
		color: var(--sk-fg-1);
	}
	.blurb {
		font-size: 1.4rem;
		line-height: 1.5;
		color: var(--sk-fg-3);
	}
</style>
