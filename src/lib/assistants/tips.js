/**
 * Everything the Office Assistant can say.
 *
 * Nothing here is generated, it is a fixed list, picked from at random, the way the real Office Assistants worked.
 * Tips are chosen from three pools:
 *
 *   1. TOPIC_TIPS: Matched against the current page's path and title
 *   2. DOC_TIPS: General Apoli/Origins advice
 *   3. TRIVIA: Real-world facts, loosely themed on whatever you're reading
 *
 * Real-world facts are true. Anything about a power type's "original design" is
 * affectionate nonsense and should be read as such.
 *
 * Picking goes through pick(), which remembers the last RECENT_MEMORY lines and
 * refuses to repeat any of them. Keep the pools comfortably larger than that
 * number or the assistant starts sounding like a loop.
 */

/** Matched by keyword against `<path> <title>`, lower-cased. */
export const TOPIC_TIPS = [
	{
		keys: ['vine', 'climb', 'grapple', 'rope', 'swing'],
		tips: [
			'Charles Darwin wrote a whole book about vines. *The Movements and Habits of Climbing Plants*, 1875. He timed them. For years.',
			'A climbing vine finds its support by circling: the tip sweeps a slow circle in the air until it touches something. That sweep is called circumnutation.',
			'Rope powers started life as one hard-coded grappling hook. Now they are a whole physics subsystem with anchors and verlet integration. Things escalate.',
			'If a rope feels like a teleport rather than a swing, the power is usually applying one big impulse. Reel it in over several ticks instead.',
			'Ropes can anchor to a block or to another entity. An entity anchor that despawns takes the rope with it, which is deliberate.',
			'Tendrils can pull with surprising force. A gourd vine can lift several kilograms by coiling like a spring after it has grabbed on.'
		]
	},
	{
		keys: ['radial', 'menu', 'wheel'],
		tips: [
			'The radial menu takes its name from the radial tyre, patented in 1915 by Arthur W. Savage, the same man who founded Savage Arms.',
			'Radial menus are genuinely faster to hit than lists. Fitts\'s law: every wedge is the same distance away, and the wedges have effectively infinite depth.',
			'The radial menu is server-authoritative. The client draws it, but the server decides what was on it and which slot you actually picked.',
			'Sixteen entries is the practical ceiling for a radial menu. Past that the wedges get thinner than your aim.',
			'Pie menus were being studied in the mid-1980s, well before games made them fashionable. The research name for them is "pie menu", not "radial".'
		]
	},
	{
		keys: ['raycast', 'ray', 'laser', 'beam', 'pierce'],
		tips: [
			'A raycast does not actually travel. It solves for where a line meets a box, all in one tick. The beam you see is just particles you asked for.',
			'`pierce_blocks` and `pierce_entities` used to be one flag. It turns out people wanted lasers that go through walls *or* through crowds, but rarely both.',
			'Used as a bi-entity action, a raycast aims straight at the target and stops there. That is the "is there a wall between us" trace.',
			'`cone_angle` swaps the beam for a cone. Thirty degrees gives you a sixty degree spread, which is about right for a shout.',
			'A chained raycast starts from where the last one ended. Set `chain_direction` to `reflect` and it bounces off the surface normal.',
			'Light really does travel about 30 centimetres per nanosecond. Grace Hopper used to hand out lengths of wire that long to explain latency.'
		]
	},
	{
		keys: ['elytra', 'flight', 'fly', 'wing', 'glide'],
		tips: [
			'"Elytron" is Greek for sheath. On a beetle it is the hardened forewing that folds over the real, flying pair underneath.',
			'Bees do not fly the way old textbooks said they could not. Their wings sweep back and forth and rotate at the ends, making little vortices that pull them up.',
			'A peregrine falcon in a stoop is the fastest animal alive, past 300 km/h. It has bony baffles in its nostrils so the airflow does not stop it breathing.',
			'Hummingbirds can fly backwards. They are the only birds that can do it properly, because their wings rotate at the shoulder.',
			'Flight powers are the fastest way to discover which parts of your world have no floor.',
			'Albatrosses can stay airborne for years at a stretch, sleeping on the wing and only landing to breed.'
		]
	},
	{
		keys: ['damage', 'hit', 'attack', 'hurt', 'kill'],
		tips: [
			'Did you know? Sharks are extremely sensitive on the nose. The ampullae of Lorenzini there pick up the faint current of a muscle twitch.',
			'`modify_damage` handles dealt and taken damage through one type with two aliases. That merge deleted about four hundred lines of near-identical code.',
			'A mantis shrimp punches fast enough to boil the water in front of its claw. The collapsing bubble hits a second time, on its own.',
			'`action_on_hit` fires when you hit something. `action_when_hit` fires when something hits you. People get these the wrong way round constantly.',
			'If a power deals zero damage to a player, Apoli nudges it to a hair above zero so the hit still registers. Vanilla drops true zeroes.',
			'Damage conditions can test the source, the amount and the type all at once. Most "my armour power does nothing" reports are a missing damage condition.'
		]
	},
	{
		keys: ['fire', 'burn', 'flame', 'lava', 'blaze'],
		tips: [
			'A candle flame is about 1,000 °C at its hottest and mostly hollow. The bright part is soot glowing on its way out.',
			'Fire powers are the single most common thing people build first. Second most common: the thing that makes them immune to their own fire powers.',
			'Lightning is roughly five times hotter than the surface of the Sun, and about as wide as your thumb.',
			'The blue part of a flame is hotter than the yellow part. Yellow is incandescent soot, blue is the gas actually burning.',
			'Immunity to your own fire is a condition on the damage, not on the fire. Test the damage source, not the entity.'
		]
	},
	{
		keys: ['water', 'swim', 'aqua', 'fluid', 'drown', 'ocean'],
		tips: [
			'Water is one of very few substances whose solid form floats on its liquid form. Lakes freeze from the top, which is the only reason anything survives in them.',
			'Fluid conditions test the fluid the entity is *in*, not the block it is standing on. That distinction eats an afternoon of debugging roughly once a month.',
			'Sound travels about four times faster in water than in air, which is why whales can call to each other across an ocean basin.',
			'Sea otters hold hands while they sleep so they do not drift apart. Some of them also keep a favourite rock in a pouch of loose skin.',
			'An octopus has three hearts. Two pump blood through the gills and one through the rest of the body, and that one stops when they swim.',
			'The deepest part of the ocean is nearly eleven kilometres down. If you dropped Everest in, its peak would still be a mile underwater.'
		]
	},
	{
		keys: ['attribute', 'modifier', 'health', 'speed', 'scale', 'size'],
		tips: [
			'Attribute modifiers stack in three passes: add, multiply-base, multiply-total. Getting that order wrong is how you end up with 400 hearts.',
			'When a power changes max health, Apoli scales your current health to keep the same fill ratio. Otherwise every relog would look like a near-death experience.',
			'A giraffe has seven vertebrae in its neck. So do you. Yours are just less ambitious.',
			'Attribute names are namespaced and easy to typo. If a modifier silently does nothing, the id is the first thing to check.',
			'A modifier with no name still works, but it makes the debug output unreadable. Name them after what they do.'
		]
	},
	{
		keys: ['skill', 'tree', 'point', 'purchase'],
		tips: [
			'A skill file and a tree file live in the same folder. The only difference is that a skill has a `parent`. That is it. That is the whole rule.',
			'A skill with no power attached is a free pass-through node, good for branching a tree without charging anyone for the fork.',
			'Points are stored per tree, not per player. Two trees can hand out completely different currencies and never see each other.',
			'Every skill\'s parent chain has to end at a tree file. One that never gets there is dropped with a warning naming the file.',
			'`refundable: false` only stops the in-game refund button. An admin can still un-buy a skill from the command.'
		]
	},
	{
		keys: ['origin', 'layer', 'orb', 'choose'],
		tips: [
			'An origin is only a name, an icon and a list of Apoli powers. Everything it can actually *do* comes from Apoli.',
			'Origins can now use a plain texture as an icon, so you no longer have to register an item that exists purely to be a picture.',
			'Layers are the slots. An origin that is not in a layer exists but can never be chosen, which is occasionally exactly what you want.',
			'Revoking a power an origin granted is temporary. The origin re-applies on relog. Change the origin instead.',
			'`impact` is the little dot rating on the selection screen. It has no mechanical effect at all, it is pure signposting.',
			'The Orb of Origin re-opens the choice. It is the polite way to let people change their mind without a command.'
		]
	},
	{
		keys: ['command', 'selector', 'execute'],
		tips: [
			'`@a[origin=example:phoenix]` works anywhere a selector does. Predicates, `/execute`, advancement rewards, all of it.',
			'Every Apoli command returns a count, so `execute store result score …` will happily read it back for you.',
			'`/power has @s` with no power id prints the whole list, with the source that granted each one. It is the fastest way to see what a player actually has.',
			'`/apoli:clone` has no short alias on purpose. `/clone` is a vanilla command and shadowing it would be rude.',
			'Every Apoli command is registered under its full namespaced name with a short alias pointing at it. Use the long one in functions.',
			'Selector options can be negated. `@a[origin=!example:human]` is everyone who is something else.'
		]
	},
	{
		keys: ['keybind', 'key', 'toggle', 'active', 'press'],
		tips: [
			'You can suppress every power bound to one key at once. Handy when a pack has piled twelve abilities onto the same button.',
			'QWERTY was not designed to slow typists down. That is a myth. It was designed around which letter pairs jammed the typebars.',
			'Held keys are tracked as edges, not as a per-tick scan. That is why a key sequence power can tell a tap from a hold.',
			'A key sequence uses proper string matching, so a failed attempt does not swallow the input that would have started the next one.',
			'The Ctrl-Alt-Delete combination was picked by David Bradley at IBM precisely because you cannot press it by accident with one hand.'
		]
	},
	{
		keys: ['particle', 'render', 'model', 'texture', 'overlay', 'hud'],
		tips: [
			'Server-side particle spawning costs you a packet per call. `spacing` exists so you can trade smoothness for bandwidth on purpose.',
			'The colour of a soap bubble is not pigment. It is the film\'s thickness cancelling out some wavelengths of light. Thin-film interference.',
			'A HUD element only draws when its power is active *and* its condition passes. Two different reasons for an invisible bar.',
			'Model colour is multiplied over the texture, so white is the one colour you cannot get by tinting. Apoli special-cases it.',
			'Butterfly wings are mostly not coloured either. The blue ones are stacked scales bending light, which is why they shift as you turn them.',
			'The platypus glows blue-green under ultraviolet light. Nobody is entirely sure why.'
		]
	},
	{
		keys: ['clone', 'summon', 'minion', 'pet'],
		tips: [
			'A clone copies your skin, your name and your armour, then goes and fights for you. It does not copy your judgement.',
			'Give a summon a `summon_id` and you can remove exactly that batch later, instead of every clone you own.',
			'A clone with `lifetime: -1` never despawns. That is a promise you are making to your server\'s entity count.',
			'Ants farm aphids, keep them as livestock and milk them for honeydew. Some species carry them to better plants.',
			'Summons hold their powers under the `apoli:summon` source, so one revoke by source strips the lot.'
		]
	},
	{
		keys: ['condition', 'nbt', 'predicate'],
		tips: [
			'Conditions are pure tests. They never change anything. If a condition seems to have a side effect, it is not a condition.',
			'Every condition accepts `inverted: true`. It is implemented once at the wrapper codec, not on each type, which is why it works on all of them.',
			'NBT conditions are expensive. Apoli caches the snapshot per tick, but the cheapest NBT check is the one you replaced with a real condition.',
			'`apoli:and` with an empty list is true. `apoli:or` with an empty list is false. This surprises people exactly once.',
			'Most "my power stopped working" reports are a condition that quietly went false. Check the condition before anything else.'
		]
	},
	{
		keys: ['disguise', 'invisible', 'phasing'],
		tips: [
			'A disguise is rendering only. The hitbox, the AI and the loot table all know exactly what you really are.',
			'The mimic octopus can impersonate at least fifteen other species, including a lionfish and a sea snake. It picks based on what is threatening it.',
			'A disguised player takes on that name in chat and the tab list too. People notice the nameplate long before the model.',
			'Cuttlefish change colour using millions of pigment sacs they control individually, and they are almost certainly colour blind while doing it.',
			'Phasing needs both a client and a server side. If you clip through the world but the fog never changes, only half of it is wired up.'
		]
	},
	{
		keys: ['sound', 'voice', 'speech', 'chat'],
		tips: [
			'Loudness in the voice-chat powers is inferred from frame size, not amplitude. It is a proxy, and a surprisingly good one.',
			'Mic mute is client-side only in Simple Voice Chat, so the server genuinely cannot tell. `voice_disabled` means the mod is off, not that you are quiet.',
			'The speech-to-action power runs the recogniser in your browser and posts the text back. No audio ever leaves your machine.',
			'A blue whale\'s call can carry for hundreds of kilometres through deep water, at frequencies mostly below what you can hear.',
			'Parrots do not have vocal cords. They shape sound with the syrinx and the tongue, which is why they can do consonants.'
		]
	},
	{
		keys: ['resource', 'cooldown', 'bar', 'mana'],
		tips: [
			'A resource is just an integer with a HUD bar bolted on. Everything interesting is in what reads it.',
			'A cooldown is a resource that counts itself down. That is genuinely the only difference.',
			'`/resource set` clamps to the power\'s own min and max. If you cannot push it higher, the power says so, not the command.',
			'Resources persist through death by default. If a mechanic should reset on respawn, you have to say so.'
		]
	},
	{
		keys: ['inventory', 'item', 'stack', 'equipment'],
		tips: [
			'An inventory power stores its contents in the entity\'s aux NBT, on the server. The client never holds the authoritative copy.',
			'`drop_on_death` and `recoverable` are separate switches. One decides what falls out, the other decides what you get back.',
			'Item conditions run against a stack, not against an entity. That is why they cannot see who is holding it.',
			'The first bar code was scanned in 1974 and it was a packet of chewing gum. The pack is in a museum.'
		]
	},
	{
		keys: ['block', 'break', 'place', 'mine'],
		tips: [
			'Block conditions get a position and a state. If you need the entity too, you want an entity condition with a block one inside it.',
			'`modify_break_speed` multiplies, it does not set. Stacking two of them multiplies twice, which gets silly fast.',
			'Obsidian is volcanic glass. It cools too quickly for crystals to form, which is why it fractures into blades sharp enough for surgery.',
			'Explosions in Apoli take a shape and a destruction type. The default is not the vanilla default, so read the page.'
		]
	},
	{
		keys: ['effect', 'potion', 'food', 'hunger'],
		tips: [
			'Effect specs take an id, an amplifier and a duration. Amplifier zero is level one. It catches everyone at least once.',
			'Apoli parses both the modern and the legacy effect JSON shapes, so old packs keep loading. New ones should use `id`.',
			'Capsaicin, the heat in chilli, binds to the receptor that normally reports temperature. Your mouth is not damaged, it is misinformed.',
			'Honey does not spoil. Jars found in ancient Egyptian tombs were still edible.'
		]
	},
	{
		keys: ['compat', 'trinket', 'accessor', 'curio', 'figura'],
		tips: [
			'Compatibility types are registration-gated or behaviour-gated. The overview page for each mod says which, and it matters when the mod is missing.',
			'A mixin config plugin must never load a class to check whether a mod is present. Check for the resource instead, or you break other people\'s mixins.',
			'Accessory support goes through one bridge with a backend per mod, so a pack written for Trinkets keeps working on Accessories.'
		]
	}
];

