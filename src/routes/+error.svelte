<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import Icon from '$lib/components/Icon.svelte';
</script>

<svelte:head>
	<title>{page.status} • Handbook</title>
</svelte:head>

<div class="error">
	<span class="code">{page.status}</span>
	<h1>{page.error?.message ?? 'Something went wrong'}</h1>
	<p>The page you're looking for isn't here. It may have moved, or never existed.</p>
	<a class="btn" href="{base}/"><Icon name="arrow-left" size={16} /> Back to home</a>
</div>

<style>
	.error {
		max-width: 60rem;
		margin: 0 auto;
		padding: 12rem var(--sk-page-padding-side);
		text-align: center;
	}
	.code {
		font-family: var(--sk-font-family-heading);
		font-size: 8rem;
		color: var(--sk-fg-accent);
		line-height: 1;
	}
	h1 {
		font: var(--sk-font-h2);
		margin: 1rem 0;
	}
	p {
		color: var(--sk-fg-3);
		font-size: 1.8rem;
		margin-bottom: 2.5rem;
	}
	.btn {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem 1.8rem;
		border: 1px solid var(--sk-border);
		border-radius: var(--sk-border-radius);
		color: var(--sk-fg-1);
		text-decoration: none;
	}
	.btn:hover {
		border-color: var(--sk-fg-accent);
		text-decoration: none;
	}
</style>
