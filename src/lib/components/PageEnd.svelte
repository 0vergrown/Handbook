<script>
	import { base } from '$app/paths';
	import Icon from './Icon.svelte';

	let { prev = null, next = null } = $props();
</script>

<div class="page-end">
	{#if prev}
		<a class="prevnext prev" href="{base}/docs/{prev.slug}">
			<Icon name="arrow-left" size={16} />
			<span>
				<small>Previous</small>
				<strong>{prev.title}</strong>
			</span>
		</a>
	{:else}
		<span></span>
	{/if}

	{#if next}
		<a class="prevnext next" href="{base}/docs/{next.slug}">
			<span>
				<small>Next</small>
				<strong>{next.title}</strong>
			</span>
			<Icon name="arrow-right" size={16} />
		</a>
	{/if}
</div>

<style>
	.page-end {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.6rem;
		margin-top: 5rem;
		padding-top: 2.4rem;
		border-top: 1px solid var(--sk-border);
	}
	.prevnext {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1.4rem 1.6rem;
		border: 1px solid var(--sk-border);
		border-radius: var(--sk-border-radius);
		color: var(--sk-fg-2);
		text-decoration: none;
		transition: border-color 0.15s;
	}
	.prevnext:hover {
		border-color: var(--sk-fg-accent);
		text-decoration: none;
	}
	.prevnext.next {
		text-align: right;
		justify-content: flex-end;
	}
	.prevnext span {
		display: flex;
		flex-direction: column;
	}
	.prevnext small {
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.prevnext strong {
		font: var(--sk-font-ui-medium);
		font-weight: 500;
		color: var(--sk-fg-1);
	}
	@media (max-width: 560px) {
		.page-end {
			grid-template-columns: 1fr;
		}
	}
</style>