/** Shown anywhere. */
export const DOC_TIPS = [
	'It looks like you are writing a power. Would you like help with that? There is no help. There is only the fields table.',
	"Every field on this page was read out of the codec, not out of somebody's memory. If it says the default is `true`, the default is `true`.",
	'Powers are just JSON. If a thing can be done from Java, the goal is that it can be done from a data pack too.',
	'Press Ctrl-K, or Command-K, or just the slash key, to search the whole Handbook.',
	'`apoli:multiple` expands its sub-powers at load time. A `fire` power with a `dome` block inside becomes `fire` plus `fire_dome`, and both are real powers you can grant.',
	'The `origins:` namespace still works for Apoli types. It falls back to `apoli:` so old packs keep loading.',
	'A power that fails to parse tells you which field it choked on. The log is worth reading before the forums.',
	'Loading priority breaks ties when two packs define the same id. Higher wins.',
	'If a type only exists when another mod is installed, it lives under Compatibility, not Data Pack.',
	'Most "my power stopped working" reports are a condition that quietly went false. Check the condition first.',
	'Every power can take a `condition`. You almost never need a separate "conditioned" variant of a type.',
	'`hidden: true` keeps a power out of the origin screen. It does not stop it working, and it does not stop it being granted.',
	'Names and descriptions fall back to a translation key built from the power id, so you can skip them and add the lang file later.',
	'A power id and a power *type* id are different things. The type is what it is; the id is which one it is.',
	'Sub-power ids are just `parent_key`. Nothing clever is happening, which is why you can grant one directly.',
	'The same power granted by two sources is only gone when both let go. That is how origins, skill trees and commands coexist.',
	'Meta-actions like `apoli:if_else` and `apoli:chance` compose the others. Most complex behaviour is a tree of simple actions.',
	'`apoli:delay` schedules into a tick bucket. It is cheap. Polling every tick to see whether it is time yet is not.',
	'Expressions are compiled once when the power loads, not parsed every time they run.',
	'If you are reaching for a command inside a power, check whether there is an action that does it. There usually is, and it is faster.',
	'Data packs reload with `/reload`. Powers, origins, layers, badges and skill trees all come back fresh.',
	'A JSON file with a trailing comma will not load, and the error message will point at the next line. It is always the comma.',
	'Two packs can define the same origin id. The one with the higher `loading_priority` wins, and the other never says a word about it.',
	'Anything that runs per tick, per entity, is a hot path. Index it, do not scan it.',
	'`apoli:action_over_time` samples once per interval, not once per tick. Setting the interval to 1 removes the point of it.',
	'Bi-entity actions have an actor and a target. Which one is which depends on where the action is nested, and that is the usual bug.',
	'Badges are attached to powers, the same way skills are. If a power has no badge, nothing shows on the origin screen.',
	'The Handbook is generated from the mod source, not from a wiki. If a page is wrong, the fix goes in the same commit as the code.',
	'There is a template for every kind of page in this site. Copying one is faster than guessing the shape.',
	'You can nest conditions as deep as you like. Your future self will have opinions about that.'
];

