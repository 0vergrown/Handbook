<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Documentation • {SITE.name}</title>
	<meta name="description" content="Documentation for Apoli and Origins — the Data Pack and Addon references." />
</svelte:head>

<div class="hub">
	<header>
		<span class="eyebrow">Documentation</span>
		<h1>What are you building?</h1>
		<p>
			The <strong>Data Pack</strong> reference covers the JSON — powers, actions, conditions and data
			types. The <strong>Addon</strong> reference covers the Java API for extending Apoli itself.
			<strong>Compatibility</strong> covers the types other mods unlock.
		</p>
	</header>

	<div class="cards">
		<a class="card datapack" href={base + data.datapackHome}>
			<span class="icon"><Icon name="book" size={28} /></span>
			<h2>Data Pack</h2>
			<p>Powers, actions, conditions, origins and data types — all in JSON.</p>
			<span class="go">Open <Icon name="arrow-right" size={16} /></span>
		</a>
		<a class="card addon" href={base + data.addonHome}>
			<span class="icon"><Icon name="zap" size={28} /></span>
			<h2>Addon</h2>
			<p>The API, its systems, and how to register your own types from Java.</p>
			<span class="go">Open <Icon name="arrow-right" size={16} /></span>
		</a>
		<a class="card compat" href={base + data.compatHome}>
			<span class="icon"><Icon name="puzzle" size={28} /></span>
			<h2>Compatibility</h2>
			<p>The mods Apoli integrates with, and the extra types each one unlocks.</p>
			<span class="go">Open <Icon name="arrow-right" size={16} /></span>
		</a>
	</div>
</div>

<Footer />

<style>
	.hub {
		max-width: 96rem;
		margin: 0 auto;
		padding: var(--sk-page-padding-top) var(--sk-page-padding-side) 6rem;
	}
	header {
		max-width: 60rem;
		margin-bottom: 4rem;
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
		margin: 1rem 0 1.4rem;
	}
	header p {
		font-size: 1.9rem;
		color: var(--sk-fg-3);
	}
	header strong {
		color: var(--sk-fg-1);
		font-weight: 500;
	}
	.cards {
		display: grid;
		gap: 2rem;
	}
	@media (min-width: 720px) {
		.cards {
			grid-template-columns: 1fr 1fr;
		}
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.8rem;
		padding: 3rem;
		border: 1px solid var(--sk-border);
		border-radius: 0.8rem;
		background: var(--sk-bg-2);
		color: var(--sk-fg-2);
		text-decoration: none;
		transition: border-color 0.15s, transform 0.1s;
	}
	.card:hover {
		text-decoration: none;
		transform: translateY(-2px);
	}
	.card.datapack:hover {
		border-color: hsl(140, 55%, 45%);
	}
	.card.addon:hover {
		border-color: hsl(204, 90%, 52%);
	}
	.card.compat:hover {
		border-color: hsl(28, 85%, 52%);
	}
	.icon {
		display: grid;
		place-content: center;
		width: 5.4rem;
		height: 5.4rem;
		border-radius: var(--sk-border-radius);
		color: white;
		margin-bottom: 0.6rem;
	}
	.datapack .icon {
		background: hsl(140, 50%, 40%);
	}
	.addon .icon {
		background: hsl(204, 80%, 48%);
	}
	.compat .icon {
		background: hsl(28, 75%, 48%);
	}
	.card h2 {
		font-size: 2.6rem;
		border: none;
		padding: 0;
	}
	.card p {
		color: var(--sk-fg-3);
		font-size: 1.6rem;
		flex: 1;
	}
	.go {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--sk-fg-accent);
		font: var(--sk-font-ui-medium);
	}
</style>
