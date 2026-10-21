export const SITE = {
	name: 'Handbook',
	description:
		'Documentation for Apoli, a data-driven power engine for Minecraft, and Origins, the mod built on it.',
	author: 'Overgrown',
	repo: 'https://github.com/0vergrown/Handbook',
	github: 'https://github.com/0vergrown',
	discord: 'https://discord.gg/Th7q5BXPjG',
	x: 'https://x.com/OvergrownMC',
	downloads: {
		modrinth: 'https://modrinth.com/collection/P0Z8iLdQ',
		curseforge: 'https://www.curseforge.com/members/overgrownmc/projects',
		mods: [
			{
				name: 'Apoli',
				description:
					'The power engine. Every power, action and condition in these docs comes from it, and data packs and addons build on it.',
				modrinth: 'https://modrinth.com/mod/opoli',
				curseforge: 'https://www.curseforge.com/minecraft/mc-mods/apoli'
			},
			{
				name: 'Origins',
				description:
					'Players pick an origin when they first join and get its powers. It needs Apoli to run.',
				modrinth: 'https://modrinth.com/mod/overgrowns-origins',
				curseforge: 'https://www.curseforge.com/minecraft/mc-mods/o-origins'
			}
		],
		versions: [
			{ minecraft: '1.21.1', fabric: 'Java 21', neoforge: 'Java 21' },
			{ minecraft: '1.20.1', fabric: 'Java 17', neoforge: null }
		]
	}
};
