<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import AddonTree from '$lib/components/home/AddonTree.svelte';
	import HeroPower from '$lib/components/home/hero-power.md';

	let { data } = $props();
</script>

<svelte:head>
	<title>{SITE.name} • {SITE.tagline}</title>
	<meta name="description" content={SITE.description} />
</svelte:head>

<div class="home">
	<!-- ───────────────────────── hero ───────────────────────── -->
	<section class="hero">
		<div class="hero-grid">
			<div class="hero-copy">
				<span class="eyebrow">Apoli &nbsp;·&nbsp; Origins</span>
				<h1>The power system, <span class="accent">documented</span>.</h1>
				<p class="sub">
					Everything you can build with <strong>Apoli</strong> — the data-driven power engine for
					Minecraft — and <strong>Origins</strong>, the addon built on top of it. JSON on one side,
					Java on the other.
				</p>
				<div class="cta-row">
					<a class="btn primary" href={base + data.datapackHome}>
						Read the docs <Icon name="arrow-right" size={18} />
					</a>
					<a class="btn ghost" href="{base}/download">Download</a>
				</div>
			</div>

			<div class="code-card" aria-hidden="true">
				<div class="title-bar">
					<span class="dots"><i></i><i></i><i></i></span>
					<span class="filename">gills.json</span>
				</div>
				<div class="code-body">
					<HeroPower />
				</div>
			</div>
		</div>
	</section>

	<!-- ─────────────── how it fits together ─────────────── -->
	<section class="band">
		<div class="section-head centered">
			<h2>One engine, many addons</h2>
			<p>
				Origins is the famous one — but it's only a passenger. <strong>Apoli</strong> is what makes
				powers possible; Origins is simply an addon that hands those powers out when you pick an
				origin. Learn Apoli and you can build anything on top of it.
			</p>
		</div>

		<AddonTree />
	</section>

	<!-- ─────────────────── two doc tracks ─────────────────── -->
	<section class="band">
		<div class="section-head centered">
			<h2>Two ways in</h2>
			<p>Pick the side that matches how you build.</p>
		</div>

		<div class="tracks">
			<a class="track datapack" href={base + data.datapackHome}>
				<span class="track-icon"><Icon name="book" size={26} /></span>
				<h3>Data Pack</h3>
				<p>
					Build powers, actions, conditions and origins entirely in JSON — no mod, no compiler. Start
					here if you make data packs.
				</p>
				<span class="track-link">Browse the JSON reference <Icon name="arrow-right" size={16} /></span>
			</a>

			<a class="track addon" href={base + data.addonHome}>
				<span class="track-icon"><Icon name="zap" size={26} /></span>
				<h3>Addon</h3>
				<p>
					Extend Apoli from Java: register your own power types, actions and conditions, and hook
					into its systems. Start here if you write mods.
				</p>
				<span class="track-link">Read the API guide <Icon name="arrow-right" size={16} /></span>
			</a>
		</div>
	</section>

	<!-- ─────────────────── feature strip ─────────────────── -->
	<section class="band">
		<div class="features">
			<div class="feature">
				<Icon name="search" size={22} />
				<h4>Searchable</h4>
				<p>Fuzzy search across every power, action and condition. Hit <kbd>/</kbd> to start.</p>
			</div>
			<div class="feature">
				<Icon name="download" size={22} />
				<h4>Always current</h4>
				<p>The docs are wired to the source — when the mods change, these pages change.</p>
			</div>
			<div class="feature">
				<Icon name="book" size={22} />
				<h4>Copy-paste ready</h4>
				<p>Real, working JSON examples for every type. Drop them straight into a data pack.</p>
			</div>
		</div>
	</section>

	<Footer />
</div>

