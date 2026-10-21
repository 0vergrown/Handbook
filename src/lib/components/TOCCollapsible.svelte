<script>
	import { afterNavigate } from '$app/navigation';
	import TOCItems from './TOCItems.svelte';

	let { headings = [] } = $props();

	let expanded = $state(false);

	afterNavigate(() => {
		expanded = false;
	});
</script>

{#if headings.length}
	<div class={['toc-collapsible', expanded && 'toc-collapsible--expanded']}>
		<button
			type="button"
			class="clean-btn toc-collapsible__button"
			aria-expanded={expanded}
			onclick={() => (expanded = !expanded)}
		>
			On this page
		</button>
		{#if expanded}
			<div class="toc-collapsible__content">
				<TOCItems {headings} className="table-of-contents" onselect={() => (expanded = false)} />
			</div>
		{/if}
	</div>
{/if}
