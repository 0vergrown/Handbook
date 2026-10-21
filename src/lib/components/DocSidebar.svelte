<script>
	import { onMount } from 'svelte';
	import DocSidebarItems from './DocSidebarItems.svelte';

	let { sections = [] } = $props();

	let menu;

	onMount(() => {
		const active = menu?.querySelector('[aria-current="page"]');
		if (!active) return;
		const bounds = menu.getBoundingClientRect();
		const target = active.getBoundingClientRect();
		if (target.top < bounds.top || target.bottom > bounds.bottom) {
			menu.scrollTop += target.top - bounds.top - bounds.height / 2 + target.height / 2;
		}
	});
</script>

<aside class="doc-sidebar-container">
	<div class="doc-sidebar-viewport">
		<div class="doc-sidebar">
			<nav aria-label="Docs sidebar" class="menu thin-scrollbar" bind:this={menu}>
				<ul class="menu__list">
					<DocSidebarItems {sections} />
				</ul>
			</nav>
		</div>
	</div>
</aside>
