<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Icon from './Icon.svelte';

	const year = new Date().getFullYear();
</script>

<footer>
	<div class="inner">
		<div class="brand">
			<span class="logo"><Icon name="book" size={20} /></span>
			<div>
				<strong>{SITE.name}</strong>
				<p>Docs for the Apoli power engine &amp; the Origins addon.</p>
			</div>
		</div>

		<nav class="columns" aria-label="Footer">
			<div>
				<h4>Docs</h4>
				<a href="{base}/docs/datapack">Data Pack</a>
				<a href="{base}/docs/addon">Addon</a>
			</div>
			<div>
				<h4>Project</h4>
				<a href="{base}/download">Downloads</a>
				<a href="{base}/blog">Blog</a>
			</div>
			<div>
				<h4>Community</h4>
				<a href={SITE.github} target="_blank" rel="noreferrer">GitHub</a>
				<a href={SITE.x} target="_blank" rel="noreferrer">X / Twitter</a>
				<a href={SITE.discord} target="_blank" rel="noreferrer">Discord</a>
			</div>
		</nav>
	</div>

	<div class="baseline">
		<span>© {year} Overgrown. Built with SvelteKit.</span>
		<div class="socials">
			<a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub"
				><Icon name="github" size={18} /></a
			>
			<a href={SITE.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)"
				><Icon name="x" size={16} /></a
			>
			<a href={SITE.discord} target="_blank" rel="noreferrer" aria-label="Discord"
				><Icon name="discord" size={18} /></a
			>
		</div>
	</div>
</footer>

<style>
	footer {
		border-top: 1px solid var(--sk-border);
		background: var(--sk-bg-2);
		padding: 4rem var(--sk-page-padding-side) 2rem;
		font-family: var(--sk-font-family-ui);
	}
	.inner {
		max-width: 120rem;
		margin: 0 auto;
		display: flex;
		flex-wrap: wrap;
		gap: 3rem 4rem;
		justify-content: space-between;
	}
	.brand {
		display: flex;
		gap: 1rem;
		max-width: 32rem;
	}
	.brand .logo {
		display: grid;
		place-content: center;
		width: 3.2rem;
		height: 3.2rem;
		border-radius: var(--sk-border-radius);
		background: var(--sk-fg-accent);
		color: white;
		flex-shrink: 0;
	}
	.brand strong {
		font-family: var(--sk-font-family-heading);
		font-weight: 500;
		font-size: 1.8rem;
		color: var(--sk-fg-1);
	}
	.brand p {
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
		margin-top: 0.3rem;
	}
	.columns {
		display: flex;
		gap: 4rem;
		flex-wrap: wrap;
	}
	.columns h4 {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--sk-fg-4);
		margin-bottom: 1rem;
		font-family: var(--sk-font-family-ui);
	}
	.columns a {
		display: block;
		color: var(--sk-fg-2);
		font: var(--sk-font-ui-medium);
		padding: 0.3rem 0;
		text-decoration: none;
	}
	.columns a:hover {
		color: var(--sk-fg-accent);
	}
	.baseline {
		max-width: 120rem;
		margin: 3rem auto 0;
		padding-top: 2rem;
		border-top: 1px solid var(--sk-border);
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		flex-wrap: wrap;
		color: var(--sk-fg-4);
		font: var(--sk-font-ui-small);
	}
	.socials {
		display: flex;
		gap: 1rem;
		color: var(--sk-fg-3);
	}
	.socials a:hover {
		color: var(--sk-fg-1);
	}
</style>
