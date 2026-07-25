<script>
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { SITE } from '$lib/config.js';
	import { searchState } from '$lib/search.svelte.js';
	import Icon from './Icon.svelte';
	import Dropdown from './Dropdown.svelte';
	import HoverMenu from './HoverMenu.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import SearchTrigger from './SearchTrigger.svelte';

	let { datapackHome = '/docs/datapack', addonHome = '/docs/addon' } = $props();

	let open = $state(false); // mobile menu

	const isActive = (prefix) => page.url.pathname.startsWith(base + prefix);

	// close the mobile menu on navigation
	$effect(() => {
		page.url.pathname;
		open = false;
	});
</script>

<nav aria-label="Primary">
	<a class="home" href="{base}/" aria-label="{SITE.name} home">
		<span class="logo"><Icon name="book" size={22} /></span>
		<span class="wordmark">{SITE.name}</span>
	</a>

	<!-- desktop links -->
	<div class="links desktop">
		<Dropdown>
			<a href="{base}/docs" class="toplink" aria-current={isActive('/docs') ? 'page' : undefined}>
				Docs <Icon name="chevron-down" size={14} />
			</a>
			{#snippet dropdown()}
				<HoverMenu>
					<a href={base + datapackHome}>
						<span class="menu-item-label">
							Data Pack
							<span class="menu-item-sub">Powers, actions & conditions in JSON</span>
						</span>
					</a>
					<a href={base + addonHome}>
						<span class="menu-item-label">
							Addon
							<span class="menu-item-sub">The Java API and its systems</span>
						</span>
					</a>
				</HoverMenu>
			{/snippet}
		</Dropdown>

		<Dropdown>
			<a
				href="{base}/download"
				class="toplink"
				aria-current={isActive('/download') ? 'page' : undefined}
			>
				Downloads <Icon name="chevron-down" size={14} />
			</a>
			{#snippet dropdown()}
				<HoverMenu>
					<a href={SITE.downloads.modrinth} target="_blank" rel="noreferrer">
						Modrinth <Icon name="external-link" size={14} />
					</a>
					<a href={SITE.downloads.curseforge} target="_blank" rel="noreferrer">
						CurseForge <Icon name="external-link" size={14} />
					</a>
				</HoverMenu>
			{/snippet}
		</Dropdown>

		<a href="{base}/blog" class="toplink" aria-current={isActive('/blog') ? 'page' : undefined}>
			Blog
		</a>
	</div>

	<!-- desktop right menu -->
	<div class="menu desktop">
		<SearchTrigger />
		<div class="socials">
			<a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
				<Icon name="github" size={20} />
			</a>
			<a href={SITE.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)">
				<Icon name="x" size={18} />
			</a>
			<a href={SITE.discord} target="_blank" rel="noreferrer" aria-label="Discord">
				<Icon name="discord" size={20} />
			</a>
		</div>
		<ThemeToggle />
	</div>

	<!-- mobile controls -->
	<div class="menu mobile">
		<button class="raised" aria-label="Search" onclick={() => (searchState.open = true)}>
			<Icon name="search" size={18} />
		</button>
		<ThemeToggle />
		<button
			class="raised"
			aria-label="Toggle menu"
			aria-expanded={open}
			onclick={() => (open = !open)}
		>
			<Icon name={open ? 'close' : 'menu'} size={18} />
		</button>
	</div>
</nav>

{#if open}
	<div class="mobile-menu mobile">
		<a href="{base}/docs" class="group-title">Docs</a>
		<a href={base + datapackHome} class="sub">Data Pack</a>
		<a href={base + addonHome} class="sub">Addon</a>

		<a href="{base}/download" class="group-title">Downloads</a>
		<a href={SITE.downloads.modrinth} target="_blank" rel="noreferrer" class="sub">Modrinth ↗</a>
		<a href={SITE.downloads.curseforge} target="_blank" rel="noreferrer" class="sub">CurseForge ↗</a>

		<a href="{base}/blog" class="group-title">Blog</a>

		<div class="mobile-socials">
			<a href={SITE.github} target="_blank" rel="noreferrer" aria-label="GitHub"
				><Icon name="github" size={22} /></a
			>
			<a href={SITE.x} target="_blank" rel="noreferrer" aria-label="X (Twitter)"
				><Icon name="x" size={20} /></a
			>
			<a href={SITE.discord} target="_blank" rel="noreferrer" aria-label="Discord"
				><Icon name="discord" size={22} /></a
			>
		</div>
	</div>
{/if}

<style>
	nav {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: var(--sk-nav-height);
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0 var(--sk-page-padding-side);
		background: var(--sk-bg-1);
		border-bottom: 1px solid var(--sk-border);
		font-family: var(--sk-font-family-ui);
		user-select: none;
	}
	:root.dark nav {
		background: var(--sk-bg-3);
	}

	.home {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--sk-fg-1);
		text-decoration: none;
		flex-shrink: 0;
	}
	.home:hover {
		text-decoration: none;
	}
	.logo {
		display: grid;
		place-content: center;
		width: 3.4rem;
		height: 3.4rem;
		border-radius: var(--sk-border-radius);
		background: var(--sk-fg-accent);
		color: white;
	}
	.wordmark {
		font-family: var(--sk-font-family-heading);
		font-size: 2.2rem;
		font-weight: 500;
		letter-spacing: 0.01em;
	}

	.links {
		display: flex;
		align-items: center;
		height: 100%;
		margin-left: 1.5rem;
	}
	.toplink {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		height: 100%;
		padding: 0 1rem;
		color: var(--sk-fg-2);
		font: var(--sk-font-ui-medium);
		text-decoration: none;
		white-space: nowrap;
	}
	.toplink:hover {
		box-shadow: inset 0 -2px 0 0 var(--sk-border);
		text-decoration: none;
	}
	.toplink[aria-current='page'] {
		color: var(--sk-fg-accent);
		box-shadow: inset 0 -2px 0 0 currentColor;
	}

	.menu {
		display: flex;
		align-items: center;
		gap: 0.8rem;
	}
	.menu.desktop {
		margin-left: auto;
	}
	.socials {
		display: flex;
		align-items: center;
		gap: 0.2rem;
		color: var(--sk-fg-3);
	}
	.socials a {
		display: grid;
		place-content: center;
		width: 3.2rem;
		height: 3.2rem;
		color: inherit;
	}
	.socials a:hover {
		color: var(--sk-fg-1);
	}

	.mobile {
		display: none;
	}
	.menu.mobile {
		margin-left: auto;
	}

	.mobile-menu {
		position: fixed;
		top: var(--sk-nav-height);
		left: 0;
		width: 100%;
		z-index: 99;
		background: var(--sk-bg-1);
		border-bottom: 1px solid var(--sk-border);
		padding: 1rem var(--sk-page-padding-side) 2rem;
		display: flex;
		flex-direction: column;
		box-shadow: var(--sk-shadow);
	}
	:root.dark .mobile-menu {
		background: var(--sk-bg-3);
	}
	.mobile-menu .group-title {
		font: var(--sk-font-ui-large);
		font-size: 1.8rem;
		color: var(--sk-fg-1);
		padding: 1.2rem 0 0.4rem;
		text-decoration: none;
		font-family: var(--sk-font-family-heading);
	}
	.mobile-menu .sub {
		color: var(--sk-fg-2);
		padding: 0.6rem 0 0.6rem 1.2rem;
		text-decoration: none;
		font: var(--sk-font-ui-medium);
	}
	.mobile-socials {
		display: flex;
		gap: 1.5rem;
		margin-top: 2rem;
		color: var(--sk-fg-3);
	}

	@media (max-width: 899px) {
		.desktop {
			display: none;
		}
		.mobile {
			display: flex;
		}
		.wordmark {
			font-size: 2rem;
		}
	}
</style>
