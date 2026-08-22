// Rewrites the frontmatter of every type-reference page to the house format:
//
//   title:            Custom Model Render (Power Type)   <- h1 + search + browser tab
//   navigation_title: Custom Model Render                <- sidebar label
//   aliases:          ["active_self"]                    <- legacy ids, searchable
//
// Idempotent: re-run it after adding pages and it will only touch what changed.
// Run scripts/extract-aliases.mjs first so aliases.json is current.
//
//   node scripts/retitle-docs.mjs --dry     print the plan, write nothing
//   node scripts/retitle-docs.mjs           apply
//
// The parenthetical comes from the SECTION the page lives in, never from the
// type id — a short id is not unique (apoli:explode is an entity, bi-entity AND
// block action; apoli:nbt is an entity, block and item condition). Disambiguating
// those is the whole point of the suffix.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'src/content/docs');
const aliasMap = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/aliases.json'), 'utf8'));
const DRY = process.argv.includes('--dry');

// section folder -> [parenthetical, alias-lookup category]
const SECTION_KIND = {
	'datapack/02-powers': ['Power Type', 'powers'],
	'datapack/03-entity-actions': ['Entity Action Type', 'entity actions'],
	'datapack/04-bientity-actions': ['Bi-Entity Action Type', 'bientity actions'],
	'datapack/05-block-actions': ['Block Action Type', 'block actions'],
	'datapack/06-item-actions': ['Item Action Type', 'item actions'],
	'datapack/07-meta-actions': ['Meta Action Type', 'meta actions'],
	'datapack/08-entity-conditions': ['Entity Condition Type', 'entity conditions'],
	'datapack/09-bientity-conditions': ['Bi-Entity Condition Type', 'bientity conditions'],
	'datapack/10-block-conditions': ['Block Condition Type', 'block conditions'],
	'datapack/11-item-conditions': ['Item Condition Type', 'item conditions'],
	'datapack/12-damage-conditions': ['Damage Condition Type', 'damage conditions'],
	'datapack/13-biome-conditions': ['Biome Condition Type', 'biome conditions'],
	'datapack/14-fluid-conditions': ['Fluid Condition Type', 'fluid conditions'],
	'datapack/15-meta-conditions': ['Meta Condition Type', 'meta conditions'],
	'datapack/16-data-types': ['Data Type', null],
	'datapack/19-commands': ['Command', null]
};

// Sections that mix concept pages with several type flavours, so the kind has to
// be stated per page. Keyed by file basename within the section.
const PAGE_KIND = {
	'datapack/17-skill-tree': {
		add_skill_points: ['Entity Action Type', 'entity actions'],
		grant_skill_tree: ['Entity Action Type', 'entity actions'],
		reset_skills: ['Entity Action Type', 'entity actions'],
		revoke_skill_tree: ['Entity Action Type', 'entity actions']
	},
	'datapack/18-origins': {
		apply_stored_origin: ['Entity Action Type', null],
		grant_origin: ['Entity Action Type', null],
		revoke_origin: ['Entity Action Type', null],
		store_origin: ['Entity Action Type', null],
		store_value: ['Entity Action Type', null],
		force_swap: ['Entity Action Type', null],
		open_swap_menu: ['Entity Action Type', null],
		action_on_swap: ['Power Type', null],
		swapped: ['Entity Condition Type', null],
		copy_origin: ['Bi-Entity Action Type', null],
		store_origin_bientity: ['Bi-Entity Action Type', null],
		transfer_origin: ['Bi-Entity Action Type', null],
		origin: ['Entity Condition Type', null],
		stored_origin: ['Entity Condition Type', null],
		stored_value: ['Entity Condition Type', null],
		badge_crafting_recipe: ['Badge Type', null],
		badge_keybind: ['Badge Type', null],
		badge_sprite: ['Badge Type', null],
		badge_tooltip: ['Badge Type', null]
	},
	'compat/02-simple-voice-chat': {
		action_on_reply: ['Power Type', 'powers'],
		action_on_sending_message: ['Power Type', 'powers'],
		action_on_speak: ['Power Type', 'powers'],
		action_on_speech: ['Power Type', 'powers'],
		voice_disabled: ['Entity Condition Type', 'entity conditions'],
		voice_listeners: ['Entity Condition Type', 'entity conditions'],
		voice_loudness: ['Entity Condition Type', 'entity conditions'],
		voice_speaking: ['Entity Condition Type', 'entity conditions']
	},
	'compat/03-accessories': {
		action_on_accessory_change: ['Power Type', 'powers'],
		modify_accessory_slots: ['Power Type', 'powers'],
		prevent_accessory_equip: ['Power Type', 'powers'],
		prevent_accessory_unequip: ['Power Type', 'powers'],
		modify_accessory: ['Entity Action Type', 'entity actions'],
		accessory_equipped_count: ['Entity Condition Type', 'entity conditions'],
		accessory_slot_count: ['Entity Condition Type', 'entity conditions'],
		accessory: ['Item Condition Type', 'item conditions']
	},
	'compat/05-icarus': {
		wings: ['Power Type', 'powers']
	},
	'compat/06-hardcore-revival': {
		action_on_knockout: ['Power Type', 'powers'],
		action_on_revive: ['Power Type', 'powers'],
		knock_out: ['Entity Action Type', 'entity actions'],
		revive: ['Entity Action Type', 'entity actions'],
		knocked_out: ['Entity Condition Type', 'entity conditions']
	},
	'compat/11-pufferfishs-skills': {
		power: ['Reward Type', null],
		modify_resource: ['Reward Type', null]
	}
};

