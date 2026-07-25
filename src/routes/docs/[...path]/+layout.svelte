<script>
	import DocsSidebar from '$lib/components/DocsSidebar.svelte';

	let { data, children } = $props();
</script>

<div class="docs-shell">
	<aside class="sidebar">
		<DocsSidebar nav={data.nav} topicTitle={data.topicTitle} />
	</aside>

	<div class="page-wrap">
		{@render children()}
	</div>
</div>

<style>
	.docs-shell {
		--sidebar-width: 27rem;
		--toc-width: 24rem;
		position: relative;
	}

	.sidebar {
		border-bottom: 1px solid var(--sk-border);
		background: var(--sk-bg-2);
	}
	:root.dark .sidebar {
		background: var(--sk-bg-0);
	}

	.page-wrap {
		min-width: 0;
	}

	@media (min-width: 832px) {
		.sidebar {
			position: fixed;
			top: var(--sk-nav-height);
			left: 0;
			width: var(--sidebar-width);
			height: calc(100vh - var(--sk-nav-height));
			overflow-y: auto;
			border-bottom: none;
			border-right: 1px solid var(--sk-border);
			z-index: 10;
		}
		.page-wrap {
			padding-left: var(--sidebar-width);
		}
	}

	@media (min-width: 1200px) {
		.page-wrap {
			padding-right: var(--toc-width);
		}
	}
</style>
