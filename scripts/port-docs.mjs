import fs from 'node:fs';
import path from 'node:path';

const SRC = '/home/default/Documents/GitHub/Node/Apoli Docs';
const OUT = '/home/default/Documents/GitHub/Website/src/content/docs/datapack';

const SECTIONS = {
	'Power Types': ['02-powers', 'powers'],
	'Entity/Action': ['03-entity-actions', 'entity-actions'],
	'Bi-entity/action': ['04-bientity-actions', 'bientity-actions'],
	'Block/Action': ['05-block-actions', 'block-actions'],
	'Item/Action': ['06-item-actions', 'item-actions'],
	'Meta Action Types': ['07-meta-actions', 'meta-actions'],
	'Entity/Condition': ['08-entity-conditions', 'entity-conditions'],
	'Bi-entity/condition': ['09-bientity-conditions', 'bientity-conditions'],
	'Block/Condition': ['10-block-conditions', 'block-conditions'],
	'Item/Condition': ['11-item-conditions', 'item-conditions'],
	'Damage Condition Types': ['12-damage-conditions', 'damage-conditions'],
	'Biome Condition Types': ['13-biome-conditions', 'biome-conditions'],
	'Fluid Condition Types': ['14-fluid-conditions', 'fluid-conditions'],
	'Meta Condition Types': ['15-meta-conditions', 'meta-conditions'],
	'Data Types': ['16-data-types', 'data-types'],
	'Skill Tree': ['17-skill-tree', 'skill-tree']
};

const ORIGINS_PAGES = {
	'origins:origin': 'origin',
	'origins:copy_origin': 'copy_origin',
	'origins:transfer_origin': 'transfer_origin',
	'origins:store_origin': 'store_origin',
	'origins:apply_stored_origin': 'apply_stored_origin',
	'origins:grant_origin': 'grant_origin',
	'origins:revoke_origin': 'revoke_origin',
	'origins:store_value': 'store_value',
	'origins:stored_origin': 'stored_origin',
	'origins:stored_value': 'stored_value',
	'origins:action_on_swap': 'action_on_swap',
	'origins:force_swap': 'force_swap',
	'origins:open_swap_menu': 'open_swap_menu',
	'origins:swapped': 'swapped',
	'origins:impact': 'impact'
};

const CONCEPT_LINKS = {
	'Power JSON Format': '/docs/datapack/introduction/powers',
	Powers: '/docs/datapack/introduction/powers'
};

const stripFrontmatter = (s) => {
	s = s.replace(/^﻿/, '');
	return s.replace(/^---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*\r?\n?/, '');
};
const stripLeadingH1 = (s) => s.replace(/^\s*#\s+.*\r?\n+/, '');

const kebab = (s) =>
	s
		.toLowerCase()
		.replace(/\([^)]*\)/g, '')
		.trim()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

function listFiles(dir) {
	const out = [];
	const walk = (d) => {
		for (const e of fs.readdirSync(d, { withFileTypes: true })) {
			const p = path.join(d, e.name);
			if (e.isDirectory()) walk(p);
			else if (e.name.endsWith('.md')) out.push(p);
		}
	};
	walk(dir);
	return out;
}

function sectionOf(relPath) {
	for (const key of Object.keys(SECTIONS)) {
		if (relPath.startsWith(key + '/')) return key;
	}
	return null;
}

const files = listFiles(SRC);

const index = new Map();
const entries = [];

for (const file of files) {
	const rel = file.slice(SRC.length + 1);
	const sectionKey = sectionOf(rel);
	if (!sectionKey) continue;
	const [sectionFolder, sectionSlug] = SECTIONS[sectionKey];

	const raw = stripFrontmatter(fs.readFileSync(file, 'utf8'));
	const wikiName = path.basename(file, '.md');
	const humanName = wikiName.replace(/\s*\([^)]*\)\s*$/, '');

	const idMatch = /Type ID:\**\s*`([a-z0-9_]+:[a-z0-9_./]+)`/i.exec(raw);
	const typeId = idMatch ? idMatch[1] : null;

	const slug = typeId ? typeId.split(':')[1].replace(/\//g, '-') : kebab(humanName);
	const title = wikiName;
	const originsPage = typeId ? ORIGINS_PAGES[typeId] : undefined;
	const url = originsPage
		? `/docs/datapack/origins/${originsPage}`
		: `/docs/datapack/${sectionSlug}/${slug}`;

	const linkText = typeId ?? humanName;
	index.set(wikiName, { url, linkText });
	if (originsPage) continue;
	entries.push({ file, raw, sectionFolder, sectionSlug, slug, title, humanName, wikiName });
}

for (const [name, url] of Object.entries(CONCEPT_LINKS)) {
	if (!index.has(name)) index.set(name, { url, linkText: name });
}

const bySectionSlug = new Map();
const bySlug = new Map();
for (const e of entries) {
	bySectionSlug.set(`${e.sectionSlug}/${e.slug}`, e.url);
	if (!bySlug.has(e.slug)) bySlug.set(e.slug, e.url);
}
const FOLDER_TO_SECTION = {
	'data types': 'data-types',
	data_types: 'data-types',
	'power types': 'powers',
	power_types: 'powers',
	'entity action': 'entity-actions',
	'bi-entity action': 'bientity-actions',
	'block action': 'block-actions',
	'item action': 'item-actions',
	'meta action': 'meta-actions',
	'entity condition': 'entity-conditions',
	'bi-entity condition': 'bientity-conditions',
	'block condition': 'block-conditions',
	'item condition': 'item-conditions',
	'damage condition': 'damage-conditions',
	'biome condition': 'biome-conditions',
	'fluid condition': 'fluid-conditions',
	'meta condition': 'meta-conditions',
	'skill tree': 'skill-tree'
};

