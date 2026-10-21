<script>
	import { SITE } from '$lib/config.js';
	import { formatDate, readingLabel } from '$lib/format.js';
	import BlogSidebar from '$lib/components/BlogSidebar.svelte';
	import Paginator from '$lib/components/Paginator.svelte';
	import TOC from '$lib/components/TOC.svelte';
	import TOCCollapsible from '$lib/components/TOCCollapsible.svelte';

	let { data } = $props();

	const post = $derived(data.post);
	const Content = $derived(data.component);
</script>

<svelte:head>
	<title>{post.title} | {SITE.name}</title>
	<meta name="description" content={post.description || post.title} />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.description || post.title} />
	<meta property="og:type" content="article" />
</svelte:head>

<div class="container margin-vert--lg">
	<div class="row">
		<aside class="col col--3 blog-sidebar-col">
			<BlogSidebar posts={data.sidebar} active={post.slug} />
		</aside>
		<main id="main" class="col col--7">
			<article>
				<header>
					<h1 class="blog-post-title">{post.title}</h1>
					<div class="blog-post-info">
						<time datetime={post.date}>{formatDate(post.date)}</time> · {readingLabel(post.readingTime)}
					</div>
					<div class="blog-post-author">{post.author}</div>
				</header>
				<TOCCollapsible headings={post.headings} />
				<div class="markdown">
					<Content />
				</div>
			</article>
			<Paginator
				prev={post.newer}
				next={post.older}
				prevLabel="Newer post"
				nextLabel="Older post"
				label="Blog post page navigation"
			/>
		</main>
		{#if post.headings.length}
			<div class="col col--2">
				<TOC headings={post.headings} />
			</div>
		{/if}
	</div>
</div>
