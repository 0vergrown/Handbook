<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import { LICENSE } from '$lib/license.js';
	import Icon from '$lib/components/Icon.svelte';
	import Footer from '$lib/components/Footer.svelte';

	// The license copy carries root-relative links (/docs/…). Markdown gets these
	// base-prefixed by a rehype plugin; here we do the same by hand so the page
	// still works when served from /<repo>/ on GitHub Pages. Fragments (#id) and
	// absolute URLs are untouched. Runs at prerender time, so it costs nothing.
	const withBase = (html) => html.replaceAll('href="/', `href="${base}/`);
</script>

<svelte:head>
	<title>License • {SITE.name}</title>
	<meta
		name="description"
		content="The license Apoli and Origins are distributed under — what you may do with the mods, their code and their assets."
	/>
</svelte:head>

<div class="license">
	<header>
		<span class="eyebrow">License</span>
		<h1>{LICENSE.name}</h1>
		<p class="lead">{LICENSE.lead}</p>
		{#each LICENSE.intro as paragraph}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<p class="intro">{@html withBase(paragraph)}</p>
		{/each}

		<nav class="jump" aria-label="Sections">
			{#each LICENSE.sections as section}
				<a href="#{section.id}">{section.heading}</a>
			{/each}
		</nav>
	</header>

	{#each LICENSE.sections as section}
		<section id={section.id}>
			<div class="section-head">
				{#if section.kicker}<span class="kicker">{section.kicker}</span>{/if}
				<h2>{section.heading}</h2>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				<p class="blurb">{@html withBase(section.blurb)}</p>
			</div>

			<ul class="clauses">
				{#each section.clauses as clause}
					<li class="clause {clause.tone}">
						<span class="icon"><Icon name={clause.icon} size={20} /></span>
						<div class="body">
							<h3>{clause.name} <span class="suffix">Clause</span></h3>
							<!-- eslint-disable-next-line svelte/no-at-html-tags -->
							<p>{@html withBase(clause.text)}</p>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/each}

	<footer class="page-footer">
		<p class="updated">Last updated {LICENSE.updated}.</p>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<p class="credit">{@html withBase(LICENSE.footnote)}</p>
	</footer>
</div>

<Footer />

<style>
	.license {
		max-width: 84rem;
		margin: 0 auto;
		padding: var(--sk-page-padding-top) var(--sk-page-padding-side) 6rem;
		font-family: var(--sk-font-family-ui);
	}

	/* ---- header ---- */
	header {
		max-width: 64rem;
	}
	.eyebrow {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--sk-fg-accent);
	}
	h1 {
		font: var(--sk-font-h1);
		font-size: clamp(3.2rem, 6vw, 4.4rem);
		margin: 1rem 0 1.6rem;
	}
	.lead {
		font-size: 1.9rem;
		line-height: 1.55;
		color: var(--sk-fg-1);
		font-weight: 500;
		margin-bottom: 1.4rem;
	}
	.intro {
		font-size: 1.7rem;
		line-height: 1.6;
		color: var(--sk-fg-3);
		margin-bottom: 1rem;
	}
	.intro :global(strong) {
		color: var(--sk-fg-1);
		font-weight: 500;
	}
	.intro :global(a),
	.blurb :global(a),
	.body :global(a),
	.credit :global(a) {
		color: var(--sk-fg-accent);
	}

	/* ---- jump links ---- */
	.jump {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin: 2.6rem 0 0;
	}
	.jump a {
		padding: 0.6rem 1.2rem;
		border: 1px solid var(--sk-border);
		border-radius: 100px;
		background: var(--sk-bg-2);
		color: var(--sk-fg-2);
		font: var(--sk-font-ui-small);
		text-decoration: none;
		white-space: nowrap;
	}
	.jump a:hover {
		border-color: var(--sk-fg-accent);
		color: var(--sk-fg-accent);
		text-decoration: none;
	}

	/* ---- sections ---- */
	section {
		margin-top: 5rem;
		padding-top: 3.4rem;
		border-top: 1px solid var(--sk-border);
		scroll-margin-top: calc(var(--sk-nav-height) + 2rem);
	}
	.section-head {
		max-width: 64rem;
		margin-bottom: 2.4rem;
	}
	.kicker {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--sk-fg-4);
	}
	h2 {
		font: var(--sk-font-h2);
		font-size: clamp(2.4rem, 4vw, 3rem);
		margin: 0.4rem 0 0.8rem;
	}
	.blurb {
		font-size: 1.65rem;
		line-height: 1.6;
		color: var(--sk-fg-3);
	}

	/* ---- clauses ---- */
	.clauses {
		display: grid;
		gap: 1.2rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.clause {
		--tone: var(--sk-fg-3);
		display: flex;
		gap: 1.6rem;
		padding: 1.8rem 2rem;
		border: 1px solid var(--sk-border);
		border-radius: 0.8rem;
		background: var(--sk-bg-2);
	}
	.clause.allow {
		--tone: hsl(145, 63%, 32%);
	}
	.clause.deny {
		--tone: hsl(0, 68%, 45%);
	}
	.clause.info {
		--tone: var(--sk-fg-accent);
	}

	.icon {
		display: grid;
		place-content: center;
		flex-shrink: 0;
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		color: var(--tone);
		background: color-mix(in srgb, var(--tone) 12%, transparent);
	}

	.body h3 {
		font-family: var(--sk-font-family-ui);
		font-size: 1.7rem;
		font-weight: 500;
		color: var(--sk-fg-1);
		margin: 0.3rem 0 0.5rem;
	}
	.suffix {
		color: var(--sk-fg-4);
		font-weight: 400;
	}
	.body p {
		font-size: 1.6rem;
		line-height: 1.62;
		color: var(--sk-fg-3);
	}
	.body :global(strong) {
		color: var(--sk-fg-2);
		font-weight: 500;
	}
	.body :global(code) {
		font: var(--sk-font-mono);
		background: var(--sk-bg-4);
		border-radius: var(--sk-border-radius-inner);
		padding: 0.1em 0.4em;
	}

	/* ---- page footer ---- */
	.page-footer {
		margin-top: 5rem;
		padding-top: 2.4rem;
		border-top: 1px solid var(--sk-border);
		color: var(--sk-fg-4);
		font: var(--sk-font-ui-small);
	}
	.page-footer p + p {
		margin-top: 0.5rem;
	}

	@media (max-width: 560px) {
		.clause {
			gap: 1.2rem;
			padding: 1.6rem;
		}
		.icon {
			width: 3.4rem;
			height: 3.4rem;
		}
	}

	/* Dark tones — kept in sync across both dark blocks, as in tokens.css. */
	:global(:root.dark) .clause.allow {
		--tone: hsl(145, 52%, 56%);
	}
	:global(:root.dark) .clause.deny {
		--tone: hsl(0, 74%, 67%);
	}
	@media (prefers-color-scheme: dark) {
		:global(:root:not(.light)) .clause.allow {
			--tone: hsl(145, 52%, 56%);
		}
		:global(:root:not(.light)) .clause.deny {
			--tone: hsl(0, 74%, 67%);
		}
	}
</style>
