<script>
	import { base } from '$app/paths';
	import nav from 'virtual:handbook/nav';
	import { SITE } from '$lib/config.js';
	import ExternalIcon from './ExternalIcon.svelte';

	const year = new Date().getFullYear();

	const columns = [
		{
			title: 'Docs',
			links: [
				{ label: 'Data Pack', href: `/docs/${nav.first.datapack}/` },
				{ label: 'Addon', href: `/docs/${nav.first.addon}/` },
				{ label: 'Compatibility', href: `/docs/${nav.first.compat}/` }
			]
		},
		{
			title: 'Community',
			links: [
				{ label: 'Discord', href: SITE.discord, external: true },
				{ label: 'X', href: SITE.x, external: true }
			]
		},
		{
			title: 'More',
			links: [
				{ label: 'Blog', href: '/blog/' },
				{ label: 'Download', href: '/download/' },
				{ label: 'License', href: '/license/' },
				{ label: 'GitHub', href: SITE.github, external: true }
			]
		}
	];
</script>

<footer class="footer">
	<div class="container">
		<div class="row footer__links">
			{#each columns as column (column.title)}
				<div class="col footer__col">
					<div class="footer__title">{column.title}</div>
					<ul class="footer__items clean-list">
						{#each column.links as link (link.label)}
							<li class="footer__item">
								{#if link.external}
									<a class="footer__link-item" href={link.href} target="_blank" rel="noopener noreferrer">
										{link.label}<ExternalIcon />
									</a>
								{:else}
									<a class="footer__link-item" href="{base}{link.href}">{link.label}</a>
								{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
		<div class="text--center">
			<div class="footer__copyright">
				Copyright © {year} {SITE.author}. Apoli, Origins and this website are covered by
				<a href="{base}/license/">the A/O License</a>.
			</div>
		</div>
	</div>
</footer>
