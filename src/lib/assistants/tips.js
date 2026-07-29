/**
 * Everything the Office Assistant can say.
 *
 * Nothing here is generated, it is a fixed list, picked from at random, the way the real Office Assistants worked.
 * Tips are chosen from three pools:
 *
 *   1. TOPIC_TIPS: Matched against the current page's path and title
 *   2. DOC_TIPS: General Apoli/Origins advice, shown anywhere in /docs
 *   3. TRIVIA: Real-world facts, loosely themed on whatever you're reading
 *
 * Real-world facts are true. Anything about a power type's "original design" is
 * affectionate nonsense and should be read as such.
 */

/** Matched by keyword against `<path> <title>`, lower-cased. */
export const TOPIC_TIPS = [
	{
		keys: ['vine', 'climb', 'grapple', 'rope'],
		tips: [
			"Charles Darwin wrote a whole book about vines — *The Movements and Habits of Climbing Plants*, 1875. He timed them. For years.",
			"A climbing vine finds its support by circling: the tip sweeps a slow circle in the air until it touches something. That sweep is called circumnutation.",
			"Rope powers started life as one hard-coded grappling hook. Now they're a whole physics subsystem with anchors and verlet integration. Things escalate."
		]
	},
	{
		keys: ['radial', 'menu', 'wheel'],
		tips: [
			"The radial menu takes its name from the radial tyre, patented in 1915 by Arthur W. Savage — the same man who founded Savage Arms.",
			"Radial menus are genuinely faster to hit than lists. Fitts's law: every wedge is the same distance away, and the wedges have effectively infinite depth."
		]
	},
	{
		keys: ['raycast', 'ray', 'laser', 'beam'],
		tips: [
			"A raycast doesn't actually travel. It solves for where a line meets a box, all in one tick. The beam you see is just particles you asked for.",
			"`pierce_blocks` and `pierce_entities` used to be one flag. Turns out people wanted lasers that go through walls *or* through crowds, but rarely both."
		]
	},
	{
		keys: ['elytra', 'flight', 'fly', 'wing'],
		tips: [
			"'Elytron' is Greek for sheath. On a beetle it's the hardened forewing that folds over the real, flying pair underneath.",
			"Bees don't fly the way old textbooks said they couldn't. Their wings sweep back and forth and rotate at the ends, making little vortices that pull them up."
		]
	},
	{
		keys: ['damage', 'hit', 'attack', 'hurt'],
		tips: [
			"Sharks can feel electric fields. The ampullae of Lorenzini — jelly-filled pits clustered around the snout — pick up the faint current of a muscle twitch. So yes: sensitive on the nose.",
			"`modify_damage` handles dealt and taken damage through one type with two aliases. That merge deleted about four hundred lines of near-identical code."
		]
	},
	{
		keys: ['fire', 'burn', 'flame', 'lava'],
		tips: [
			"A candle flame is about 1,000 °C at its hottest and mostly hollow — the bright part is soot glowing on its way out.",
			"Fire powers are the single most common thing people build first. Second most common: the thing that makes them immune to their own fire powers."
		]
	},
	{
		keys: ['water', 'swim', 'aqua', 'fluid', 'drown'],
		tips: [
			"Water is one of very few substances whose solid form floats on its liquid form. Lakes freeze from the top, which is the only reason anything survives in them.",
			"Fluid conditions test the fluid the entity is *in*, not the block it's standing on. That distinction eats an afternoon of debugging roughly once a month."
		]
	},
	{
		keys: ['attribute', 'modifier', 'health', 'speed'],
		tips: [
			"Attribute modifiers stack in three passes: add, multiply-base, multiply-total. Getting that order wrong is how you end up with 400 hearts.",
			"When a power changes max health, Apoli scales your current health to keep the same fill ratio. Otherwise every relog would look like a near-death experience."
		]
	},
	{
		keys: ['skill', 'tree', 'point'],
		tips: [
			"A skill file and a tree file live in the same folder. The only difference is that a skill has a `parent`. That's it. That's the whole rule.",
			"A skill with no power attached is a free pass-through node — good for branching a tree without charging anyone for the fork."
		]
	},
	{
		keys: ['origin', 'layer', 'orb'],
		tips: [
			"An origin is only a name, an icon and a list of Apoli powers. Everything it can actually *do* comes from Apoli.",
			"Origins can now use a plain texture as an icon, so you no longer have to register an item that exists purely to be a picture."
		]
	},
	{
		keys: ['command', 'selector'],
		tips: [
			"`@a[origin=example:phoenix]` works anywhere a selector does — predicates, `/execute`, advancement rewards, all of it.",
			"Every Apoli command returns a count, so `execute store result score …` will happily read it back for you."
		]
	},
	{
		keys: ['keybind', 'key', 'toggle', 'active'],
		tips: [
			"You can suppress every power bound to one key at once. Handy when a pack has piled twelve abilities onto the same button.",
			"QWERTY was not designed to slow typists down. That's a myth. It was designed around which letter pairs jammed the typebars."
		]
	},
	{
		keys: ['particle', 'render', 'model', 'texture', 'overlay'],
		tips: [
			"Server-side particle spawning costs you a packet per call. `spacing` exists so you can trade smoothness for bandwidth on purpose.",
			"The colour of a soap bubble isn't pigment — it's the film's thickness cancelling out some wavelengths of light. Thin-film interference."
		]
	},
	{
		keys: ['clone', 'summon', 'minion'],
		tips: [
			"A clone copies your skin, your name and your armour, then goes and fights for you. It does not copy your judgement.",
			"Give a summon a `summon_id` and you can remove exactly that batch later, instead of every clone you own."
		]
	},
	{
		keys: ['condition', 'nbt'],
		tips: [
			"Conditions are pure tests — they never change anything. If a condition seems to have a side effect, it isn't a condition.",
			"Every condition accepts `inverted: true`. It's implemented once at the wrapper codec, not on each type, which is why it works on all of them."
		]
	},
	{
		keys: ['disguise'],
		tips: [
			"A disguise is rendering only. The hitbox, the AI and the loot table all know exactly what you really are.",
			"The mimic octopus can impersonate at least fifteen other species, including a lionfish and a sea snake. It picks based on what's threatening it."
		]
	},
	{
		keys: ['sound', 'voice', 'speech'],
		tips: [
			"Loudness in the voice-chat powers is inferred from frame size, not amplitude. It's a proxy, and a surprisingly good one.",
			"There is no upper limit to how quiet a sound can be, but there is a lower limit to what you can hear: below about 0 dB SPL you'd be hearing your own blood."
		]
	}
];

