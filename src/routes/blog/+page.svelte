<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import Footer from '$lib/components/Footer.svelte';

	let { data } = $props();

	const fmt = (d) =>
		d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
</script>

<svelte:head>
	<title>Blog • {SITE.name}</title>
	<meta name="description" content="Updates and release notes for Apoli and Origins." />
</svelte:head>

<div class="blog">
	<header>
		<span class="eyebrow">Blog</span>
		<h1>Updates &amp; release notes</h1>
		<p>What's new in Apoli, Origins, and the Handbook.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="empty">No posts yet — check back soon.</p>
	{:else}
		<ul class="posts">
			{#each data.posts as post}
				<li>
					<a href="{base}/blog/{post.slug}">
						<time>{fmt(post.date)}</time>
						<h2>{post.title}</h2>
						{#if post.description}<p>{post.description}</p>{/if}
						<span class="author">by {post.author}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<Footer />

<style>
	.blog {
		max-width: 76rem;
		margin: 0 auto;
		padding: var(--sk-page-padding-top) var(--sk-page-padding-side) 6rem;
	}
	header {
		margin-bottom: 4rem;
	}
	.eyebrow {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--sk-fg-accent);
	}
	h1 {
		font: var(--sk-font-h1);
		font-size: clamp(3.2rem, 6vw, 4.4rem);
		margin: 1rem 0 1rem;
	}
	header p {
		font-size: 1.9rem;
		color: var(--sk-fg-3);
	}
	.posts {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}
	.posts a {
		display: block;
		padding: 2.4rem;
		border: 1px solid var(--sk-border);
		border-radius: 0.8rem;
		background: var(--sk-bg-2);
		color: var(--sk-fg-2);
		text-decoration: none;
		transition: border-color 0.15s;
	}
	.posts a:hover {
		border-color: var(--sk-fg-accent);
		text-decoration: none;
	}
	time {
		font: var(--sk-font-ui-small);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--sk-fg-4);
	}
	.posts h2 {
		font-size: 2.4rem;
		border: none;
		padding: 0;
		margin: 0.6rem 0;
		color: var(--sk-fg-1);
	}
	.posts p {
		color: var(--sk-fg-3);
		font-size: 1.7rem;
	}
	.author {
		display: inline-block;
		margin-top: 1rem;
		font: var(--sk-font-ui-small);
		color: var(--sk-fg-4);
	}
	.empty {
		color: var(--sk-fg-4);
		font-size: 1.8rem;
	}
</style>
