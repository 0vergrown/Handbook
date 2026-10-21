<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { afterNavigate } from '$app/navigation';

	let { sections = [] } = $props();

	const current = $derived(page.url.pathname);
	const hrefOf = (slug) => `${base}/docs/${slug}/`;
	const isCurrent = (slug) => current === hrefOf(slug);
	const holds = (items) => items.some((item) => isCurrent(item.slug));
	const sectionHolds = (section) =>
		isCurrent(section.slug) || holds(section.items) || section.groups.some((group) => holds(group.items));

	const active = $derived.by(() => {
		const keys = new Set();
		for (const section of sections) {
			if (sectionHolds(section)) keys.add(section.slug);
			for (const group of section.groups) {
				if (holds(group.items)) keys.add(`${section.slug}/${group.key}`);
			}
		}
		return keys;
	});

	let toggled = $state({});

	const isOpen = (key) => toggled[key] ?? active.has(key);

	function toggle(key) {
		toggled[key] = !isOpen(key);
	}

	function openSection(event, section) {
		if (isCurrent(section.slug)) {
			event.preventDefault();
			toggle(section.slug);
			return;
		}
		toggled[section.slug] = true;
	}

	afterNavigate(() => {
		for (const key of active) delete toggled[key];
	});
</script>

{#snippet link(item)}
	<li class="menu__list-item">
		<a
			class={['menu__link', isCurrent(item.slug) && 'menu__link--active']}
			aria-current={isCurrent(item.slug) ? 'page' : undefined}
			href={hrefOf(item.slug)}
		>
			<span class="menu__label" title={item.title}>{item.title}</span>
		</a>
	</li>
{/snippet}

{#each sections as section (section.slug)}
	<li class={['menu__list-item', !isOpen(section.slug) && 'menu__list-item--collapsed']}>
		<div
			class={[
				'menu__list-item-collapsible',
				isCurrent(section.slug) && 'menu__list-item-collapsible--active'
			]}
		>
			<a
				class={['menu__link', 'menu__link--sublist', sectionHolds(section) && 'menu__link--active']}
				aria-current={isCurrent(section.slug) ? 'page' : undefined}
				href={hrefOf(section.slug)}
				onclick={(event) => openSection(event, section)}
			>
				<span class="menu__label" title={section.title}>{section.title}</span>
			</a>
			<button
				type="button"
				class="clean-btn menu__caret"
				aria-expanded={isOpen(section.slug)}
				aria-label="{isOpen(section.slug) ? 'Collapse' : 'Expand'} sidebar category '{section.title}'"
				onclick={() => toggle(section.slug)}
			></button>
		</div>
		{#if isOpen(section.slug)}
			<ul class="menu__list">
				{#each section.items as item (item.slug)}
					{@render link(item)}
				{/each}
				{#each section.groups as group (group.key)}
					{@const key = `${section.slug}/${group.key}`}
					<li class={['menu__list-item', !isOpen(key) && 'menu__list-item--collapsed']}>
						<div class="menu__list-item-collapsible">
							<button
								type="button"
								class={[
									'clean-btn',
									'menu__link',
									'menu__link--sublist',
									'menu__link--sublist-caret',
									holds(group.items) && 'menu__link--active'
								]}
								aria-expanded={isOpen(key)}
								onclick={() => toggle(key)}
							>
								<span class="menu__label">{group.title}</span>
							</button>
						</div>
						{#if isOpen(key)}
							<ul class="menu__list">
								{#each group.items as item (item.slug)}
									{@render link(item)}
								{/each}
							</ul>
						{/if}
					</li>
				{/each}
			</ul>
		{/if}
	</li>
{/each}

<style>
	button.menu__link {
		text-align: left;
		width: 100%;
	}
</style>
