<script>
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { search } from '$lib/search.svelte.js';

	let query = $state('');
	let selected = $state(0);
	let input = $state();
	let list = $state();

	const results = $derived(search.query(query));

	const groups = $derived.by(() => {
		const out = [];
		results.forEach((hit, position) => {
			let group = out.find((candidate) => candidate.section === hit.section);
			if (!group) {
				group = { section: hit.section, hits: [] };
				out.push(group);
			}
			group.hits.push({ hit, position });
		});
		return out;
	});

	const order = $derived(groups.flatMap((group) => group.hits.map((entry) => entry.hit)));

	function highlight(text) {
		const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
		if (!terms.length) return [{ text, match: false }];
		const lower = text.toLowerCase();
		const marks = new Array(text.length).fill(false);
		for (const term of terms) {
			let at = lower.indexOf(term);
			while (at !== -1) {
				if (at === 0 || !/[a-z0-9]/.test(lower[at - 1])) marks.fill(true, at, at + term.length);
				at = lower.indexOf(term, at + 1);
			}
		}
		const parts = [];
		for (let i = 0; i < text.length; i++) {
			const last = parts[parts.length - 1];
			if (last && last.match === marks[i]) last.text += text[i];
			else parts.push({ text: text[i], match: marks[i] });
		}
		return parts;
	}

	async function show() {
		search.open = true;
		search.load();
		await tick();
		input?.focus();
	}

	function close() {
		search.open = false;
		query = '';
		selected = 0;
		document.body.style.overflow = '';
	}

	function choose(hit) {
		if (!hit) return;
		close();
		goto(`${base}${hit.href}`);
	}

	async function move(step) {
		if (!order.length) return;
		selected = (selected + step + order.length) % order.length;
		await tick();
		list?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
	}

	function onkeydown(event) {
		const typing = /^(input|textarea|select)$/i.test(event.target?.tagName ?? '') || event.target?.isContentEditable;
		if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
			event.preventDefault();
			if (search.open) close();
			else show();
			return;
		}
		if (!search.open) {
			if (event.key === '/' && !typing) {
				event.preventDefault();
				show();
			}
			return;
		}
		if (event.key === 'Escape') {
			event.preventDefault();
			close();
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			move(1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			move(-1);
		} else if (event.key === 'Enter') {
			event.preventDefault();
			choose(order[selected]);
		}
	}

	function oninput() {
		selected = 0;
	}

	$effect(() => {
		if (!search.open) return;
		search.load();
		document.body.style.overflow = 'hidden';
		tick().then(() => input?.focus());
	});
</script>

<svelte:window {onkeydown} />

