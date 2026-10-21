<script>
	import { base } from '$app/paths';

	let { items = [] } = $props();
</script>

<div class="card-grid">
	{#each items as item (item.href)}
		<a class="doc-card" href="{base}{item.href}">
			<h2 class="doc-card__title text--truncate" title={item.title}>{item.title}</h2>
			{#if item.description}
				<p class="doc-card__description text--truncate" title={item.description}>{item.description}</p>
			{/if}
		</a>
	{/each}
</div>