function resolveRelMd(href) {
	let h = href.split('#')[0].split('?')[0];
	if (!/\.md$/i.test(h)) return null;
	h = decodeURIComponent(h).replace(/\\/g, '/');
	const segs = h.split('/').filter((s) => s && s !== '.' && s !== '..');
	const base = kebab(segs.pop().replace(/\.md$/i, ''));
	const folder = segs
		.slice(-2)
		.join(' ')
		.toLowerCase()
		.replace(/_/g, ' ');
	for (const [token, section] of Object.entries(FOLDER_TO_SECTION)) {
		if (folder.includes(token)) {
			const url = bySectionSlug.get(`${section}/${base}`);
			if (url) return url;
		}
	}
	return bySlug.get(base) ?? null;
}

function cleanDescription(firstLine) {
	let d = firstLine
		.replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, (_, n) => n.replace(/\s*\([^)]*\)\s*$/, ''))
		.replace(/\s*\((Data Type|Power Type|[A-Za-z-]+ (Action|Condition|Meta Condition|Meta Action) Type)\)/g, '')
		.replace(/[`*_]/g, '')
		.replace(/\s+/g, ' ')
		.trim();
	const m = /^(.*?[.!?])(\s|$)/.exec(d);
	if (m) d = m[1];
	if (d.length > 160) d = d.slice(0, 157).replace(/\s+\S*$/, '') + '…';
	return d.replace(/"/g, "'");
}

function sanitizePlain(seg) {
	return (
		seg
			.replace(/<br\s*\/?>/gi, '\n')
			.replace(/<\/?(?:b|strong)>/gi, '**')
			.replace(/<\/?(?:i|em)>/gi, '*')
			.replace(/<\/?(?:span|style|div|font|center|sup|sub|u|small)[^>]*>/gi, '')
			.replace(/</g, '&lt;')
			.replace(/\{/g, '&#123;')
			.replace(/\}/g, '&#125;')
	);
}

function sanitizeProse(text) {
	return text
		.split(/(```[\s\S]*?```)/g)
		.map((block, bi) => {
			if (bi % 2 === 1) return block;
			return block
				.split(/(`[^`\n]*`)/g)
				.map((seg, si) => (si % 2 === 1 ? seg : sanitizePlain(seg)))
				.join('');
		})
		.join('');
}

const wikiNames = [...index.keys()].sort((a, b) => b.length - a.length);

function linkify(text) {
	text = text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (whole, name, alias) => {
		const hit = index.get(name.trim());
		if (hit) return `[${alias ? alias.trim() : hit.linkText}](${hit.url})`;
		return alias ? alias.trim() : name.replace(/\s*\([^)]*\)\s*$/, '');
	});
	const parts = text.split(/(```[\s\S]*?```)/g);
	return parts
		.map((seg, i) => {
			if (i % 2 === 1) return seg;
			for (const name of wikiNames) {
				if (!/\(.+\)$/.test(name)) continue;
				const hit = index.get(name);
				const re = new RegExp(name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
				seg = seg.replace(re, `[${hit.linkText}](${hit.url})`);
			}
			return seg;
		})
		.join('');
}

let written = 0;
for (const e of entries) {
	let body = stripLeadingH1(e.raw.replace(/\r\n/g, '\n'));

	const firstLine =
		body
			.split('\n')
			.map((l) => l.trim())
			.find((l) => l.length > 0 && !/^type id:/i.test(l.replace(/\*/g, ''))) || e.humanName;
	const description = cleanDescription(firstLine);

	body = body.replace(/^(#{3,})(\s)/gm, (_, hashes, sp) => hashes.slice(1) + sp);
	body = body.replace(/\[([^\]\n]+)\]\(##[^)\n]*\)/g, '$1');
	body = body.replace(/\[([^\]\n]*)\]\(([^\n]*?\.md(?:#[^)\n]*)?)\)/g, (m, text, href) => {
		const bn = decodeURIComponent(href.split('#')[0].split('/').pop()).replace(/\.md$/i, '');
		const wiki = index.get(bn);
		const url = wiki ? wiki.url : resolveRelMd(href);
		return url ? `[${text}](${url})` : text;
	});
	body = linkify(body);
	body = sanitizeProse(body);

	const fm =
		`---\ntitle: "${e.title}"\ndescription: "${description}"\n` +
		`navigation_title: "${e.humanName}"\n---\n\n`;
	const outDir = path.join(OUT, e.sectionFolder);
	fs.mkdirSync(outDir, { recursive: true });
	fs.writeFileSync(path.join(outDir, `${e.slug}.md`), fm + body.trimStart() + '\n');
	written++;
}

console.log(`ported ${written} pages across ${Object.keys(SECTIONS).length} sections`);
console.log('sections:', [...new Set(entries.map((e) => e.sectionFolder))].sort().join(', '));
