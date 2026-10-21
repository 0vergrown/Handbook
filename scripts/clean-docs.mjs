import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'src/content/docs');
const DRY = process.argv.includes('--dry');

const ORIGINS_TYPES = new Set([
	'origin',
	'copy_origin',
	'transfer_origin',
	'store_origin',
	'apply_stored_origin',
	'grant_origin',
	'revoke_origin',
	'store_value',
	'stored_origin',
	'stored_value',
	'origin_tag',
	'impact',
	'action_on_swap',
	'force_swap',
	'open_swap_menu',
	'swapped'
]);
const BADGE_TYPES = new Set(['sprite', 'tooltip', 'keybind', 'crafting_recipe']);
const BADGE_PAGES = /18-origins\/(0\d-badge-types|01-guide\/03-badges)/;
const NAMESPACE_EXEMPT = /18-origins\/01-guide\/01-overview\.md$/;

const KIND_LINE =
	/^(?:Power|Entity Action|Bi-entity Action|Bi-Entity Action|Block Action|Item Action|Meta Action|Entity Condition|Bi-entity Condition|Bi-Entity Condition|Block Condition|Item Condition|Damage Condition|Biome Condition|Fluid Condition|Meta Condition|Data|Badge) Types?$/;

const DESCRIPTION_FIXES = {
	'datapack/17-skill-tree/02-entity-actions/grant_skill_tree.md':
		'Grants a skill tree to the player this action runs on.',
	'datapack/17-skill-tree/02-entity-actions/revoke_skill_tree.md':
		'Revokes a previously granted skill tree from the player this action runs on.',
	'datapack/16-data-types/model-part-transformation.md':
		'A single edit to one named part of a biped model, used by apoli:modify_model_parts.',
	'datapack/03-entity-actions/inventory_action.md':
		"Goes through the entity's inventory or a power inventory and does one operation on each matching slot: modify, replace or drop.",
	'datapack/02-powers/ignore_fluid.md':
		'The entity moves through a fluid as if it were air. Water by default, and fluid_condition picks any other fluid.',
	'datapack/10-block-conditions/water_loggable.md':
		'Checks whether the block can be waterlogged, so a fluid can share its space, as with stairs.'
};

function delink(s) {
	let out = s;
	for (let i = 0; i < 4; i++) {
		const next = out.replace(/\[([^[\]]*)\]\([^)]*\)/g, '$1');
		if (next === out) break;
		out = next;
	}
	return out.replace(/\[|\]\([^)]*\)/g, '').trim();
}

const unwrapNestedLinks = (body) =>
	body.replace(/\[(\[[^[\]]*\]\([^)]*\))\]\([^)]*\)/g, '$1');

function firstSentence(body) {
	for (const raw of body.split(/\r?\n/)) {
		const line = raw.trim();
		if (!line) continue;
		if (/^(#|>|\||```|~~~|-{3,}|Type ID:)/.test(line)) continue;
		if (KIND_LINE.test(line)) continue;
		const text = delink(line).replace(/[*_`]/g, '').trim();
		if (text.length > 12) return text;
	}
	return null;
}

function dropSection(body, name) {
	const re = new RegExp(`\\n#{2}\\s+${name}\\s*\\n[\\s\\S]*?(?=\\n## |$)`, 'i');
	return body.replace(re, '\n');
}

function fixNamespace(body, rel) {
	if (NAMESPACE_EXEMPT.test(rel)) return body;
	const keep = (id) =>
		ORIGINS_TYPES.has(id) || (BADGE_TYPES.has(id) && BADGE_PAGES.test(rel));
	let out = body.replace(/^(Type ID:\s*`)origins:([a-z0-9_]+)`/gm, (m, head, id) =>
		keep(id) ? m : `${head}apoli:${id}\``
	);
	out = out.replace(
		/("(?:type|power_type)"\s*:\s*")origins:([a-z0-9_]+)"/g,
		(m, head, id) => (keep(id) ? m : `${head}apoli:${id}"`)
	);
	out = out.replace(
		/\[(`?)origins:([a-z0-9_]+)(`?)\]\((\/docs\/datapack\/(?!origins\/)[^)]*)\)/g,
		(m, a, id, b, href) => (keep(id) ? m : `[${a}apoli:${id}${b}](${href})`)
	);
	return out;
}

const files = [];
(function walk(dir) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) walk(p);
		else if (e.name.endsWith('.md')) files.push(p);
	}
})(DOCS);
files.sort();

const tally = { kindLine: 0, description: 0, namespace: 0, seeAlso: 0, sources: 0, nestedLinks: 0 };
let touched = 0;

for (const file of files) {
	const rel = path.relative(DOCS, file).replace(/\\/g, '/');
	const raw = fs.readFileSync(file, 'utf8');
	const m = /^(---\r?\n[\s\S]*?\r?\n---)\r?\n?/.exec(raw);
	if (!m) continue;
	let fm = m[1];
	let body = raw.slice(m[0].length);
	const before = raw;

	const stripped = body.replace(/^\s*\n*/, '');
	const firstLine = stripped.split(/\r?\n/, 1)[0].trim();
	if (KIND_LINE.test(firstLine)) {
		body = stripped.split(/\r?\n/).slice(1).join('\n');
		tally.kindLine++;
	}

	const unwrapped = unwrapNestedLinks(body);
	if (unwrapped !== body) {
		body = unwrapped;
		tally.nestedLinks++;
	}

	const nsFixed = fixNamespace(body, rel);
	if (nsFixed !== body) {
		body = nsFixed;
		tally.namespace++;
	}

	const noSeeAlso = dropSection(body, 'See also');
	if (noSeeAlso !== body) {
		body = noSeeAlso;
		tally.seeAlso++;
	}
	const noSources = dropSection(body, 'Sources');
	if (noSources !== body) {
		body = noSources;
		tally.sources++;
	}

	const descMatch = /^description:\s*(.*)$/m.exec(fm);
	if (descMatch) {
		const current = descMatch[1].trim().replace(/^["']|["']$/g, '');
		const forced = DESCRIPTION_FIXES[rel];
		const cleaned = delink(current);
		const broken = !current || /\]\(/.test(current) || KIND_LINE.test(cleaned);
		let next = null;
		if (forced) next = forced;
		else if (broken) next = firstSentence(body) ?? cleaned;
		else if (cleaned !== current) next = cleaned;
		if (next) next = delink(next);
		if (next && next !== current) {
			fm = fm.replace(/^description:\s*.*$/m, `description: "${next.replace(/"/g, "'")}"`);
			tally.description++;
		}
	}

	body = body.replace(/\n{3,}/g, '\n\n').replace(/\s+$/, '') + '\n';
	const next = `${fm}\n\n${body.replace(/^\n+/, '')}`;
	if (next !== before) {
		touched++;
		if (!DRY) fs.writeFileSync(file, next);
	}
}

console.log(
	`${DRY ? 'would touch' : 'touched'} ${touched} page(s):`,
	`\n  stray kind line removed: ${tally.kindLine}`,
	`\n  description rebuilt:     ${tally.description}`,
	`\n  origins: -> apoli:       ${tally.namespace}`,
	`\n  "See also" removed:      ${tally.seeAlso}`,
	`\n  "Sources" removed:       ${tally.sources}`,
	`\n  nested links unwrapped:  ${tally.nestedLinks}`
);