/** Shown anywhere under /docs. */
export const DOC_TIPS = [
	'It looks like you are writing a power. Would you like help with that? (There is no help. There is only the fields table.)',
	'Every field on this page was read out of the codec, not out of somebody\'s memory. If it says the default is `true`, the default is `true`.',
	'Powers are just JSON. If a thing can be done from Java, the goal is that it can be done from a data pack too.',
	'Press ⌘K — or Ctrl-K, or just `/` — to search the whole Handbook.',
	'`apoli:multiple` expands its sub-powers at load time. `fire` with a `dome` block inside becomes `fire` plus `fire_dome`, and both are real powers you can grant.',
	'The `origins:` namespace still works for Apoli types. It falls back to `apoli:` so old packs keep loading.',
	'A power that fails to parse tells you which field it choked on. The log is worth reading before the forums.',
	'Loading priority breaks ties when two packs define the same id. Higher wins.',
	'If a type only exists when another mod is installed, it lives under Compatibility, not Data Pack.',
	'Most "my power stopped working" reports are a condition that quietly went false. Check the condition first.'
];

/** Real-world facts, for when nothing else fits. */
export const TRIVIA = [
	'Did you know? Sharks are extremely sensitive on the nose — the ampullae of Lorenzini there can detect a field of a few billionths of a volt per centimetre.',
	'Did you know? Honeybees tell each other where flowers are by dancing. Karl von Frisch worked out the grammar of it and got a Nobel Prize in 1973.',
	'Did you know? Octopuses have three hearts. Two pump blood through the gills, one through the rest of the body — and that one stops when they swim.',
	'Did you know? A day on Venus is longer than a year on Venus.',
	'Did you know? Wombat droppings are cubes. The last stretch of intestine has stiff and stretchy sections that shape them.',
	'Did you know? Bananas are berries. Strawberries are not.',
	'Did you know? The shortest war on record lasted somewhere around forty minutes.',
	'Did you know? Sea otters hold hands while they sleep so they do not drift apart.',
	'Did you know? Honey does not spoil. Jars of it from ancient Egyptian tombs were still edible.',
	'Did you know? A group of flamingos is called a flamboyance.',
	'Did you know? Lightning is roughly five times hotter than the surface of the Sun.',
	'Did you know? Sloths can hold their breath longer than dolphins — around forty minutes, by slowing their heart rate.'
];

/** Greetings, said on first appearance. */
export const GREETINGS = [
	'It looks like you are reading documentation. Would you like some help?',
	'Hello! I am here to be moderately useful and extremely nostalgic.',
	'I noticed you opened the Handbook. I have opinions.',
	'Need a hand? I have several. Well — one. Depending on which of us you got.',
	'It looks like you are trying to build a power. Would you like a tip you did not ask for?'
];

/** Said when you click them again and again. */
export const NUDGES = [
	'Still here.',
	'You can pick a different assistant from my menu. I will not be offended. Much.',
	'I can be turned off, you know. Right-click me.',
	'Would you like me to keep going? I can keep going.',
	'This is the part where I would normally offer to write a letter.'
];

const norm = (s) => (s || '').toLowerCase();

/**
 * Build the pool of lines for a page.
 * @param {string} path  current pathname
 * @param {string} title current page title
 */
export function tipsFor(path, title) {
	const haystack = `${norm(path)} ${norm(title)}`;
	const topical = [];
	for (const group of TOPIC_TIPS) {
		if (group.keys.some((k) => haystack.includes(k))) topical.push(...group.tips);
	}
	const inDocs = norm(path).includes('/docs');
	const pool = [...topical, ...topical, ...(inDocs ? DOC_TIPS : []), ...TRIVIA];
	return pool.length ? pool : [...DOC_TIPS, ...TRIVIA];
}

export function pick(list, avoid) {
	if (!list.length) return '';
	const options = list.length > 1 ? list.filter((l) => l !== avoid) : list;
	return options[Math.floor(Math.random() * options.length)];
}
