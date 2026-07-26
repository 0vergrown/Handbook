<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { base } from '$app/paths';

	let { nav = [], topicTitle = 'Docs' } = $props();

	let navOpen = $state(true); // outer (mobile) toggle
	onMount(() => {
		navOpen = !window.matchMedia('(max-width: 831px)').matches;
	});

	const current = $derived(page.url.pathname);
	const hrefOf = (slug) => `${base}/docs/${slug}`;
	const sectionHasCurrent = (section) => section.pages.some((p) => hrefOf(p.slug) === current);

	// per-section open state; the section holding the current page is always open
	let open = $state({});
	$effect(() => {
		for (const s of nav) if (sectionHasCurrent(s)) open[s.title] = true;
	});
</script>

<details class="docs-nav" bind:open={navOpen}>
	<summary class="nav-toggle">
		<span>{topicTitle} menu</span>
		<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
			><polyline points="6 9 12 15 18 9" /></svg
		>
	</summary>

	<nav aria-label="{topicTitle} navigation">
		<ul class="sections">
			{#each nav as section (section.title)}
				<li>
					<details bind:open={open[section.title]}>
						<summary>
							<span>{section.title}</span>
							<span class="count">{section.pages.length}</span>
						</summary>
						<ul class="pages">
							{#each section.pages as p (p.slug)}
								<li>
									<a
										href={hrefOf(p.slug)}
										aria-current={current === hrefOf(p.slug) ? 'page' : undefined}
									>
										{p.title}
									</a>
								</li>
							{/each}
						</ul>
					</details>
				</li>
			{/each}
		</ul>
	</nav>
</details>

<style>
	.docs-nav {
		font-family: var(--sk-font-family-body);
	}

	/* outer (mobile) toggle */
	.nav-toggle {
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
	.nav-toggle::-webkit-details-marker {
		display: none;
	}
	details[open] > .nav-toggle svg {
		transform: rotate(180deg);
	}

	nav {
		padding: 1.6rem 0 4rem;
	}
	.sections {
		list-style: none;
	}
	.sections > li {
		margin: 0;
	}

	/* section headers (collapsible) */
	.sections > li > details > summary {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		padding: 0.6rem var(--sk-page-padding-side);
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--sk-fg-3);
		font-family: var(--sk-font-family-ui);
		cursor: pointer;
		list-style: none;
		user-select: none;
		border-radius: var(--sk-border-radius);
	}
	.sections > li > details > summary::-webkit-details-marker {
		display: none;
	}
	.sections > li > details > summary::before {
		content: '';
		width: 0.8rem;
		height: 0.8rem;
		flex-shrink: 0;
		background: currentColor;
		mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" fill="none" stroke="black" stroke-width="2.5"/></svg>')
			no-repeat 50% 50%;
		transition: transform 0.15s;
		order: -1;
	}
	.sections > li > details[open] > summary::before {
		transform: rotate(90deg);
	}
	.sections > li > details > summary:hover {
		color: var(--sk-fg-1);
		background: var(--sk-bg-4);
	}
	.summary-spacer {
		flex: 1;
	}
	.count {
		font-size: 1.1rem;
		color: var(--sk-fg-4);
		margin-left: auto;
	}

	.pages {
		list-style: none;
		margin: 0.2rem 0 1rem;
	}
	.pages li {
		margin: 0;
	}
	.pages a {
		display: block;
		padding: 0.3rem 0 0.3rem calc(var(--sk-page-padding-side) + 1.6rem);
		color: var(--sk-fg-2);
		font: var(--sk-font-body-small);
		font-size: 1.4rem;
		text-decoration: none;
		border-left: 2px solid transparent;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.pages a:hover {
		color: var(--sk-fg-1);
		background: var(--sk-bg-3);
	}
	.pages a[aria-current='page'] {
		color: var(--sk-fg-accent);
		border-left-color: var(--sk-fg-accent);
		font-weight: 500;
	}

	@media (min-width: 832px) {
		.nav-toggle {
			display: none;
		}
		nav {
			padding-top: 2.4rem;
		}
	}
</style>
