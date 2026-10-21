<script>
	let { headings = [], active = '', onselect, className = 'table-of-contents' } = $props();
</script>

{#if headings.length}
	<ul class={className}>
		{#each headings as heading (heading.slug)}
			<li>
				<a
					href="#{heading.slug}"
					class={['table-of-contents__link', active === heading.slug && 'table-of-contents__link--active']}
					onclick={onselect}
				>
					{heading.title}
				</a>
				{#if heading.children?.length}
					<ul>
						{#each heading.children as child (child.slug)}
							<li>
								<a
									href="#{child.slug}"
									class={[
										'table-of-contents__link',
										active === child.slug && 'table-of-contents__link--active'
									]}
									onclick={onselect}
								>
									{child.title}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>
{/if}
