// Alias extractor for Apoli: A docs maintenance aid.
//
// Walks the mod's registration classes and records, for every registered type,
// the legacy ids it also answers to (`AliasingOptions.addTypeAlias`). These are
// the ids people actually type in old data packs — `active_self` for
// `action_on_key_press`, `trinket` for `accessory` — so every type page lists
// them in its `aliases:` frontmatter and the search modal matches on them.
//
//   node scripts/extract-aliases.mjs  ->  scripts/aliases.json
//
// Keyed "<category>/<id>", because a short id is NOT unique across categories
// (apoli:explode is an entity, bi-entity and block action).
//
// This exists separately from extract-schema.mjs because that script's
// single-line regex silently truncates multi-line builder chains — the very
// registrations that have the most aliases.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APOLI = '/home/default/Documents/GitHub/Apoli/Apoli-Fabric-1.21.1/src/main/java/dev/overgrown/apoli';

const FILES = {
	powers: 'power/PowerTypes.java',
	'entity actions': 'action/builtin/entity/EntityActions.java',
	'bientity actions': 'action/builtin/bientity/BiEntityActions.java',
	'block actions': 'action/builtin/block/BlockActions.java',
	'item actions': 'action/builtin/item/ItemActions.java',
	'entity conditions': 'condition/builtin/entity/EntityConditions.java',
	'bientity conditions': 'condition/builtin/bientity/BiEntityConditions.java',
	'block conditions': 'condition/builtin/block/BlockConditions.java',
	'item conditions': 'condition/builtin/item/ItemConditions.java',
	'damage conditions': 'condition/builtin/damage/DamageConditions.java',
	'biome conditions': 'condition/builtin/biome/BiomeConditions.java',
	'fluid conditions': 'condition/builtin/fluid/FluidConditions.java'
};

// The meta registries register the same ids once per flavour through helper
// methods, so the sequential scanner below can't attribute them. They are few
// and stable; the docs collapse every flavour into one section anyway.
const META = {
	'meta actions/random_chance': ['chance'],
	'meta conditions/all_of': ['and'],
	'meta conditions/any_of': ['or'],
	'meta conditions/random_chance': ['chance']
};

const ID_ARG = /(?:Apoli\.id\(\s*"([^"]+)"\s*\)|"([a-z0-9_]+:[a-z0-9_/.]+)")/;

/** `private static final ResourceLocation FOO = Apoli.id("foo");` -> FOO: foo */
function constantIds(src) {
	const map = new Map();
	const re = /static final ResourceLocation\s+([A-Z0-9_]+)\s*=\s*Apoli\.id\(\s*"([^"]+)"\s*\)/g;
	let m;
	while ((m = re.exec(src))) map.set(m[1], m[2]);
	return map;
}

function scan(src, category, out) {
	const constants = constantIds(src);
	let current = null;
	for (const line of src.split(/\r?\n/)) {
		const reg = /\.register\(\s*(.*)$/.exec(line);
		if (reg) {
			const rest = reg[1];
			const direct = ID_ARG.exec(rest);
			const constant = /^([A-Z0-9_]+)\s*,/.exec(rest);
			if (direct && direct.index === 0) current = direct[1] || direct[2];
			else if (constant && constants.has(constant[1])) current = constants.get(constant[1]);
			else if (direct) current = direct[1] || direct[2];
			else current = null; // id is on the next line
			continue;
		}
		// a bare `Apoli.id("x"),` line directly after a wrapped register(
		if (current === null) {
			const bare = /^\s*(?:Apoli\.id\(\s*"([^"]+)"\s*\)|"([a-z0-9_]+:[a-z0-9_/.]+)")\s*,/.exec(line);
			if (bare) {
				current = bare[1] || bare[2];
				continue;
			}
		}
		const alias = /\.addTypeAlias\(\s*(?:Apoli\.id\(\s*"([^"]+)"\s*\)|"([^"]+)")/.exec(line);
		if (alias && current) {
			const id = (alias[1] || alias[2]).replace(/^apoli:/, '');
			const key = `${category}/${current}`;
			if (!out[key]) out[key] = [];
			if (!out[key].includes(id)) out[key].push(id);
		}
	}
}

const out = { ...META };
let files = 0;
for (const [category, rel] of Object.entries(FILES)) {
	const file = path.join(APOLI, rel);
	if (!fs.existsSync(file)) {
		console.warn(`missing: ${rel}`);
		continue;
	}
	scan(fs.readFileSync(file, 'utf8'), category, out);
	files++;
}

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(path.join(ROOT, 'scripts/aliases.json'), JSON.stringify(sorted, null, '\t') + '\n');

const total = Object.values(sorted).reduce((n, a) => n + a.length, 0);
console.log(`scanned ${files} registration files`);
console.log(`${Object.keys(sorted).length} types carry ${total} aliases -> scripts/aliases.json`);