/** Real-world facts, for when nothing else fits. */
export const TRIVIA = [
	'Did you know? Honeybees tell each other where flowers are by dancing. Karl von Frisch worked out the grammar of it and got a Nobel Prize in 1973.',
	'Did you know? A day on Venus is longer than a year on Venus.',
	'Did you know? Wombat droppings are cubes. The last stretch of intestine has stiff and stretchy sections that shape them.',
	'Did you know? Bananas are berries. Strawberries are not.',
	'Did you know? The shortest war on record lasted somewhere around forty minutes.',
	'Did you know? A group of flamingos is called a flamboyance.',
	'Did you know? Sloths can hold their breath longer than dolphins, around forty minutes, by slowing their heart rate.',
	'Did you know? The first computer bug was an actual moth. It was taped into the logbook, and the logbook still exists.',
	'Did you know? The word "robot" comes from a 1920 Czech play. It is from "robota", meaning forced labour.',
	'Did you know? Wi-Fi does not stand for anything. A branding agency picked it because it sounded like hi-fi.',
	'Did you know? Bluetooth is named after a tenth-century Danish king, and its logo is his initials written in runes.',
	'Did you know? Nintendo was founded in 1889. It made playing cards for most of a century before it made anything electronic.',
	'Did you know? Bubble wrap was invented as textured wallpaper. That did not sell.',
	'Did you know? The Eiffel Tower is about fifteen centimetres taller in summer than in winter.',
	'Did you know? Crows can recognise individual human faces, and hold a grudge for years.',
	'Did you know? Starfish have no brain. They coordinate with a nerve ring and get by perfectly well.',
	'Did you know? A shrimp\'s heart is in its head.',
	'Did you know? Some snails can sleep for up to three years when conditions are bad.',
	'Did you know? Butterflies taste with their feet.',
	'Did you know? Elephants are the only mammal that cannot jump.',
	'Did you know? A narwhal\'s tusk is a tooth. It grows out through the lip, usually on the left.',
	'Did you know? Axolotls can regrow limbs, and parts of their heart and brain, without scarring.',
	'Did you know? Tardigrades have survived being fired into the vacuum of space and brought back.',
	'Did you know? Sperm whales are the loudest animals on Earth. Their clicks would be lethal at close range in air.',
	'Did you know? Cows have best friends and get measurably stressed when separated from them.',
	'Did you know? A bee has a separate stomach for nectar, kept apart from the one it eats with.',
	'Did you know? Old window panes are thicker at the bottom because of how they were made, not because glass flows. Glass is a solid.',
	'Did you know? Ada Lovelace published what is generally considered the first algorithm intended for a machine, in 1843.',
	'Did you know? The "#" symbol has an official-ish name: octothorpe. Nobody agrees who coined it.',
	'Did you know? There are more possible arrangements of a shuffled deck of cards than there are atoms on Earth.',
	'Did you know? Bananas are slightly radioactive, because of the potassium. So are you.',
	'Did you know? Antarctica is technically a desert. It gets less precipitation than the Sahara.',
	'Did you know? A hummingbird\'s heart beats over a thousand times a minute in flight.',
	'Did you know? Sea cucumbers can eject their own internal organs at a predator and grow new ones.',
	'Did you know? Cats cannot taste sweetness. The gene for the receptor is broken in every cat studied.',
	'Did you know? Octopus blood is blue. It carries oxygen with copper instead of iron.',
	'Did you know? The loudest sound in recorded history was Krakatoa in 1883. It was heard nearly five thousand kilometres away.',
	'Did you know? Pineapples take about two years to grow, and each plant makes one.',
	'Did you know? The dot over a lower-case i or j has a name. It is a tittle.',
	'Did you know? Scotland\'s national animal is the unicorn. Officially.',
	'Did you know? Vending machines are statistically more dangerous than sharks.',
	'Did you know? Venus is the only planet in the solar system that spins clockwise as seen from above its north pole.'
];

