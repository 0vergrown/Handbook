<script>
	import { base } from '$app/paths';

	let { posts = [], active = '' } = $props();

	const years = $derived.by(() => {
		const groups = [];
		for (const post of posts) {
			const year = post.date.slice(0, 4);
			let group = groups.find((candidate) => candidate.year === year);
			if (!group) {
				group = { year, posts: [] };
				groups.push(group);
			}
			group.posts.push(post);
		}
		return groups;
	});
</script>

<nav class="blog-sidebar thin-scrollbar" aria-label="Blog posts">
	<div class="blog-sidebar__title">All posts</div>
	{#each years as group (group.year)}
		<div role="group">
			<h3 class="blog-sidebar__year">{group.year}</h3>
			<ul class="blog-sidebar__list clean-list">
				{#each group.posts as post (post.slug)}
					<li class="blog-sidebar__item">
						<a
							class={['blog-sidebar__link', post.slug === active && 'blog-sidebar__link--active']}
							aria-current={post.slug === active ? 'page' : undefined}
							href="{base}/blog/{post.slug}/"
						>
							{post.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</nav>
