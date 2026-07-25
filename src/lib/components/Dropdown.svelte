<script>
	// Hover/focus dropdown, ported from svelte.dev's site-kit.
	let { children, dropdown, align = 'left' } = $props();
</script>

<div class="dropdown">
	{@render children()}

	<nav class="dropdown-content" class:align-right={align === 'right'}>
		{@render dropdown()}
	</nav>
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-block;
		height: 100%;
	}

	.dropdown-content {
		opacity: 0;
		pointer-events: none;
		position: absolute;
		left: -1rem;
		top: calc(50% + min(50%, 1.5rem));
		background-color: var(--sk-bg-2);
		z-index: 999;
		filter: var(--sk-shadow);
		border-radius: var(--sk-border-radius);
		border: 1px solid var(--sk-border);
		will-change: opacity;
		transition: opacity 0.1s;
	}

	.dropdown-content.align-right {
		left: auto;
		right: -1rem;
	}

	.dropdown:hover .dropdown-content,
	.dropdown:focus-within .dropdown-content {
		opacity: 1;
		pointer-events: all;
	}
</style>
