<script>
	let { children } = $props();
</script>

<div class="hover-menu">
	{@render children()}
</div>

<style>
	.hover-menu {
		padding: 0.5rem;
		white-space: nowrap;
		min-width: 16rem;
	}

	.hover-menu :global(a),
	.hover-menu :global(button) {
		color: var(--sk-fg-2);
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		font: var(--sk-font-ui-medium);
		text-decoration: none;
		line-height: 1;
		width: 100%;
		text-align: left;
		border-radius: var(--sk-border-radius-inner);
	}

	.hover-menu :global(a:hover),
	.hover-menu :global(button:not(:disabled):hover) {
		background-color: var(--sk-bg-4);
		text-decoration: none;
	}

	.hover-menu :global(.menu-item-sub) {
		display: block;
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
		margin-top: 0.3rem;
	}

	.hover-menu :global(.menu-item-label) {
		display: flex;
		flex-direction: column;
		gap: 0;
	}
</style>
