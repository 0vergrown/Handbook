<script>
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import { formatDate, readingLabel } from '$lib/format.js';
	import BlogSidebar from '$lib/components/BlogSidebar.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Blog | {SITE.name}</title>
	<meta name="description" content="Release notes and development posts for Apoli, Origins and the Handbook." />
</svelte:head>

<div class="container margin-vert--lg">
	<div class="row">
		<aside class="col col--3 blog-sidebar-col">
			<BlogSidebar posts={data.sidebar} />
		</aside>
		<main id="main" class="col col--7 blog-post-list">
			<h1 class="visually-hidden">Blog</h1>
			{#each data.posts as post (post.slug)}
				<article class="margin-bottom--xl">
					<header>
						<h2 class="blog-post-title">
							<a href="{base}/blog/{post.slug}/">{post.title}</a>
						</h2>
						<div class="blog-post-info">
							<time datetime={post.date}>{formatDate(post.date)}</time> · {readingLabel(post.readingTime)}
						</div>
						<div class="blog-post-author">{post.author}</div>
					</header>
					{#if post.description}
						<div class="markdown">
							<p>{post.description}</p>
						</div>
					{/if}
					<footer class="blog-post-footer">
						<a href="{base}/blog/{post.slug}/" aria-label="Read more about {post.title}"><b>Read more</b></a>
					</footer>
				</article>
			{/each}
		</main>
	</div>
</div>
