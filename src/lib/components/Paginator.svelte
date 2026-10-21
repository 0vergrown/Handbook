<script>
	import { base } from '$app/paths';

	let { prev = null, next = null, prevLabel = 'Previous', nextLabel = 'Next', label = 'Docs pages' } = $props();
</script>

{#if prev || next}
	<nav class="pagination-nav" aria-label={label}>
		{#if prev}
			<a class="pagination-nav__link pagination-nav__link--prev" href="{base}{prev.href}">
				<div class="pagination-nav__sublabel">{prevLabel}</div>
				<div class="pagination-nav__label">{prev.title}</div>
			</a>
		{/if}
		{#if next}
			<a class="pagination-nav__link pagination-nav__link--next" href="{base}{next.href}">
				<div class="pagination-nav__sublabel">{nextLabel}</div>
				<div class="pagination-nav__label">{next.title}</div>
			</a>
		{/if}
	</nav>
{/if}
