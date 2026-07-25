<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Icon from '$lib/components/Icon.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();
	const post = $derived(data.post);
	const Body = $derived(data.post.component);

	const fmt = (d) =>
		d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
</script>

<svelte:head>
	<title>{post.title} • {SITE.name} Blog</title>
	<meta name="description" content={post.description || post.title} />
</svelte:head>

<div class="wrap">
	<a class="back" href="{base}/blog"><Icon name="arrow-left" size={16} /> All posts</a>

	<header>
		<time>{fmt(post.date)} · {post.author}</time>
		<h1>{post.title}</h1>
	</header>

	<div class="prose">
		{#key post.slug}
			<Body />
		{/key}
	</div>
</div>

<Footer />

<style>
	.wrap {
		max-width: 72rem;
		margin: 0 auto;
		padding: var(--sk-page-padding-top) var(--sk-page-padding-side) 6rem;
	}
	.back {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		font: var(--sk-font-ui-medium);
		color: var(--sk-fg-3);
		margin-bottom: 2rem;
	}
	header {
		margin-bottom: 3rem;
	}
	time {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--sk-fg-4);
	}
	h1 {
		font: var(--sk-font-h1);
		font-size: clamp(3rem, 6vw, 4.4rem);
		margin-top: 0.8rem;
	}
</style>
