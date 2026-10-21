<script>
	import { base } from '$app/paths';
	import nav from 'virtual:handbook/nav';
	import { SITE } from '$lib/config.js';
	import TOC from '$lib/components/TOC.svelte';
	import TOCCollapsible from '$lib/components/TOCCollapsible.svelte';

	const downloads = SITE.downloads;

	const headings = [
		...downloads.mods.map((mod) => ({ slug: mod.name.toLowerCase(), title: mod.name, children: [] })),
		{ slug: 'supported-versions', title: 'Supported versions', children: [] },
		{ slug: 'where-to-start', title: 'Where to start', children: [] }
	];
</script>

<svelte:head>
	<title>Download | {SITE.name}</title>
	<meta name="description" content="Download Apoli and Origins from Modrinth or CurseForge, and check which loaders and Minecraft versions they support." />
</svelte:head>

<main id="main" class="container page-container">
	<div class="row page-row">
		<div class="col col--8">
			<article>
				<TOCCollapsible {headings} />
				<div class="markdown">
					<header>
						<h1>Download</h1>
					</header>
					<p>
						Both mods are published on Modrinth and CurseForge. Origins needs Apoli installed, and on Fabric both
						of them also need Fabric API.
					</p>

					{#each downloads.mods as mod (mod.name)}
						<h2 id={mod.name.toLowerCase()}>
							{mod.name}<a class="hash-link" href="#{mod.name.toLowerCase()}" aria-label="Direct link to {mod.name}" title="Direct link to {mod.name}"></a>
						</h2>
						<p>{mod.description}</p>
						<p class="download-buttons">
							<a class="button button--lg" href={mod.modrinth} target="_blank" rel="noopener noreferrer">Modrinth</a>
							<a class="button button--secondary button--lg" href={mod.curseforge} target="_blank" rel="noopener noreferrer">CurseForge</a>
						</p>
					{/each}

					<h2 id="supported-versions">
						Supported versions<a class="hash-link" href="#supported-versions" aria-label="Direct link to Supported versions" title="Direct link to Supported versions"></a>
					</h2>
					<p>Apoli and Origins support the same loaders and game versions.</p>
					<table>
						<thead>
							<tr>
								<th>Minecraft</th>
								<th>Fabric</th>
								<th>NeoForge</th>
							</tr>
						</thead>
						<tbody>
							{#each downloads.versions as version (version.minecraft)}
								<tr>
									<td>{version.minecraft}</td>
									<td>{version.fabric ? `Yes, needs ${version.fabric}` : 'No'}</td>
									<td>{version.neoforge ? `Yes, needs ${version.neoforge}` : 'No'}</td>
								</tr>
							{/each}
						</tbody>
					</table>

					<h2 id="where-to-start">
						Where to start<a class="hash-link" href="#where-to-start" aria-label="Direct link to Where to start" title="Direct link to Where to start"></a>
					</h2>
					<p>
						If you only want to play, install Origins and Apoli. To make your own powers, read the
						<a href="{base}/docs/{nav.first.datapack}/">Data Pack docs</a>. To extend Apoli from Java, read the
						<a href="{base}/docs/{nav.first.addon}/">Addon docs</a>.
					</p>
					<p>
						Every other Overgrown project is in the <a href={downloads.modrinth} target="_blank" rel="noopener noreferrer">Modrinth collection</a>
						and on the <a href={downloads.curseforge} target="_blank" rel="noopener noreferrer">CurseForge profile</a>.
					</p>
				</div>
			</article>
		</div>
		<div class="col col--2">
			<TOC {headings} />
		</div>
	</div>
</main>
