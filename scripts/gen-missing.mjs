// Generate per-type pages for types that exist in the Apoli source but were not
// in the ported Node docs (newer additions + canonical ids that only had an
// alias page). Field tables come straight from scripts/schema.json; the one-line
// descriptions are curated below. Run scripts/extract-schema.mjs first.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const schema = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/schema.json'), 'utf8')).apoli;
const OUT = path.join(ROOT, 'src/content/docs/datapack');

const SECTION = {
	powers: '02-powers',
	'entity actions': '03-entity-actions',
	'bientity actions': '04-bientity-actions',
	'meta actions': '07-meta-actions',
	'entity conditions': '08-entity-conditions',
	'item conditions': '11-item-conditions',
	'meta conditions': '15-meta-conditions'
};

// one-line, accurate descriptions for each missing type
const D = {
	action_on_key_sequence: 'Runs an action when a sequence of keys is entered, like a combo.',
	modify_damage: 'Modifies the damage this entity deals or takes (aliases `modify_damage_dealt`, `modify_damage_taken`).',
	prevent_use: 'Prevents the general use / right-click interaction.',
	action_on_kill: 'Runs an action when this entity kills another.',
	prevent_powers: 'Suppresses other powers on the entity while active.',
	action_on_speak: 'Runs an action while the entity is talking in voice chat (needs Simple Voice Chat).',
	action_on_reply: 'Runs an action when another player speaks back nearby in voice chat.',
	wings: 'Grants flapping wings with a stamina bar (needs the Icarus mod).',
	action_on_accessory_change: 'Runs an action when an accessory is equipped or unequipped (alias `action_on_trinket_change`).',
	prevent_accessory_equip: 'Prevents equipping accessories (alias `prevent_trinket_equip`).',
	prevent_accessory_unequip: 'Prevents unequipping accessories (alias `prevent_trinket_unequip`).',
	modify_accessory_slots: 'Adds or removes accessory slots for the entity.',
	action_on_knockout: 'Runs an action when the entity is knocked out (needs a downed-state mod).',
	action_on_revive: 'Runs an action when a knocked-out entity is revived.',
	// entity actions
	nothing: 'Does nothing. Useful as an explicit no-op branch.',
	grant_all_powers: 'Grants every loaded power to the entity.',
	suppress_power: 'Temporarily disables a power without removing it.',
	unsuppress_power: 'Re-enables a power previously suppressed.',
	advancement: 'Grants or revokes an advancement (aliases `grant_advancement`, `revoke_advancement`).',
	relative_action: 'Runs an action on a related entity such as a rider or vehicle (aliases `passenger_action`, `riding_action`).',
	add_skill_points: 'Adds skill points in a skill tree.',
	grant_skill_tree: 'Grants a whole skill tree to the entity.',
	revoke_skill_tree: 'Removes a skill tree from the entity.',
	reset_skills: 'Refunds and clears chosen skills.',
	radial_menu: 'Opens a radial selection menu of actions.',
	modify_accessory: 'Acts on the entity\'s equipped accessories (alias `modify_trinket`).',
	knock_out: 'Knocks the entity out (needs a downed-state mod).',
	revive: 'Revives a knocked-out entity.',
	attach_rope: 'Attaches a rope between the actor and the target.',
	random_chance: 'Runs an action (or checks a condition) with a given probability (alias `chance`).',
	// entity conditions
	key_pressed: 'Passes while a keybinding is held.',
	voice_speaking: 'Passes while the entity is talking in voice chat (needs Simple Voice Chat).',
	voice_disabled: 'Passes when the entity has voice chat disabled (alias `voice_muted`).',
	voice_loudness: 'Compares how loudly the entity is speaking.',
	voice_listeners: 'Counts nearby players who can hear the entity.',
	hunger: 'Compares the entity\'s hunger level (alias `food_level`).',
	xp: 'Compares the entity\'s experience (aliases `xp_levels`, `xp_points`).',
	accessory_equipped_count: 'Counts the entity\'s equipped accessories (alias `equipped_trinket_count`).',
	accessory_slot_count: 'Counts the entity\'s accessory slots (alias `trinket_slot_count`).',
	knocked_out: 'Passes while the entity is knocked out.',
	// item conditions
	is_equippable: 'Passes when the item can be equipped (alias `equippable`).',
	accessory: 'Passes when the item is an accessory (alias `trinket`).',
	// meta conditions
	all_of: 'Passes when every listed condition passes (alias `and`).',
	any_of: 'Passes when any listed condition passes (alias `or`).',
	offset: 'Tests a block condition at an offset from this position (block conditions only).'
};

function fmtDefault(f) {
	if (f.required) return '**required**';
	const d = f.default;
	if (d === undefined || d === null || d === 'None' || d === '?') return '_optional_';
	if (/^(true|false|-?\d+(\.\d+)?f?|".*")$/.test(String(d))) return '`' + String(d).replace(/f$/, '') + '`';
	return '_optional_';
}

function cleanType(t, cat) {
	const wrap = cat.includes('condition') ? 'condition' : 'action';
	return t
		.replace(/Codec\.list\((?:wrapper|cond|action|weighted|branch)Codec\)/g, wrap)
		.replace(/\b(?:wrapper|cond|action)Codec\b/g, wrap)
		.replace(/\bLIST(_CODEC)?\b/g, 'list')
		.replace(/\bNbt\b/g, 'nbt');
}

function build(cat, folder) {
	const files = new Set(fs.readdirSync(path.join(OUT, folder)).map((f) => f.replace(/\.md$/, '')));
	let n = 0;
	for (const t of schema[cat] || []) {
		if (files.has(t.id)) continue;
		if (!D[t.id]) continue; // only generate ones we have a description for
		const rows = t.fields
			.map((f) => `| \`${f.name}\` | ${cleanType(f.type, cat)} | ${fmtDefault(f)} |`)
			.join('\n');
		const fields = t.fields.length
			? `## Fields\n\n| Field | Type | Default |\n|-------|------|---------|\n${rows}\n`
			: '## Fields\n\nThis type has no fields.\n';
		const example = `## Example\n\n\`\`\`json\n{\n  "type": "apoli:${t.id}"\n}\n\`\`\`\n`;
		const md = `---\ntitle: "apoli:${t.id}"\ndescription: "${D[t.id].replace(/"/g, "'").replace(/`/g, '')}"\n---\n\n${D[t.id]}\n\nType ID: \`apoli:${t.id}\`\n\n${fields}\n${example}`;
		fs.writeFileSync(path.join(OUT, folder, `${t.id}.md`), md);
		n++;
	}
	return n;
}

let total = 0;
for (const [cat, folder] of Object.entries(SECTION)) total += build(cat, folder);
console.log(`generated ${total} missing per-type pages`);
