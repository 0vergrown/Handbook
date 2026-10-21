<script>
	import nav from 'virtual:handbook/nav';
	import { SITE } from '$lib/config.js';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import DocCards from '$lib/components/DocCards.svelte';
	import Paginator from '$lib/components/Paginator.svelte';
	import TOC from '$lib/components/TOC.svelte';
	import TOCCollapsible from '$lib/components/TOCCollapsible.svelte';

	let { data } = $props();

	const doc = $derived(data.doc);
	const section = $derived(data.section);
	const Content = $derived(data.component);
	const topic = $derived((doc ?? section).topic);
	const home = $derived(`/docs/${nav.first[topic]}/`);
	const homeLabel = $derived(`${(doc ?? section).topicTitle} home`);
	const title = $derived((doc ?? section).title);
	const description = $derived(doc?.description || section?.description || SITE.description);
</script>

<svelte:head>
	<title>{title} | {SITE.name}</title>
	<meta name="description" content={description} />
	<meta property="og:title" content="{title} | {SITE.name}" />
	<meta property="og:description" content={description} />
</svelte:head>

{#if section}
	<div class="row">
		<div class="col doc-item-col">
			<div class="doc-item-container">
				<Breadcrumbs {home} {homeLabel} crumbs={[{ title: section.title }]} />
				<header>
					<h1 class="page-title">{section.title}</h1>
					{#if section.description}
						<p>{section.description}</p>
					{/if}
				</header>
				<article class="margin-top--lg">
					{#if section.items.length}
						<DocCards items={section.items} />
					{/if}
					{#each section.groups as group (group.key)}
						<h2 class="section-group">{group.title}</h2>
						<DocCards items={group.items} />
					{/each}
				</article>
				<Paginator prev={section.prev} next={section.next} />
			</div>
		</div>
	</div>
{:else}
	<div class="row">
		<div class={['col', doc.headings.length && 'doc-item-col']}>
			<div class="doc-item-container">
				<article>
					<Breadcrumbs {home} {homeLabel} crumbs={doc.breadcrumbs} />
					<TOCCollapsible headings={doc.headings} />
					<div class="markdown">
						<header>
							<h1>{doc.title}</h1>
						</header>
						<Content />
					</div>
					<footer class="doc-footer">
						<a class="edit-this-page" href="{SITE.repo}/edit/main/{doc.source}" target="_blank" rel="noopener noreferrer">
							<svg fill="currentColor" viewBox="0 0 40 40" aria-hidden="true">
								<g>
									<path
										d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"
									/>
								</g>
							</svg>
							Edit this page
						</a>
					</footer>
				</article>
				<Paginator prev={doc.prev} next={doc.next} />
			</div>
		</div>
		{#if doc.headings.length}
			<div class="col col--3">
				<TOC headings={doc.headings} />
			</div>
		{/if}
	</div>
{/if}

<style>
	.section-group {
		font-size: 1.5rem;
		margin: 2rem 0 1rem;
	}
</style>
