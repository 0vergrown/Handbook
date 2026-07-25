<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	let { nav = [], topicTitle = 'Docs' } = $props();

	let open = $state(true);
	onMount(() => {
		// collapsed by default on small screens, always open on desktop
		open = !window.matchMedia('(max-width: 831px)').matches;
	});

	const current = $derived(page.url.pathname);
	const hrefOf = (slug) => `${base}/docs/${slug}`;
</script>

<details class="docs-nav" bind:open>
	<summary>
		<span>{topicTitle} menu</span>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
			><polyline points="6 9 12 15 18 9" /></svg
		>
	</summary>

	<nav aria-label="{topicTitle} navigation">
		<ul class="sections">
			{#each nav as section}
				<li>
					<h3>{section.title}</h3>
					<ul class="pages">
						{#each section.pages as p}
							<li>
								<a href={hrefOf(p.slug)} aria-current={current === hrefOf(p.slug) ? 'page' : undefined}>
									{p.title}
								</a>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	</nav>
</details>

<style>
	.docs-nav {
		font-family: var(--sk-font-family-body);
	}
	summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.2rem var(--sk-page-padding-side);
		font: var(--sk-font-ui-medium);
		color: var(--sk-fg-1);
		cursor: pointer;
		list-style: none;
		border-bottom: 1px solid var(--sk-border);
		background: var(--sk-bg-2);
	}
	summary::-webkit-details-marker {
		display: none;
	}
	details[open] > summary svg {
		transform: rotate(180deg);
	}

	nav {
		padding: 2.4rem var(--sk-page-padding-side) 4rem;
	}
	.sections {
		list-style: none;
	}
	.sections > li {
		margin-bottom: 2.8rem;
	}
	h3 {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--sk-fg-4);
		font-family: var(--sk-font-family-ui);
		margin-bottom: 0.8rem;
	}
	.pages {
		list-style: none;
	}
	.pages li {
		margin: 0;
	}
	.pages a {
		display: block;
		padding: 0.35rem 0;
		color: var(--sk-fg-2);
		font: var(--sk-font-body-small);
		text-decoration: none;
		border-left: 2px solid transparent;
		padding-left: 1rem;
		margin-left: -1rem;
	}
	.pages a:hover {
		color: var(--sk-fg-1);
	}
	.pages a[aria-current='page'] {
		color: var(--sk-fg-accent);
		border-left-color: var(--sk-fg-accent);
		font-weight: 500;
	}

	/* Desktop: always-open sidebar, no summary toggle */
	@media (min-width: 832px) {
		summary {
			display: none;
		}
		nav {
			padding-top: var(--sk-page-padding-top);
		}
	}
</style>
