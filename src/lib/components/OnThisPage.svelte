<script>
	import { onMount } from 'svelte';
	import { page } from '$app/state';

	let { headings = [] } = $props();

	let current = $state('');

	// flat list of slugs (h2 + h3) in document order, for scroll-spy
	const slugs = $derived(headings.flatMap((h) => [h.slug, ...h.children.map((c) => c.slug)]));

	function update() {
		const threshold = window.innerHeight / 3;
		let found = '';
		for (const slug of slugs) {
			const el = document.getElementById(slug);
			if (!el) continue;
			if (el.getBoundingClientRect().top < threshold) found = slug;
			else break;
		}
		if (!found && window.scrollY < 200) found = '';
		current = found;
	}

	onMount(() => {
		update();
		window.addEventListener('scroll', update, { passive: true });
		return () => window.removeEventListener('scroll', update);
	});

	// recompute when the page (and thus its headings) changes
	$effect(() => {
		page.url.pathname;
		queueMicrotask(update);
	});
</script>

{#if headings.length > 0}
	<aside class="on-this-page" aria-label="On this page">
		<h2>On this page</h2>
		<nav>
			<ul>
				{#each headings as h}
					<li>
						<a href="#{h.slug}" class:active={current === h.slug}>{h.title}</a>
						{#if h.children.length}
							<ul>
								{#each h.children as c}
									<li>
										<a href="#{c.slug}" class:active={current === c.slug}>{c.title}</a>
									</li>
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
{/if}

<style>
	.on-this-page {
		display: none;
	}

	@media (min-width: 1200px) {
		.on-this-page {
			display: block;
			position: fixed;
			top: calc(var(--sk-nav-height) + var(--sk-page-padding-top));
			right: max(2rem, calc((100vw - 120rem) / 2 + 2rem));
			width: 22rem;
			max-height: calc(100vh - var(--sk-nav-height) - 8rem);
			overflow-y: auto;
			scrollbar-width: none;
		}
	}

	h2 {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--sk-fg-4);
		font-family: var(--sk-font-family-ui);
		margin-bottom: 1rem;
		padding: 0;
		border: none;
	}

	ul {
		list-style: none;
	}
	nav > ul > li {
		margin-bottom: 0.2rem;
	}
	li ul {
		margin-left: 1.4rem;
	}
	a {
		display: block;
		padding: 0.3rem 0;
		font: var(--sk-font-ui-small);
		font-size: 1.35rem;
		color: var(--sk-fg-3);
		text-decoration: none;
		text-wrap: pretty;
	}
	a:hover {
		color: var(--sk-fg-1);
	}
	a.active {
		color: var(--sk-fg-accent);
	}
</style>