<style>
	.home {
		display: flex;
		flex-direction: column;
	}

	/* hero -------------------------------------------------------------- */
	.hero {
		position: relative;
		padding: 6rem var(--sk-page-padding-side) 8rem;
		overflow: hidden;
	}
	.hero::before {
		content: '';
		position: absolute;
		inset: -20% -10% auto -10%;
		height: 130%;
		background:
			radial-gradient(55% 55% at 22% 12%, color-mix(in srgb, var(--sk-fg-accent) 22%, transparent), transparent),
			radial-gradient(45% 45% at 88% 8%, color-mix(in srgb, hsl(140, 60%, 45%) 16%, transparent), transparent);
		z-index: -1;
		pointer-events: none;
	}
	.hero-grid {
		max-width: 116rem;
		margin: 0 auto;
		display: grid;
		gap: 4rem;
		align-items: center;
	}
	@media (min-width: 900px) {
		.hero {
			padding-top: 8rem;
			padding-bottom: 11rem;
		}
		.hero-grid {
			grid-template-columns: 1.05fr 0.95fr;
			gap: 6rem;
		}
	}
	.eyebrow {
		display: inline-block;
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--sk-fg-accent);
		margin-bottom: 1.6rem;
	}
	.hero h1 {
		font: var(--sk-font-h1);
		font-size: clamp(3.6rem, 6vw, 6.4rem);
		line-height: 1.04;
		margin-bottom: 2rem;
	}
	.hero .accent {
		color: var(--sk-fg-accent);
	}
	.hero .sub {
		font-size: clamp(1.7rem, 2vw, 2.1rem);
		color: var(--sk-fg-3);
		max-width: 48rem;
		margin-bottom: 2.8rem;
	}
	.hero strong {
		color: var(--sk-fg-1);
		font-weight: 500;
	}
	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 1.1rem 2rem;
		border-radius: var(--sk-border-radius);
		font: var(--sk-font-ui-medium);
		font-weight: 500;
		text-decoration: none;
		transition: transform 0.1s, background 0.15s, border-color 0.15s;
	}
	.btn:hover {
		text-decoration: none;
	}
	.btn.primary {
		background: var(--sk-fg-accent);
		color: white;
	}
	.btn.primary:hover {
		transform: translateY(-1px);
	}
	.btn.ghost {
		border: 1px solid var(--sk-border);
		color: var(--sk-fg-1);
	}
	.btn.ghost:hover {
		border-color: var(--sk-fg-accent);
	}

	.code-card {
		border: 1px solid var(--sk-border);
		border-radius: 0.8rem;
		overflow: hidden;
		background: var(--sk-bg-2);
		box-shadow: var(--sk-shadow);
		width: 100%;
		max-width: 46rem;
		justify-self: center;
	}
	:root.dark .code-card {
		background: var(--sk-bg-0);
	}
	.title-bar {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.9rem 1.4rem;
		border-bottom: 1px solid var(--sk-border);
		background: var(--sk-bg-3);
	}
	.dots {
		display: flex;
		gap: 0.5rem;
	}
	.dots i {
		width: 1.1rem;
		height: 1.1rem;
		border-radius: 50%;
		background: var(--sk-bg-4);
	}
	.filename {
		font: var(--sk-font-mono);
		color: var(--sk-fg-4);
	}
	.code-body :global(pre.shiki) {
		margin: 0;
		border: none;
		border-radius: 0;
		background: transparent;
		font-size: 1.35rem;
	}

	/* bands ------------------------------------------------------------- */
	.band {
		width: 100%;
		max-width: 112rem;
		margin: 0 auto;
		padding: 7rem var(--sk-page-padding-side);
	}
	@media (min-width: 1000px) {
		.band {
			padding: 9rem var(--sk-page-padding-side);
		}
	}
	.section-head {
		max-width: 64rem;
		margin-bottom: 4rem;
	}
	.section-head.centered {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 5rem;
		text-align: center;
	}
	.band h2 {
		font: var(--sk-font-h2);
		font-size: clamp(2.8rem, 4vw, 3.8rem);
		margin-bottom: 1.4rem;
	}
	.section-head p {
		font-size: clamp(1.7rem, 2vw, 2rem);
		color: var(--sk-fg-3);
	}
	.section-head strong {
		color: var(--sk-fg-1);
		font-weight: 500;
	}

	/* tracks ------------------------------------------------------------ */
	.tracks {
		display: grid;
		gap: 2rem;
		max-width: 88rem;
		margin: 0 auto;
	}
	@media (min-width: 760px) {
		.tracks {
			grid-template-columns: 1fr 1fr;
		}
	}
	.track {
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
	.track:hover {
		text-decoration: none;
		transform: translateY(-2px);
	}
	.track.datapack:hover {
		border-color: hsl(140, 55%, 45%);
	}
	.track.addon:hover {
		border-color: hsl(204, 90%, 52%);
	}
	.track-icon {
		display: grid;
		place-content: center;
		width: 5rem;
		height: 5rem;
		border-radius: var(--sk-border-radius);
		margin-bottom: 0.6rem;
		color: white;
	}
	.datapack .track-icon {
		background: hsl(140, 50%, 40%);
	}
	.addon .track-icon {
		background: hsl(204, 80%, 48%);
	}
	.track h3 {
		font-size: 2.4rem;
	}
	.track p {
		color: var(--sk-fg-3);
		font-size: 1.6rem;
		flex: 1;
	}
	.track-link {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		color: var(--sk-fg-accent);
		font: var(--sk-font-ui-medium);
		margin-top: 0.6rem;
	}

	/* features ---------------------------------------------------------- */
	.features {
		display: grid;
		gap: 2.5rem;
		max-width: 92rem;
		margin: 0 auto;
	}
	@media (min-width: 760px) {
		.features {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.feature {
		color: var(--sk-fg-3);
	}
	.feature :global(svg) {
		color: var(--sk-fg-accent);
		margin-bottom: 1rem;
	}
	.feature h4 {
		font-size: 1.9rem;
		margin-bottom: 0.5rem;
	}
	.feature p {
		font-size: 1.6rem;
	}
	.feature kbd {
		font-size: 1.2rem;
	}
</style>
