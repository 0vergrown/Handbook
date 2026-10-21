export const TOPICS = {
	datapack: {
		title: 'Data Pack',
		description: 'Powers, actions, conditions and data types, written in JSON.'
	},
	addon: {
		title: 'Addon',
		description: 'The Java API for registering your own types and working with the systems Apoli runs on.'
	},
	compat: {
		title: 'Compatibility',
		description: 'The mods Apoli works with, and the types each one adds.'
	}
};

export const TOPIC_ORDER = ['datapack', 'addon', 'compat'];

export const SECTION_TITLES = {
	api: 'API',
	json: 'JSON',
	'json-format': 'JSON Format',
	faq: 'FAQ',
	npcs: 'NPCs',
	'bientity-actions': 'Bi-Entity Actions',
	'bientity-conditions': 'Bi-Entity Conditions',
	'meta-actions': 'Meta-Actions',
	'meta-conditions': 'Meta-Conditions',
	'simple-voice-chat': 'Simple Voice Chat',
	'hardcore-revival': 'Hardcore Revival',
	'not-enough-recipe-book': 'Not Enough Recipe Book',
	'writing-compat': 'Writing Compat',
	'pufferfishs-skills': "Pufferfish's Skills",
	'better-combat': 'Better Combat',
	'youre-in-grave-danger': "You're in Grave Danger",
	'gravestone-mod': 'GraveStone Mod',
	woodwalkers: 'WoodWalkers',
	kubejs: 'KubeJS',
	'performance-mods': 'Performance Mods',
	'advancement-triggers': 'Advancement Triggers'
};

export const SECTION_DESCRIPTIONS = {
	'datapack/introduction': 'How powers, actions, conditions and data types fit together in a data pack.',
	'datapack/powers': 'Every power type, the building blocks a data pack grants to entities.',
	'datapack/entity-actions': 'Actions that run on a single entity.',
	'datapack/bientity-actions': 'Actions that run on a pair of entities, an actor and a target.',
	'datapack/block-actions': 'Actions that run on a block at a position.',
	'datapack/item-actions': 'Actions that change an item stack.',
	'datapack/meta-actions': 'Actions that combine, delay, repeat or choose between other actions, in every flavour.',
	'datapack/entity-conditions': 'Conditions that test a single entity.',
	'datapack/bientity-conditions': 'Conditions that test a pair of entities, an actor and a target.',
	'datapack/block-conditions': 'Conditions that test a block at a position.',
	'datapack/item-conditions': 'Conditions that test an item stack.',
	'datapack/damage-conditions': 'Conditions that test a source of damage and its amount.',
	'datapack/biome-conditions': 'Conditions that test a biome.',
	'datapack/fluid-conditions': 'Conditions that test a fluid.',
	'datapack/meta-conditions': 'Conditions that combine or invert other conditions, in every flavour.',
	'datapack/data-types': 'The value shapes that fields accept, from identifiers to expressions.',
	'datapack/skill-tree': 'Skill trees, the skills in them, and the actions that manage them.',
	'datapack/origins': 'The Origins addon: origins, layers, badges and the types Origins adds.',
	'datapack/commands': 'The commands Apoli and Origins add, and who can run them.',
	'datapack/advancement-triggers': 'The advancement triggers Apoli and Origins add.',
	'addon/introduction': 'What the Java API is for, and how to set up an addon.',
	'addon/api': 'Registering power types, actions, conditions and data types from Java.',
	'addon/systems': 'The systems under the powers: the container, saved state, networking, expressions and performance.',
	'addon/loaders': 'What differs between loaders and Minecraft versions.',
	'addon/cookbook': 'Worked answers to the questions addon authors ask most.',
	'compat/introduction': 'The mods Apoli integrates with, and what each integration adds.',
	'compat/simple-voice-chat': 'Powers and conditions that react to voice chat.',
	'compat/accessories': 'Accessory slot types for Trinkets, Accessories and Curios.',
	'compat/figura': 'Figura avatars as player models.',
	'compat/icarus': 'The apoli:wings power, backed by Icarus.',
	'compat/hardcore-revival': 'Knockout and revive types for Hardcore Revival.',
	'compat/not-enough-recipe-book': 'Power-gated recipes with the recipe book removed.',
	'compat/writing-compat': 'How to integrate an addon with other mods without depending on them.',
	'compat/skin-rendering': '3D Skin Layers and Ears following the model and colour powers.',
	'compat/sable': 'Phasing, walking on fluid and ropes on Sable sub-levels.',
	'compat/pufferfishs-skills': "Apoli powers and resources as Pufferfish's Skills rewards.",
	'compat/better-combat': "The crash Apoli prevents in Better Combat's attack handling.",
	'compat/woodwalkers': 'Conditions, actions and powers for WoodWalkers shapes.',
	'compat/kubejs': 'Writing power behaviour in JavaScript with KubeJS.',
	'compat/performance-mods': "Apoli's render powers alongside Sodium, Flywheel and other performance mods.",
	'compat/block-logging': 'Ledger and Indexor entries that name the power behind a block edit.',
	'compat/custom-entity-models': "Apoli's render powers on top of EMF and CEM packs.",
	'compat/youre-in-grave-danger': "Power inventories and grave inscriptions with You're in Grave Danger.",
	'compat/gravestones': "Power inventories and grave inscriptions with Pneumono's Gravestones.",
	'compat/gravestone-mod': 'Power inventories and grave inscriptions with the GraveStone Mod.'
};
