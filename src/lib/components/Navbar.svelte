<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { afterNavigate } from '$app/navigation';
	import nav from 'virtual:handbook/nav';
	import { SITE } from '$lib/config.js';
	import ColorModeToggle from './ColorModeToggle.svelte';
	import DocSidebarItems from './DocSidebarItems.svelte';
	import ExternalIcon from './ExternalIcon.svelte';
	import SearchButton from './SearchButton.svelte';

	const left = [
		{ label: 'Data Pack', href: `/docs/${nav.first.datapack}/`, match: '/docs/datapack/' },
		{ label: 'Addon', href: `/docs/${nav.first.addon}/`, match: '/docs/addon/' },
		{ label: 'Compatibility', href: `/docs/${nav.first.compat}/`, match: '/docs/compat/' },
		{ label: 'Blog', href: '/blog/', match: '/blog/' }
	];

	const right = [
		{ label: 'Download', href: '/download/', match: '/download/' },
		{ label: 'License', href: '/license/', match: '/license/' }
	];

	const external = [
		{ label: 'GitHub', href: SITE.github },
		{ label: 'Discord', href: SITE.discord }
	];

	const path = $derived(page.url.pathname.slice(base.length));
	const isActive = (item) => path.startsWith(item.match);
	const topic = $derived(/^\/docs\/([^/]+)\//.exec(path)?.[1] ?? null);
	const sections = $derived(topic ? (nav.topics[topic] ?? []) : []);

	let shown = $state(false);
	let secondary = $state(true);

	function open() {
		secondary = sections.length > 0;
		shown = true;
		document.body.style.overflow = 'hidden';
	}

	function close() {
		shown = false;
		document.body.style.overflow = '';
	}

	afterNavigate(close);

	function onkeydown(event) {
		if (shown && event.key === 'Escape') close();
	}

	function onresize() {
		if (shown && window.innerWidth > 996) close();
	}
</script>

<svelte:window {onkeydown} {onresize} />

<nav aria-label="Main" class={['navbar', shown && 'navbar-sidebar--show']}>
	<div class="navbar__inner">
		<div class="navbar__items">
			<button
				type="button"
				class="clean-btn navbar__toggle"
				aria-label="Toggle navigation bar"
				aria-expanded={shown}
				onclick={open}
			>
				<svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
					<path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="2" d="M4 7h22M4 15h22M4 23h22" />
				</svg>
			</button>
			<a class="navbar__brand" href="{base}/">
				<div class="navbar__logo">
					<img src="{base}/assets/brand/logo-64.png" alt="" width="32" height="32" />
				</div>
				<b class="navbar__title">{SITE.name}</b>
			</a>
			{#each left as item (item.label)}
				<a
					class={['navbar__item', 'navbar__link', isActive(item) && 'navbar__link--active']}
					aria-current={isActive(item) ? 'page' : undefined}
					href="{base}{item.href}"
				>
					{item.label}
				</a>
			{/each}
		</div>
		<div class="navbar__items navbar__items--right">
			{#each right as item (item.label)}
				<a
					class={['navbar__item', 'navbar__link', isActive(item) && 'navbar__link--active']}
					aria-current={isActive(item) ? 'page' : undefined}
					href="{base}{item.href}"
				>
					{item.label}
				</a>
			{/each}
			{#each external as item (item.label)}
				<a
					class="navbar__item navbar__item--wide navbar__link"
					href={item.href}
					target="_blank"
					rel="noopener noreferrer"
				>
					{item.label}<ExternalIcon />
				</a>
			{/each}
			<ColorModeToggle class="navbar-color-toggle" />
			<div class="navbar__search">
				<SearchButton />
			</div>
		</div>
	</div>

	<div role="presentation" class="navbar-sidebar__backdrop" onclick={close}></div>

	<div class="navbar-sidebar" inert={!shown}>
		<div class="navbar-sidebar__brand">
			<a class="navbar__brand" href="{base}/">
				<div class="navbar__logo">
					<img src="{base}/assets/brand/logo-64.png" alt="" width="32" height="32" />
				</div>
				<b class="navbar__title">{SITE.name}</b>
			</a>
			<ColorModeToggle class="navbar-color-toggle" />
			<button type="button" class="clean-btn navbar-sidebar__close" aria-label="Close navigation bar" onclick={close}>
				<svg viewBox="0 0 15 15" width="21" height="21" aria-hidden="true">
					<g stroke="var(--ifm-color-emphasis-600)" stroke-width="1.2">
						<path d="M.75.75l13.5 13.5M14.25.75L.75 14.25" />
					</g>
				</svg>
			</button>
		</div>
		<div class={['navbar-sidebar__items', secondary && sections.length && 'navbar-sidebar__items--show-secondary']}>
			<div class="navbar-sidebar__item menu" inert={secondary && sections.length > 0}>
				<ul class="menu__list">
					{#each [...left, ...right] as item (item.label)}
						<li class="menu__list-item">
							<a class={['menu__link', isActive(item) && 'menu__link--active']} href="{base}{item.href}">
								{item.label}
							</a>
						</li>
					{/each}
					{#each external as item (item.label)}
						<li class="menu__list-item">
							<a class="menu__link" href={item.href} target="_blank" rel="noopener noreferrer">
								{item.label}<ExternalIcon />
							</a>
						</li>
					{/each}
				</ul>
			</div>
			<div class="navbar-sidebar__item menu" inert={!secondary || sections.length === 0}>
				{#if sections.length}
					<button type="button" class="clean-btn navbar-sidebar__back" onclick={() => (secondary = false)}>
						← Back to main menu
					</button>
					<ul class="menu__list">
						<DocSidebarItems {sections} />
					</ul>
				{/if}
			</div>
		</div>
	</div>
</nav>

<style>
	.navbar-sidebar__items .menu__link :global(svg) {
		margin-left: 0.3rem;
	}
</style>
