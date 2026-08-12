/**
 * Documentation topics. Each key is a folder under src/content/docs/.
 *
 *   datapack -> the JSON side: powers, actions, conditions, data types
 *   addon    -> the Java side: the API, systems, and how to extend Apoli
 *   compat   -> per-mod integrations and the types each one unlocks
 */
export const TOPICS = {
	datapack: {
		title: 'Data Pack',
		blurb: 'Build powers, actions, conditions and origins in JSON — no code required.'
	},
	addon: {
		title: 'Addon',
		blurb: 'Extend Apoli from Java: the API, its systems, and how to register your own types.'
	},
	compat: {
		title: 'Compatibility',
		blurb: 'The mods Apoli integrates with, and the extra types each one unlocks.'
	}
};

export const TOPIC_ORDER = ['datapack', 'addon', 'compat'];

/**
 * Human titles for section folders where simple title-casing isn't enough.
 * Keyed by the folder name with its numeric prefix stripped.
 */
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
	'better-combat': 'Better Combat'
};
