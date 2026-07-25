<script>
	import Icon from './Icon.svelte';
	import { searchState } from '$lib/search.svelte.js';
	import { onMount } from 'svelte';

	// "⌘" on mac, "Ctrl" elsewhere
	let mac = $state(false);
	onMount(() => {
		mac = /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
	});
</script>

<button class="search-trigger" onclick={() => (searchState.open = true)} aria-label="Search docs">
	<Icon name="search" size={16} />
	<span class="text">Search</span>
	<span class="kbd">{mac ? '⌘' : 'Ctrl'} K</span>
</button>

<style>
	.search-trigger {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		height: 3.2rem;
		padding: 0 0.8rem 0 1rem;
		border-radius: var(--sk-border-radius);
		border: 1px solid var(--sk-border);
		background: var(--sk-bg-2);
		color: var(--sk-fg-3);
		font: var(--sk-font-ui-small);
		transition: border-color 0.15s;
	}
	.search-trigger:hover {
		border-color: var(--sk-raised-hover-color);
	}
	.text {
		font: var(--sk-font-ui-medium);
	}
	.kbd {
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
		border: 1px solid var(--sk-border);
		border-radius: var(--sk-border-radius-inner);
		padding: 0.1rem 0.5rem;
		white-space: nowrap;
	}
	@media (max-width: 899px) {
		.text,
		.kbd {
			display: none;
		}
		.search-trigger {
			padding: 0;
			width: 3.2rem;
			justify-content: center;
		}
	}
</style>