// Index / overview pages that live inside a reference section but describe the
// whole section rather than one type.
const SKIP = new Set([
	'datapack/04-bientity-actions/bi-entity-action-types',
	'datapack/09-bientity-conditions/bi-entity-condition-types',
	'datapack/17-skill-tree/skill-tree',
	'datapack/17-skill-tree/skill-tree-json-format',
	'datapack/17-skill-tree/skill-tree-power-data',
	'datapack/19-commands/selectors'
]);

const ACRONYMS = new Map([
	['nbt', 'NBT'],
	['xp', 'XP'],
	['hud', 'HUD'],
	['json', 'JSON'],
	['npc', 'NPC'],
	['id', 'ID'],
	['ai', 'AI']
]);

/** `custom_model_render` -> `Custom Model Render`. Every word capitalised. */
function prettyName(id) {
	return id
		.split(/[_\-\s]+/)
		.filter(Boolean)
		.map((w) => ACRONYMS.get(w.toLowerCase()) ?? w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

/** Existing human titles that predate the acronym map. */
const TITLE_FIXES = new Map([
	['Hud Render', 'HUD Render'],
	['Nbt', 'NBT']
]);

const stripPrefix = (s) => s.replace(/^\d+-/, '');
const stripKind = (t) => t.replace(/\s*\([^()]*\)\s*$/, '').trim();

function parseFrontmatter(raw) {
	const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
	if (!m) return null;
	return { block: m[1], body: raw.slice(m[0].length), whole: m[0] };
}

function readField(block, key) {
	const m = new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(block);
	if (!m) return null;
	return m[1].trim().replace(/^["']|["']$/g, '');
}

/** The canonical id the page documents, from its `Type ID: \`ns:id\`` line. */
function bodyTypeId(body) {
	const m = /^Type ID:\s*`([^`]+)`/m.exec(body);
	return m ? m[1] : null;
}

const quote = (s) => `"${s.replace(/"/g, '\\"')}"`;

const files = [];
(function walk(dir) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p);
		else if (e.name.endsWith('.md')) files.push(p);
	}
})(DOCS);
files.sort();

let changed = 0;
let skipped = 0;
const plan = [];

for (const file of files) {
	const rel = path.relative(DOCS, file).replace(/\\/g, '/');
	const parts = rel.replace(/\.md$/, '').split('/');
	if (parts.length < 3) continue;

	const sectionKey = `${parts[0]}/${parts[1]}`;
	const base = parts[parts.length - 1];
	const id = stripPrefix(base);

	// numeric-prefixed pages are ordered concept pages, never a single type
	if (/^\d+-/.test(base)) continue;
	if (SKIP.has(`${sectionKey}/${id}`)) continue;

	const kindEntry = PAGE_KIND[sectionKey]?.[id] ?? SECTION_KIND[sectionKey];
	if (!kindEntry) {
		skipped++;
		continue;
	}
	const [kind, category] = kindEntry;

	const raw = fs.readFileSync(file, 'utf8');
	const fm = parseFrontmatter(raw);
	if (!fm) {
		console.warn(`no frontmatter: ${rel}`);
		continue;
	}

	const oldTitle = readField(fm.block, 'title') ?? '';
	const description = readField(fm.block, 'description') ?? '';

	// The id in the body wins over the filename: it is what disambiguated pages
	// like store_origin_bientity.md and badge_sprite.md actually document.
	const typeId = bodyTypeId(fm.body);
	const shortId = typeId ? typeId.split(':').pop() : id;

	let name;
	if (sectionKey === 'datapack/16-data-types') {
		const bare = stripKind(oldTitle);
		name = TITLE_FIXES.get(bare) ?? bare;
	} else {
		name = prettyName(shortId);
	}

	const title = `${name} (${kind})`;
	const aliases = category ? (aliasMap[`${category}/${shortId}`] ?? []) : [];

	const extra = [`navigation_title: ${quote(name)}`];
	if (aliases.length) extra.push(`aliases: [${aliases.map(quote).join(', ')}]`);

	let block = fm.block;
	block = block.replace(/^navigation_title:\s*.*$\n?/m, '');
	block = block.replace(/^aliases:\s*.*$\n?/m, '');
	block = block.replace(/^title:\s*.*$/m, `title: ${quote(title)}`);
	// keep the pair right under title/description, wherever description sits
	if (/^description:\s*.*$/m.test(block)) {
		block = block.replace(/^description:\s*.*$/m, (line) => [line, ...extra].join('\n'));
	} else {
		block = block.replace(/^title:\s*.*$/m, (line) => [line, ...extra].join('\n'));
	}
	block = block.replace(/\n{2,}/g, '\n').trim();

	const next = `---\n${block}\n---\n${fm.body.startsWith('\n') ? '' : '\n'}${fm.body}`;
	if (next !== raw) {
		changed++;
		plan.push(`${rel}\n    ${oldTitle}  ->  ${title}${aliases.length ? `   aliases=[${aliases.join(', ')}]` : ''}`);
		if (!DRY) fs.writeFileSync(file, next);
	}
	void description;
}

if (DRY) {
	for (const line of plan) console.log(line);
	console.log(`\n${changed} page(s) would change, ${skipped} unrecognised section page(s) left alone`);
} else {
	console.log(`retitled ${changed} page(s)`);
}
