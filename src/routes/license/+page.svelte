<script>
	import { SITE } from '$lib/config.js';
	import License from '../../content/license.md';
	import TOC from '$lib/components/TOC.svelte';
	import TOCCollapsible from '$lib/components/TOCCollapsible.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>The A/O License | {SITE.name}</title>
	<meta
		name="description"
		content="The license Apoli, Origins and this website are distributed under: what you may do with the mods, their code and their assets."
	/>
</svelte:head>

<main id="main" class="container page-container">
	<div class="row page-row">
		<div class="col col--8">
			<article>
				<TOCCollapsible headings={data.headings} />
				<div class="markdown">
					<header>
						<h1>The A/O License</h1>
					</header>
					<License />
				</div>
			</article>
		</div>
		<div class="col col--2">
			<TOC headings={data.headings} />
		</div>
	</div>
</main>