/** Greetings, said on first appearance. */
export const GREETINGS = [
	'It looks like you are reading documentation. Would you like some help?',
	'Hello! I am here to be moderately useful and extremely nostalgic.',
	'I noticed you opened the Handbook. I have opinions.',
	'Need a hand? I have several. Well, one. Depending on which of us you got.',
	'It looks like you are trying to build a power. Would you like a tip you did not ask for?',
	'Good day. I have been assigned to you. There is no appeals process.',
	'Hi there. Click me whenever you want something to read that is not a fields table.',
	'It looks like you are here on purpose. That already puts you ahead.'
];

/** Said when you click them again straight away. */
export const NUDGES = [
	'Still here.',
	'You can pick a different assistant from my menu. I will not be offended. Much.',
	'I can be turned off, you know. Right-click me.',
	'Would you like me to keep going? I can keep going.',
	'This is the part where I would normally offer to write a letter.',
	'Easy. I only have so many of these.',
	'You are clicking faster than I can be interesting.',
	'Try reading one all the way through. Wild idea, I know.'
];

const norm = (s) => (s || '').toLowerCase();

/**
 * Build the pool of lines for a page. Topical lines are weighted by appearing
 * twice, so a raycast page mostly talks about raycasts without ever being
 * unable to say something else.
 *
 * @param {string} path  current pathname
 * @param {string} title current page title
 */
export function tipsFor(path, title) {
	const haystack = `${norm(path)} ${norm(title)}`;
	const topical = [];
	for (const group of TOPIC_TIPS) {
		if (group.keys.some((k) => haystack.includes(k))) topical.push(...group.tips);
	}
	return [...topical, ...topical, ...DOC_TIPS, ...TRIVIA];
}

/** How many lines back the assistant refuses to repeat itself. */
const RECENT_MEMORY = 30;
const recent = [];

/**
 * Pick a line nobody has heard lately. Falls back gracefully when the pool is
 * smaller than the memory, and never repeats the line that just went past.
 */
export function pick(list) {
	if (!list?.length) return '';

	let options = list.filter((line) => !recent.includes(line));
	if (!options.length) {
		const last = recent[recent.length - 1];
		options = list.filter((line) => line !== last);
		if (!options.length) options = list;
		recent.length = 0;
	}

	const choice = options[Math.floor(Math.random() * options.length)];
	recent.push(choice);
	while (recent.length > RECENT_MEMORY) recent.shift();
	return choice;
}
