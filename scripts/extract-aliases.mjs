import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APOLI = '/home/default/Documents/GitHub/Apoli/Apoli-Fabric-1.21.1/src/main/java/dev/overgrown/apoli';
const BIRDSONG = '/home/default/Documents/GitHub/Birdsong/Birdsong-Fabric-1.21.1/src/main/java/dev/overgrown/birdsong';

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

const META = {
	'meta actions/random_chance': ['chance'],
	'meta conditions/all_of': ['and'],
	'meta conditions/any_of': ['or'],
	'meta conditions/random_chance': ['chance'],
	'meta conditions/mod_loaded': ['mod_installed'],
	'meta conditions/minecraft_version': ['game_version', 'mc_version']
};

const BIRDSONG_CALLS = [
	[/PowerTypeRegistry\.register\(/, 'powers'],
	[/ConditionTypes\.ENTITY\.register\(/, 'entity conditions']
];

const ID_ARG = /(?:Apoli\.id\(\s*"([^"]+)"\s*\)|"([a-z0-9_]+:[a-z0-9_/.]+)")/;

function constantIds(src) {
	const map = new Map();
	const re = /static final ResourceLocation\s+([A-Z0-9_]+)\s*=\s*Apoli\.id\(\s*"([^"]+)"\s*\)/g;
	let m;
	while ((m = re.exec(src))) map.set(m[1], m[2]);
	return map;
}

function collectAliases(line, category, current, out) {
	if (!current) return;
	const re = /\.addTypeAlias\(\s*(?:Apoli\.id\(\s*"([^"]+)"\s*\)|"([^"]+)")/g;
	let m;
	while ((m = re.exec(line))) {
		const id = (m[1] || m[2]).replace(/^apoli:/, '');
		const key = `${category}/${current}`;
		if (!out[key]) out[key] = [];
		if (!out[key].includes(id)) out[key].push(id);
	}
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
			else current = null;
			collectAliases(line, category, current, out);
			continue;
		}
		if (current === null) {
			const bare = /^\s*(?:Apoli\.id\(\s*"([^"]+)"\s*\)|"([a-z0-9_]+:[a-z0-9_/.]+)")\s*,/.exec(line);
			if (bare) {
				current = bare[1] || bare[2];
				continue;
			}
		}
		collectAliases(line, category, current, out);
	}
}

function scanBirdsong(out) {
	const idsFile = path.join(BIRDSONG, 'BirdsongIds.java');
	const typesFile = path.join(BIRDSONG, 'BirdsongTypes.java');
	if (!fs.existsSync(idsFile) || !fs.existsSync(typesFile)) {
		console.warn('missing: Birdsong registration files');
		return false;
	}
	const constants = new Map();
	const constantRe = /static final ResourceLocation\s+([A-Z0-9_]+)\s*=\s*Birdsong\.id\(\s*"([^"]+)"\s*\)/g;
	for (const m of fs.readFileSync(idsFile, 'utf8').matchAll(constantRe)) constants.set(m[1], m[2]);
	for (const statement of fs.readFileSync(typesFile, 'utf8').split(';')) {
		const call = BIRDSONG_CALLS.find(([re]) => re.test(statement));
		const constant = /register\(\s*BirdsongIds\.([A-Z0-9_]+)/.exec(statement);
		if (!call || !constant || !constants.has(constant[1])) continue;
		const own = constants.get(constant[1]);
		const key = `${call[1]}/${own}`;
		const aliasRe = /(?:addTypeAlias\(\s*(?:Apoli|Birdsong)\.id\(|legacy\()\s*"([^"]+)"/g;
		for (const a of statement.matchAll(aliasRe)) {
			if (a[1] === own) continue;
			if (!out[key]) out[key] = [];
			if (!out[key].includes(a[1])) out[key].push(a[1]);
		}
	}
	return true;
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
if (scanBirdsong(out)) files += 2;

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(path.join(ROOT, 'scripts/aliases.json'), JSON.stringify(sorted, null, '\t') + '\n');

const total = Object.values(sorted).reduce((n, a) => n + a.length, 0);
console.log(`scanned ${files} registration files`);
console.log(`${Object.keys(sorted).length} types carry ${total} aliases -> scripts/aliases.json`);
