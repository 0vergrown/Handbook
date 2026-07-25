<script>
	import { onMount, tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import FlexSearchNS from 'flexsearch';
	import { searchBlocks } from '$lib/content/index.js';
	import { searchState } from '$lib/search.svelte.js';
	import Icon from './Icon.svelte';

	const FlexSearch = FlexSearchNS.default ?? FlexSearchNS;

	let index = null;
	let query = $state('');
	let results = $state([]);
	let selected = $state(0);
	let input = $state(null);

	function buildIndex() {
		if (index) return;
		index = new FlexSearch.Document({
			tokenize: 'forward',
			cache: true,
			document: {
				id: 'id',
				index: ['title', 'content'],
				store: ['title', 'breadcrumb', 'href', 'topic']
			}
		});
		for (const block of searchBlocks) index.add(block);
	}

	function run(q) {
		if (!index || !q.trim()) return [];
		const groups = index.search(q, { enrich: true, limit: 12, suggest: true });
		const seen = new Set();
		const out = [];
		for (const group of groups) {
			for (const item of group.result) {
				if (seen.has(item.id)) continue;
				seen.add(item.id);
				out.push(item.doc);
				if (out.length >= 10) break;
			}
			if (out.length >= 10) break;
		}
		return out;
	}

	$effect(() => {
		const q = query;
		results = run(q);
		selected = 0;
	});

	async function open() {
		buildIndex();
		searchState.open = true;
		await tick();
		input?.focus();
	}

	function close() {
		searchState.open = false;
		query = '';
		results = [];
	}

	function choose(block) {
		if (!block) return;
		close();
		goto(base + block.href);
	}

	function onKeydown(e) {
		// global open shortcut
		if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
			e.preventDefault();
			searchState.open ? close() : open();
			return;
		}
		if (e.key === '/' && !searchState.open && !/input|textarea|select/i.test(e.target.tagName)) {
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

	// react to external open requests (e.g. mobile search button)
	$effect(() => {
		if (searchState.open && !index) buildIndex();
		if (searchState.open) tick().then(() => input?.focus());
	});

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.style.overflow = searchState.open ? 'hidden' : '';
		}
	});

	onMount(() => () => (document.body.style.overflow = ''));

	function topicLabel(t) {
		return t === 'datapack' ? 'Data Pack' : t === 'addon' ? 'Addon' : t;
	}
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

			<div class="results">
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
