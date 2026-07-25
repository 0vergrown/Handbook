<script>
	// breadcrumbs: [{ title }] — typically [topic, section] (the page is the <h1>)
	let { crumbs = [] } = $props();
</script>

<nav class="breadcrumbs" aria-label="Breadcrumb">
	{#each crumbs as crumb, i}
		<span>{crumb.title}</span>
		{#if i < crumbs.length - 1}<span class="sep">/</span>{/if}
	{/each}
</nav>

<style>
	.breadcrumbs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		align-items: center;
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--sk-fg-4);
		margin-bottom: 1.2rem;
	}
	.sep {
		opacity: 0.5;
	}
</style>
