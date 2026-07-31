// Content cleanup pass over the docs. Idempotent — safe to re-run.
//
//   node scripts/clean-docs.mjs --dry    report what would change
//   node scripts/clean-docs.mjs          apply
//
// What it fixes, all of it left over from the one-shot port:
//
//  1. A stray "Power Type" / "Entity Condition Type" line at the top of the
//     body — a breadcrumb from the source docs. The page title already says it.
//  2. `description:` frontmatter that is a markdown link ("[Power Type](../powertypes.md)")
//     rather than a summary. Rebuilt from the page's first real sentence.
//  3. Type ids written in the legacy `origins:` namespace. Origins aliases the
//     whole Apoli namespace, so `origins:health` resolves — but `apoli:health`
//     is what the mod registers, and writing it that way drops the dependency
//     on Origins. Only `Type ID:` lines and `"type":` values are touched; power
//     ids, tags, recipes and command arguments keep their namespace, because
//     `origins:phantomize` really is an Origins data-pack power.
//  4. `## See also` sections. The prev/next footer already links neighbours.
//  5. `## Sources` sections, which cite private paths in the author's vault.
//  6. Links the porter wrapped twice — `[[text](a)](b)` renders as a broken
//     link with a stray bracket. The inner target is the original one.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(ROOT, 'src/content/docs');
const DRY = process.argv.includes('--dry');

// The type ids Origins itself registers. Everything else under `origins:` is a
// core Apoli type reached through the namespace alias.
const ORIGINS_TYPES = new Set([
	'origin',
	'copy_origin',
	'transfer_origin',
	'store_origin',
	'apply_stored_origin',
	'store_value',
	'stored_origin',
	'stored_value'
]);
// Badge ids collide with core Apoli power ids (`tooltip`), so they only count
// as Origins types on the pages that document badges.
const BADGE_TYPES = new Set(['sprite', 'tooltip', 'keybind', 'crafting_recipe']);
const BADGE_PAGES = /18-origins\/(05-badge-types|01-guide\/03-badges)/;
// The page that explains the alias has to be able to show both spellings.
const NAMESPACE_EXEMPT = /18-origins\/01-guide\/01-overview\.md$/;

const KIND_LINE =
	/^(?:Power|Entity Action|Bi-entity Action|Bi-Entity Action|Block Action|Item Action|Meta Action|Entity Condition|Bi-entity Condition|Bi-Entity Condition|Block Condition|Item Condition|Damage Condition|Biome Condition|Fluid Condition|Meta Condition|Data|Badge) Types?$/;

// Descriptions the porter mangled by substituting a link's text with a page
// title. Too few and too varied to detect; stated outright instead.
const DESCRIPTION_FIXES = {
	'datapack/17-skill-tree/02-entity-actions/grant_skill_tree.md':
		'Grants a skill tree to the player this action runs on.',
	'datapack/17-skill-tree/02-entity-actions/revoke_skill_tree.md':
		'Revokes a previously granted skill tree from the player this action runs on.',
	'datapack/16-data-types/model-part-transformation.md':
		'A single edit to one named part of a biped model, used by apoli:modify_model_parts.',
	// the porter also stripped underscores out of field/type names it quoted
	'datapack/03-entity-actions/inventory_action.md':
		"Walks the entity's inventory or a power inventory and performs one operation per matching slot — the operation field replaces the separate modify_inventory, replace_inventory and drop_inventory actions.",
	'datapack/02-powers/ignore_fluid.md':
		'Stops the entity being affected by the matching fluid — water by default, but the fluid_condition accepts any.',
	'datapack/10-block-conditions/water_loggable.md':
		'Checks whether the block is waterloggable, meaning fluid can occupy the same block space (stairs, for example).'
};

/** Strip markdown links down to their text, however deeply they nest. */
function delink(s) {
	let out = s;
	for (let i = 0; i < 4; i++) {
		const next = out.replace(/\[([^[\]]*)\]\([^)]*\)/g, '$1');
		if (next === out) break;
		out = next;
	}
	return out.replace(/\[|\]\([^)]*\)/g, '').trim();
}

/** `[[text](inner)](outer)` -> `[text](inner)` */
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

/** Drop `## <name>` and everything under it, up to the next h2 or EOF. */
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
	// prose links whose text is a type id but whose target is an Apoli reference page
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

	// 1. stray breadcrumb line
	const stripped = body.replace(/^\s*\n*/, '');
	const firstLine = stripped.split(/\r?\n/, 1)[0].trim();
	if (KIND_LINE.test(firstLine)) {
		body = stripped.split(/\r?\n/).slice(1).join('\n');
		tally.kindLine++;
	}

	// 6. double-wrapped links
	const unwrapped = unwrapNestedLinks(body);
	if (unwrapped !== body) {
		body = unwrapped;
		tally.nestedLinks++;
	}

	// 3. namespace (before the description is rebuilt from the body)
	const nsFixed = fixNamespace(body, rel);
	if (nsFixed !== body) {
		body = nsFixed;
		tally.namespace++;
	}

	// 4 + 5. redundant sections
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

	// 2. description
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
		// a description must never carry link markup, whatever it came from
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
