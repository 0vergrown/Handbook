/**
 * Site-wide configuration. Fill in the URLs marked TODO once they exist.
 * Everything user-facing that isn't documentation content lives here.
 */
export const SITE = {
	name: 'Handbook',
	tagline: 'The manual for the Apoli power engine and the Origins addon.',
	description:
		'Documentation for Apoli — the data-driven power engine for Minecraft — and Origins, the addon built on top of it.',

	// Social / community
	github: 'https://github.com/0vergrown',
	x: 'https://x.com/OvergrownMC',
	discord: 'https://discord.gg/', // TODO: replace with the real invite

	// Download destinations.
	downloads: {
		modrinth: 'https://modrinth.com/user/Overgrown/mods',
		curseforge: 'https://www.curseforge.com/members/overgrownmc/projects',
		mods: [
			{
				name: 'Apoli',
				blurb: 'The engine. Adds the power system every origin is built from.',
				modrinth: 'https://modrinth.com/mod/opoli',
				curseforge: 'https://www.curseforge.com/minecraft/mc-mods/opoli'
			},
			{
				name: 'Origins',
				blurb: 'The addon. Pick an origin at spawn and play with its powers.',
				modrinth: 'https://modrinth.com/mod/o-origins',
				curseforge: 'https://www.curseforge.com/minecraft/mc-mods/o-origins'
			}
		]
	}
};
