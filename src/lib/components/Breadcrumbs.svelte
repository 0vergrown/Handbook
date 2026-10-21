<script>
	import { base } from '$app/paths';

	let { home, homeLabel = 'Home page', crumbs = [] } = $props();
</script>

<nav class="breadcrumbs-container" aria-label="Breadcrumbs">
	<ul class="breadcrumbs">
		<li class="breadcrumbs__item">
			<a class="breadcrumbs__link" href="{base}{home}" aria-label={homeLabel}>
				<svg viewBox="0 0 24 24" class="breadcrumbs__home" aria-hidden="true">
					<path
						d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
						fill="currentColor"
					/>
				</svg>
			</a>
		</li>
		{#each crumbs as crumb, index (index)}
			{@const last = index === crumbs.length - 1}
			<li class={['breadcrumbs__item', last && 'breadcrumbs__item--active']}>
				{#if crumb.href && !last}
					<a class="breadcrumbs__link" href="{base}{crumb.href}"><span>{crumb.title}</span></a>
				{:else}
					<span class="breadcrumbs__link">{crumb.title}</span>
				{/if}
			</li>
		{/each}
	</ul>
</nav>
