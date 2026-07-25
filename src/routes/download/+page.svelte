<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const mods = SITE.downloads.mods;
</script>

<svelte:head>
	<title>Download • {SITE.name}</title>
	<meta name="description" content="Download Apoli and Origins from Modrinth or CurseForge." />
</svelte:head>

<div class="dl">
	<header>
		<span class="eyebrow">Download</span>
		<h1>Get the mods</h1>
		<p>
			Both mods run on Fabric and NeoForge. <strong>Origins depends on Apoli</strong> — installing
			Origins pulls in the engine, but you can run Apoli on its own (or with any other addon).
		</p>
	</header>

	<div class="mods">
		{#each mods as mod}
			<div class="mod">
				<h2>{mod.name}</h2>
				<p>{mod.blurb}</p>
				<div class="links">
					<a class="store modrinth" href={mod.modrinth} target="_blank" rel="noreferrer">
						<Icon name="download" size={18} /> Modrinth
					</a>
					<a class="store curseforge" href={mod.curseforge} target="_blank" rel="noreferrer">
						<Icon name="download" size={18} /> CurseForge
					</a>
				</div>
			</div>
		{/each}
	</div>

	<div class="note">
		<h3>New here?</h3>
		<p>
			If you just want to play, grab <strong>Origins</strong>. If you want to build powers, read the
			<a href="{base}/docs/datapack">Data Pack docs</a>. If you want to extend the engine from Java,
			read the <a href="{base}/docs/addon">Addon docs</a>.
		</p>
	</div>
</div>

<Footer />

<style>
	.dl {
		max-width: 84rem;
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
	.mods {
		display: grid;
		gap: 2rem;
	}
	@media (min-width: 720px) {
		.mods {
			grid-template-columns: 1fr 1fr;
		}
	}
	.mod {
		padding: 2.8rem;
		border: 1px solid var(--sk-border);
		border-radius: 0.8rem;
		background: var(--sk-bg-2);
	}
	.mod h2 {
		font-size: 2.6rem;
		border: none;
		padding: 0;
	}
	.mod p {
		color: var(--sk-fg-3);
		font-size: 1.6rem;
		margin: 0.8rem 0 1.8rem;
	}
	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.store {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.9rem 1.4rem;
		border-radius: var(--sk-border-radius);
		font: var(--sk-font-ui-medium);
		font-weight: 500;
		text-decoration: none;
		color: white;
	}
	.store:hover {
		text-decoration: none;
		filter: brightness(1.08);
	}
	.modrinth {
		background: #00af5c;
	}
	.curseforge {
		background: #f16436;
	}
	.note {
		margin-top: 4rem;
		padding: 2.4rem;
		border-radius: 0.8rem;
		background: color-mix(in srgb, var(--sk-fg-accent) 8%, var(--sk-bg-2));
		border: 1px solid var(--sk-border);
	}
	.note h3 {
		font-size: 2rem;
		margin-bottom: 0.6rem;
	}
	.note p {
		color: var(--sk-fg-2);
		font-size: 1.7rem;
	}
	.note a {
		color: var(--sk-fg-accent);
	}
</style>
