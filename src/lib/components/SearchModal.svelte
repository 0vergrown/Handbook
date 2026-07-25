<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { searchBlocks } from '$lib/content/index.js';
	import { searchState } from '$lib/search.svelte.js';
	import Icon from './Icon.svelte';

	let query = $state('');
	let selected = $state(0);
	let input = $state(null);
	let listEl = $state(null);

	// Pre-lowercase everything once, so each keystroke is a cheap scan.
	const HAYSTACK = searchBlocks.map((b) => ({
		block: b,
		title: b.title.toLowerCase(),
		crumb: (b.breadcrumb || '').toLowerCase(),
		content: (b.content || '').toLowerCase(),
		// heading blocks (deep-links) rank a touch below full pages
		isSection: b.href.includes('#')
	}));

	/**
	 * Deterministic ranked search. Every query term must match somewhere;
	 * title matches outrank breadcrumb, which outranks body text.
	 */
	function score(entry, terms) {
		let total = entry.isSection ? -3 : 0;
		for (const t of terms) {
			let best = 0;
			if (entry.title === t) best = 120;
			else if (entry.title.startsWith(t)) best = 60;
			else if (wordStart(entry.title, t)) best = 45;
			else if (entry.title.includes(t)) best = 30;
			else if (entry.crumb.includes(t)) best = 10;
			else if (entry.content.includes(t)) best = 6;
			else return -1; // a term matched nothing → drop this result
			total += best;
		}
		return total;
	}

	function wordStart(haystack, term) {
		let i = haystack.indexOf(term);
		while (i > 0) {
			if (!/[a-z0-9]/.test(haystack[i - 1])) return true;
			i = haystack.indexOf(term, i + 1);
		}
		return i === 0;
	}

	const results = $derived.by(() => {
		const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
		if (terms.length === 0) return [];
		const scored = [];
		for (const entry of HAYSTACK) {
			const s = score(entry, terms);
			if (s > 0) scored.push({ block: entry.block, s });
		}
		scored.sort((a, b) => b.s - a.s);
		return scored.slice(0, 12).map((x) => x.block);
	});

	// keep the highlighted row valid + in view
	$effect(() => {
		results;
		selected = 0;
	});
	$effect(() => {
		if (listEl) {
			const el = listEl.querySelector(`[data-i="${selected}"]`);
			el?.scrollIntoView({ block: 'nearest' });
		}
	});

	function open() {
		searchState.open = true;
		tick().then(() => input?.focus());
	}
	function close() {
		searchState.open = false;
		query = '';
	}
	function choose(block) {
		if (!block) return;
		close();
		goto(base + block.href);
	}

	function onKeydown(e) {
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			searchState.open ? close() : open();
			return;
		}
		if (
			e.key === '/' &&
			!searchState.open &&
			!/input|textarea|select/i.test(e.target?.tagName || '')
		) {
			e.preventDefault();
			open();
			return;
		}
		if (!searchState.open) return;
		if (e.key === 'Escape') {
			e.preventDefault();
			close();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			selected = Math.min(selected + 1, results.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selected = Math.max(selected - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			choose(results[selected]);
		}
	}

	$effect(() => {
		if (searchState.open) tick().then(() => input?.focus());
	});
	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = searchState.open ? 'hidden' : '';
		}
	});
	onMount(() => () => (document.body.style.overflow = ''));

	const topicLabel = (t) => (t === 'datapack' ? 'Data Pack' : t === 'addon' ? 'Addon' : t);
</script>

<svelte:window onkeydown={onKeydown} />