{#if search.open}
	<div class="search-container" role="presentation" onclick={close}>
		<div
			class="search-modal"
			role="dialog"
			aria-modal="true"
			aria-label="Search the docs"
			tabindex="-1"
			onclick={(event) => event.stopPropagation()}
			onkeydown={() => {}}
		>
			<header class="search-modal__header">
				<form class="search-form" role="search" onsubmit={(event) => event.preventDefault()}>
					<label class="search-form__label" for="search-input">
						<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
							<path
								d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
								stroke="currentColor"
								fill="none"
								fill-rule="evenodd"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
						<span class="visually-hidden">Search</span>
					</label>
					<input
						id="search-input"
						class="search-form__input"
						type="search"
						placeholder="Search docs"
						autocomplete="off"
						autocapitalize="off"
						spellcheck="false"
						enterkeyhint="go"
						aria-controls="search-results"
						bind:value={query}
						bind:this={input}
						{oninput}
					/>
				</form>
				<button type="button" class="clean-btn search-modal__cancel" onclick={close}>Cancel</button>
			</header>

			<div class="search-modal__dropdown" id="search-results" bind:this={list}>
				{#if search.failed}
					<p class="search-modal__note">The search index did not load. Check your connection and try again.</p>
				{:else if !query.trim()}
					<p class="search-modal__note">
						Search powers, actions, conditions, data types, the Java API and the blog. Type IDs and
						their old aliases work too.
					</p>
				{:else if !search.index}
					<p class="search-modal__note">Loading the search index…</p>
				{:else if !results.length}
					<p class="search-modal__note">No results for "<strong>{query}</strong>".</p>
				{:else}
					{#each groups as group (group.section)}
						<section class="search-hits">
							<div class="search-hits__source">{group.section}</div>
							<ul role="listbox">
								{#each group.hits as { hit } (hit.href)}
									{@const index = order.indexOf(hit)}
									<li class="search-hit" role="option" aria-selected={index === selected}>
										<a
											href="{base}{hit.href}"
											onclick={close}
											onmouseenter={() => (selected = index)}
										>
											<span class="search-hit__title">
												{#each highlight(hit.title) as part, partIndex (partIndex)}
													{#if part.match}<mark>{part.text}</mark>{:else}{part.text}{/if}
												{/each}
											</span>
											<span class="search-hit__path">{hit.crumb}</span>
										</a>
									</li>
								{/each}
							</ul>
						</section>
					{/each}
				{/if}
			</div>

			<footer class="search-modal__footer">
				<ul class="search-commands">
					<li><kbd class="search-key">↵</kbd><span>to select</span></li>
					<li><kbd class="search-key">↓</kbd><kbd class="search-key">↑</kbd><span>to navigate</span></li>
					<li><kbd class="search-key">esc</kbd><span>to close</span></li>
				</ul>
			</footer>
		</div>
	</div>
{/if}

<style>
	.search-container {
		background-color: rgba(101, 108, 133, 0.8);
		height: 100vh;
		left: 0;
		position: fixed;
		top: 0;
		width: 100vw;
		z-index: 300;
	}

	:global([data-theme='dark']) .search-container {
		background-color: rgba(9, 10, 17, 0.8);
	}

	.search-modal {
		background: var(--hb-search-modal-background);
		border-radius: 6px;
		box-shadow:
			inset 1px 1px 0 0 hsla(0, 0%, 100%, 0.5),
			0 3px 8px 0 #555a64;
		display: flex;
		flex-direction: column;
		margin: 60px auto auto;
		max-width: 560px;
		position: relative;
	}

	:global([data-theme='dark']) .search-modal {
		box-shadow:
			inset 1px 1px 0 0 #2c2e40,
			0 3px 8px 0 #000309;
	}

	.search-modal__header {
		align-items: center;
		display: flex;
		padding: 12px 12px 0;
	}

	.search-form {
		align-items: center;
		background: var(--ifm-background-surface-color);
		border-radius: 4px;
		box-shadow: inset 0 0 0 2px var(--ifm-color-primary);
		display: flex;
		flex: 1;
		height: 56px;
		padding: 0 12px;
		position: relative;
	}

	:global([data-theme='dark']) .search-form {
		background: var(--ifm-background-color);
	}

	.search-form__label {
		color: var(--ifm-color-primary-text);
		display: flex;
		margin: 0;
		padding: 0;
	}

	.search-form__input {
		appearance: none;
		background: transparent;
		border: 0;
		color: var(--ifm-color-content);
		flex: 1;
		font-size: 1.2em;
		height: 100%;
		outline: none;
		padding: 0 0 0 8px;
		width: 80%;
	}

	.search-form__input::placeholder {
		color: var(--ifm-color-emphasis-600);
		opacity: 1;
	}

	.search-form__input::-webkit-search-cancel-button {
		display: none;
	}

	.search-modal__cancel {
		color: var(--ifm-color-primary-text);
		display: none;
		flex: none;
		font-size: 1em;
		font-weight: 500;
		margin-left: 12px;
		white-space: nowrap;
	}

	.search-modal__dropdown {
		max-height: calc(100vh - 56px - 12px - 44px - 60px - 60px);
		min-height: 12px;
		overflow-y: auto;
		padding: 0 12px;
		scrollbar-width: thin;
	}

	.search-modal__note {
		color: var(--ifm-color-emphasis-700);
		font-size: 0.9em;
		margin: 0;
		padding: 36px 0;
		text-align: center;
	}

	.search-hits {
		margin-bottom: 12px;
	}

	.search-hits ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.search-hits__source {
		background: var(--hb-search-modal-background);
		color: var(--ifm-color-primary-text);
		font-size: 0.85em;
		font-weight: 600;
		line-height: 32px;
		margin: 0 -4px;
		padding: 8px 4px 0;
		position: sticky;
		top: 0;
		z-index: 10;
	}

	.search-hit {
		border-radius: 4px;
		display: flex;
		padding-bottom: 4px;
		position: relative;
	}

	.search-hit a {
		background: var(--hb-search-hit-background);
		border-radius: 4px;
		box-shadow: var(--hb-search-hit-shadow);
		color: var(--ifm-color-emphasis-800);
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 56px;
		padding: 6px 12px;
		width: 100%;
	}

	.search-hit a:hover {
		text-decoration: none;
	}

	.search-hit[aria-selected='true'] a {
		background-color: var(--ifm-color-primary-text);
		color: var(--ifm-color-emphasis-0);
	}

	.search-hit__title {
		font-size: 0.9em;
		font-weight: 500;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.search-hit__title mark {
		background: none;
		color: var(--ifm-color-primary-text);
		text-decoration: underline;
		text-underline-offset: 0.15em;
	}

	.search-hit[aria-selected='true'] .search-hit__title mark {
		color: inherit;
	}

	.search-hit__path {
		font-size: 0.75em;
		opacity: 0.8;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.search-modal__footer {
		align-items: center;
		background: var(--ifm-background-surface-color);
		border-radius: 0 0 8px 8px;
		box-shadow:
			0 -1px 0 0 var(--ifm-color-emphasis-200),
			0 -3px 6px 0 rgba(69, 98, 155, 0.12);
		display: flex;
		flex-direction: row-reverse;
		flex-shrink: 0;
		height: 44px;
		justify-content: space-between;
		padding: 0 12px;
		position: relative;
		user-select: none;
		width: 100%;
		z-index: 300;
	}

	.search-commands {
		color: var(--ifm-color-emphasis-600);
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.search-commands li {
		align-items: center;
		display: flex;
	}

	.search-commands li:not(:last-of-type) {
		margin-right: 0.8em;
	}

	.search-commands span {
		font-size: 0.75em;
		margin-left: 0.4em;
	}

	.search-key {
		align-items: center;
		background: var(--hb-search-key-background);
		border: 0;
		border-radius: 2px;
		box-shadow: var(--hb-search-key-shadow);
		color: var(--ifm-color-emphasis-600);
		display: flex;
		font-family: var(--ifm-font-family-base);
		font-size: 0.75em;
		height: 18px;
		justify-content: center;
		margin-right: 0.4em;
		padding: 0 0 1px;
		width: 20px;
	}

	.search-key:last-of-type {
		margin-right: 0;
	}

	@media (max-width: 768px) {
		.search-modal {
			border-radius: 0;
			box-shadow: none;
			height: 100vh;
			margin: 0;
			max-width: 100%;
			width: 100%;
		}

		.search-modal__dropdown {
			flex: 1;
			max-height: none;
		}

		.search-modal__cancel {
			display: inline-block;
		}

		.search-modal__footer {
			display: none;
		}
	}
</style>
