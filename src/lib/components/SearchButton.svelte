<script>
	import { onMount } from 'svelte';
	import { search } from '$lib/search.svelte.js';

	let modifier = $state('Ctrl');

	onMount(() => {
		if (/mac|iphone|ipad/i.test(navigator.userAgent)) modifier = '⌘';
	});
</script>

<button
	type="button"
	class="search-button"
	aria-label="Search (Ctrl+K)"
	onclick={() => (search.open = true)}
	onpointerenter={() => search.load()}
	onfocus={() => search.load()}
>
	<span class="search-button__container">
		<svg width="20" height="20" class="search-button__icon" viewBox="0 0 20 20" aria-hidden="true">
			<path
				d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
				stroke="currentColor"
				fill="none"
				fill-rule="evenodd"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<span class="search-button__placeholder">Search</span>
	</span>
	<span class="search-button__keys">
		<kbd class="search-button__key">{modifier}</kbd>
		<kbd class="search-button__key">K</kbd>
	</span>
</button>

<style>
	.search-button {
		align-items: center;
		background: var(--ifm-navbar-search-background);
		border: 0;
		border-radius: 40px;
		color: var(--ifm-navbar-search-placeholder);
		cursor: pointer;
		display: flex;
		font-weight: var(--ifm-font-weight-semibold);
		height: 36px;
		justify-content: space-between;
		margin: 0;
		padding: 0 8px;
		transition: all var(--ifm-transition-fast) cubic-bezier(0.08, 0.52, 0.52, 1);
		user-select: none;
	}

	.search-button:hover,
	.search-button:active,
	.search-button:focus-visible {
		background: var(--ifm-background-surface-color);
		box-shadow: inset 0 0 0 2px var(--ifm-color-primary);
		color: var(--ifm-color-content);
		outline: none;
	}

	.search-button__container {
		align-items: center;
		display: flex;
	}

	.search-button__icon {
		stroke-width: 1.6;
	}

	.search-button__placeholder {
		font-size: 1rem;
		padding: 0 12px 0 6px;
	}

	.search-button__keys {
		display: flex;
		min-width: calc(2 * 20px + 0.8em);
	}

	.search-button__key {
		align-items: center;
		background: var(--hb-search-key-background);
		border: 0;
		border-radius: 3px;
		box-shadow: var(--hb-search-key-shadow);
		color: var(--ifm-navbar-search-placeholder);
		display: flex;
		font-family: var(--ifm-font-family-base);
		font-size: 0.75rem;
		height: 18px;
		justify-content: center;
		margin-right: 0.4em;
		min-width: 20px;
		padding: 0 0 2px;
		position: relative;
		top: -1px;
	}

	@media (max-width: 768px) {
		.search-button__keys,
		.search-button__placeholder {
			display: none;
		}

		.search-button {
			justify-content: center;
			width: 36px;
		}
	}
</style>