{#if searchState.open}
	<div class="overlay" role="presentation" onclick={close}>
		<div
			class="modal"
			role="dialog"
			aria-modal="true"
			aria-label="Search documentation"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="search-field">
				<Icon name="search" size={20} />
				<input
					bind:this={input}
					bind:value={query}
					type="text"
					placeholder="Search the docs…"
					spellcheck="false"
					autocomplete="off"
				/>
				<button class="raised close" onclick={close} aria-label="Close search">
					<Icon name="close" size={16} />
				</button>
			</div>

			<div class="results" bind:this={listEl}>
				{#if query.trim() === ''}
					<p class="hint">Search powers, actions, conditions, data types and the API.</p>
				{:else if results.length === 0}
					<p class="hint">No results for “{query}”.</p>
				{:else}
					<ul>
						{#each results as block, i (block.id)}
							<li>
								<a
									href={base + block.href}
									data-i={i}
									class:selected={i === selected}
									onmouseenter={() => (selected = i)}
									onclick={() => close()}
								>
									<span class="topic-badge" data-topic={block.topic}>{topicLabel(block.topic)}</span>
									<span class="result-text">
										<span class="result-title">{block.title}</span>
										<span class="result-crumb">{block.breadcrumb}</span>
									</span>
									<Icon name="arrow-right" size={16} />
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</div>

			<div class="footer">
				<span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
				<span><kbd>↵</kbd> to select</span>
				<span><kbd>esc</kbd> to close</span>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 200;
		background: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(2px);
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding: 10vh 1.6rem 1.6rem;
	}

	.modal {
		width: min(64rem, 100%);
		max-height: 70vh;
		display: flex;
		flex-direction: column;
		background: var(--sk-bg-1);
		border: 1px solid var(--sk-border);
		border-radius: var(--sk-border-radius);
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
		overflow: hidden;
	}

	.search-field {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.4rem 1.4rem;
		border-bottom: 1px solid var(--sk-border);
		color: var(--sk-fg-3);
	}
	.search-field input {
		flex: 1;
		border: none;
		background: none;
		outline: none;
		font: var(--sk-font-ui-large);
		font-size: 2rem;
		color: var(--sk-fg-1);
	}
	.close {
		width: 2.8rem;
		height: 2.8rem;
	}

	.results {
		overflow-y: auto;
		padding: 0.6rem;
	}
	.hint {
		color: var(--sk-fg-4);
		font: var(--sk-font-ui-medium);
		padding: 2rem 1.4rem;
		text-align: center;
	}
	ul {
		list-style: none;
	}
	.results a {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		padding: 1rem 1.2rem;
		border-radius: var(--sk-border-radius);
		color: var(--sk-fg-2);
		text-decoration: none;
	}
	.results a.selected {
		background: var(--sk-bg-4);
		color: var(--sk-fg-1);
	}
	.results a .result-text {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		flex: 1;
		min-width: 0;
	}
	.result-title {
		font: var(--sk-font-ui-medium);
		color: inherit;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.result-crumb {
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.topic-badge {
		font: var(--sk-font-ui-small);
		padding: 0.2rem 0.6rem;
		border-radius: 100px;
		background: var(--sk-bg-4);
		color: var(--sk-fg-3);
		white-space: nowrap;
	}
	.topic-badge[data-topic='datapack'] {
		background: color-mix(in srgb, hsl(140, 60%, 45%) 20%, var(--sk-bg-4));
		color: hsl(140, 60%, 32%);
	}
	.topic-badge[data-topic='addon'] {
		background: color-mix(in srgb, hsl(204, 90%, 50%) 20%, var(--sk-bg-4));
		color: hsl(204, 80%, 42%);
	}
	:root.dark .topic-badge[data-topic='datapack'] {
		color: hsl(140, 55%, 62%);
	}
	:root.dark .topic-badge[data-topic='addon'] {
		color: hsl(204, 80%, 66%);
	}

	.footer {
		display: flex;
		gap: 1.6rem;
		padding: 1rem 1.4rem;
		border-top: 1px solid var(--sk-border);
		color: var(--sk-fg-4);
		font: var(--sk-font-ui-small);
	}
	.footer kbd {
		font-size: 1.1rem;
		padding: 0.1rem 0.4rem;
		background: var(--sk-bg-3);
		border: 1px solid var(--sk-border);
		border-bottom-width: 2px;
		margin-right: 0.2rem;
	}
	@media (max-width: 520px) {
		.footer {
			display: none;
		}
	}
</style>
