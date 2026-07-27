export const LICENSE = {
	name: 'The Overgrown License',
	updated: '2026-07-27',

	lead: 'Apoli and Origins are distributed under a reasonably open license. Have a read through this if you want to do anything with them beyond playing.',

	intro: [
		'You are free to <strong>use</strong>, <strong>share</strong> and <strong>adapt</strong> both mods. Those rights cannot be taken away from you as long as you follow the terms below.',
		'If you just want to play, or you are building a data pack or an addon, none of this is likely to affect you — see the <a href="#building-on-apoli">Building on Apoli</a> section and carry on.'
	],

	sections: [
		{
			id: 'general',
			kicker: 'Applies to everything',
			heading: 'General Clauses',
			blurb: 'These apply on top of every other section on this page.',
			clauses: [
				{
					name: 'Extent',
					icon: 'layers',
					tone: 'info',
					text: 'This license covers <strong>Apoli</strong>, <strong>Origins</strong>, this website, and all other code, assets and binaries in their repositories, unless a file says otherwise. Where a bundled file carries its own license, that one wins for that file.'
				},
				{
					name: 'Waiver',
					icon: 'thumbs-up',
					tone: 'allow',
					text: 'Any restriction on this page can be set aside with personal permission. Read the next clause before asking.'
				},
				{
					name: 'Personal Permission',
					icon: 'message-circle',
					tone: 'info',
					text: "Personal permission is granted rarely — usually only where there's a good reason for it — because granting it reads as an endorsement. If what you want to do is already allowed below, you do not need to ask, and asking will most likely just get you pointed back at this page."
				},
				{
					name: 'Informal',
					icon: 'file-text',
					tone: 'info',
					text: "This license will not hold up in court, and there is no intention of taking anyone to one. The realistic worst case for breaking it is being asked to put it right — though a distribution platform such as Modrinth or CurseForge may take your project down. Breaking it also makes you a jerk, and you don't want to be a jerk."
				}
			]
		},
		{
			id: 'distributing',
			kicker: 'If you want to',
			heading: 'Distribute the mods',
			blurb: 'Making the binaries, assets or source available from somewhere other than the original download pages — in a modpack, on a mirror, or bundled with a server.',
			clauses: [
				{
					name: 'Modpack',
					icon: 'package',
					tone: 'allow',
					text: 'You may put either mod in a modpack without asking. That is what they are for. This holds whether the pack is public, private, or for one server.'
				},
				{
					name: 'Attribution',
					icon: 'user',
					tone: 'info',
					text: 'Credit Overgrown as the author of the parts you are distributing. If you changed anything, say that you did. A link back is optional but appreciated.'
				},
				{
					name: 'Non-Monetary',
					icon: 'dollar-sign',
					tone: 'deny',
					text: 'You may not charge for access to the distribution or otherwise make money from it. That includes ad-gated links and URL shorteners, download services that slow you down unless you pay, and putting any part of the download behind a paywall. Selling in-game goods or cosmetics on a server is not distribution and is between you and the Minecraft EULA.'
				}
			]
		},
		{
			id: 'featuring',
			kicker: 'If you want to',
			heading: 'Feature the mods',
			blurb: 'Using either mod somewhere you are not handing out binaries, assets or source — a video, a stream, a review, a public server.',
			clauses: [
				{
					name: 'Free Rein',
					icon: 'thumbs-up',
					tone: 'allow',
					text: 'Go ahead. You do not need permission, you do not need to ask, and you may monetise the video or stream as usual — the Non-Monetary Clause is about distributing the files, not about your content.'
				},
				{
					name: 'Thief',
					icon: 'lock',
					tone: 'deny',
					text: 'Do not claim you made either mod. Crediting Overgrown makes you cooler, but it is not required.'
				}
			]
		},
		{
			id: 'building-on-apoli',
			kicker: 'If you want to',
			heading: 'Build on Apoli',
			blurb: 'Writing a data pack, or a Java addon that registers its own power, action and condition types against the Apoli API.',
			clauses: [
				{
					name: 'Data Pack',
					icon: 'folder',
					tone: 'allow',
					text: 'Data packs and resource packs you write are entirely yours. Powers, origins, layers and badges are your content, not a derivative of the mod, and nothing on this page applies to them. License and sell them however you like.'
				},
				{
					name: 'Addon',
					icon: 'puzzle',
					tone: 'allow',
					text: 'An addon that depends on Apoli and calls its API is <strong>not</strong> a derivative work of it. Your addon is yours, under any license you choose — including a closed one — as long as you do not copy Apoli\'s own code into it. This is the whole point of the engine; the <a href="/docs/addon">Addon docs</a> exist so you can do exactly this.'
				},
				{
					name: 'Compatibility',
					icon: 'shuffle',
					tone: 'allow',
					text: 'You may ship compatibility code for Apoli or Origins in your own mod, including mixins into them, without asking. Please prefer the public API where one exists so your compat does not break every update.'
				}
			]
		},
		{
			id: 'using-code',
			kicker: 'If you want to',
			heading: 'Use the code or assets',
			blurb: 'Copying source, textures or models out of either mod into your own project, or forking one of them. This is the one section with real conditions attached.',
			clauses: [
				{
					name: 'Attribution',
					icon: 'user',
					tone: 'info',
					text: 'Credit Overgrown as the author of the parts you are using, and say so if you altered them.'
				},
				{
					name: 'Copyleft',
					icon: 'shuffle',
					tone: 'info',
					text: 'Your project must be open source — source visible, redistribution and modification allowed — and must carry a clause much like this one.'
				},
				{
					name: 'Fork',
					icon: 'thumbs-up',
					tone: 'allow',
					text: 'You may fork either mod, including to keep an old version alive or to take it somewhere it is not going. Give it a distinct name and mod id so nobody installs yours expecting this one.'
				},
				{
					name: 'Upstream',
					icon: 'file-text',
					tone: 'info',
					text: 'Both mods are reimplementations of apace100\'s original Apoli and Origins and inherit obligations from them. Where any file traces back to that work, its original license travels with it, and this page cannot remove those terms.'
				}
			]
		}
	],

	footnote:
		'Presentation and clause structure adapted, with thanks, from <a href="https://psi.vazkii.net/license.php" target="_blank" rel="noreferrer">the Psi License</a> by Vazkii.'
};
