/**
 * Build-time documentation index.
 *
 * Everything here runs at build/prerender time from the markdown in
 * src/content/docs. There is no server at runtime — the output is static.
 *
 *   - raw markdown (eager) drives the nav tree, table of contents and search
 *   - compiled mdsvex components are loaded lazily, per page
 *
 * Page slugs drop the numeric ordering prefixes:
 *   src/content/docs/datapack/02-powers/03-attribute.md
 *     -> slug  "datapack/powers/attribute"
 *     -> url   "/docs/datapack/powers/attribute"
 *
 * A section may nest ONE more folder to group its pages in the sidebar. That
 * folder is a nav grouping only — it does not appear in the slug, so pages keep
 * their URL when they move into (or out of) a group:
 *   src/content/docs/datapack/18-origins/05-badge-types/badge_sprite.md
 *     -> slug  "datapack/origins/badge_sprite"   (unchanged)
 *     -> nav   Origins > Badge Types > Sprite
 * Pages left directly in the section folder render above its groups.
 */
import GithubSlugger from 'github-slugger';
import { SECTION_TITLES, TOPICS } from './topics.js';

const RAW = import.meta.glob('/src/content/docs/**/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const LOADERS = import.meta.glob('/src/content/docs/**/*.md');

const BASE = '/src/content/docs/';

// ---------------------------------------------------------------------------
// small helpers
// ---------------------------------------------------------------------------

const stripPrefix = (segment) => segment.replace(/^\d+-/, '');
const orderOf = (segment) => {
	const m = /^(\d+)-/.exec(segment);
	return m ? parseInt(m[1], 10) : 999;
};

function humanize(slug) {
	if (SECTION_TITLES[slug]) return SECTION_TITLES[slug];
	return slug
		.split('-')
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

/** Turn a line of inline markdown into plain text (for titles + slugs). */
function stripInline(md) {
	return md
		.replace(/`([^`]+)`/g, '$1') // inline code
		.replace(/\*\*([^*]+)\*\*/g, '$1')
		.replace(/\*([^*]+)\*/g, '$1')
		.replace(/(?<![A-Za-z0-9])_([^_]+)_(?![A-Za-z0-9])/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links
		.replace(/<[^>]+>/g, '')
		.trim();
}

const unquote = (v) =>
	(v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))
		? v.slice(1, -1)
		: v;

function parseFrontmatter(raw) {
	const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
	const meta = {};
	if (!m) return { meta, body: raw };
	for (const line of m[1].split(/\r?\n/)) {
		const kv = /^(\w[\w-]*):\s*(.*)$/.exec(line);
		if (!kv) continue;
		let value = kv[2].trim();
		// inline sequence: aliases: ["active_self", "self_glow"]
		if (value.startsWith('[') && value.endsWith(']')) {
			meta[kv[1]] = value
				.slice(1, -1)
				.split(',')
				.map((v) => unquote(v.trim()))
				.filter(Boolean);
			continue;
		}
		value = unquote(value);
		if (value === 'true') value = true;
		else if (value === 'false') value = false;
		meta[kv[1]] = value;
	}
	return { meta, body: raw.slice(m[0].length) };
}

/** Remove fenced code blocks so headings inside them aren't picked up. */
const stripFences = (body) =>
	body.replace(/```[\s\S]*?```/g, '').replace(/~~~[\s\S]*?~~~/g, '');

/** Build the h2/h3 "On this page" tree, with ids matching rehype-slug. */
function extractHeadings(body) {
	const slugger = new GithubSlugger();
	const flat = [];
	for (const line of stripFences(body).split(/\r?\n/)) {
		const m = /^(#{2,4})\s+(.*?)\s*#*\s*$/.exec(line);
		if (!m) continue;
		const depth = m[1].length;
		if (depth > 3) continue; // only h2/h3 in the ToC
		const title = stripInline(m[2]);
		if (!title) continue;
		flat.push({ depth, title, slug: slugger.slug(title) });
	}
	const tree = [];
	for (const h of flat) {
		if (h.depth === 2) tree.push({ ...h, children: [] });
		else if (tree.length) tree[tree.length - 1].children.push(h);
		else tree.push({ ...h, children: [] });
	}
	return tree;
}

/** Best-effort plain text for the search index. */
function toPlainText(body) {
	return body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/~~~[\s\S]*?~~~/g, ' ')
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/[`*_>#|]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
}

function firstHeading(body) {
	const m = /^#\s+(.*)$/m.exec(stripFences(body));
	return m ? stripInline(m[1]) : null;
}

/** The `Type ID: \`apoli:x\`` line a per-type page opens with, if it has one. */
function typeIdOf(body) {
	const m = /^Type ID:\s*`([^`]+)`/m.exec(body);
	return m ? m[1] : null;
}

/**
 * Everything a reader might type to find this page that isn't in its title:
 * the canonical type id, its bare form, and every legacy alias both ways.
 * Titles are human now ("Action On Key Press"), so this is what keeps
 * `apoli:action_on_key_press` and `active_self` finding it.
 */
function keywordsFor(typeId, aliases) {
	const out = new Set();
	const add = (id) => {
		if (!id) return;
		out.add(id);
		const bare = id.includes(':') ? id.slice(id.indexOf(':') + 1) : id;
		out.add(bare);
		if (!id.includes(':')) out.add(`apoli:${id}`);
	};
	add(typeId);
	for (const a of aliases) add(a);
	return [...out];
}

// ---------------------------------------------------------------------------
// build the index
// ---------------------------------------------------------------------------

/** @type {Map<string, any>} slug -> entry */
const ENTRIES = new Map();

for (const [path, raw] of Object.entries(RAW)) {
	const rel = path.slice(BASE.length).replace(/\.md$/, ''); // topic/NN-sec[/NN-group]/NN-page
	const parts = rel.split('/');
	if (parts.length < 3) continue; // expect at least topic/section/page

	const topic = parts[0];
	const sectionRaw = parts[1];
	const groupRaw = parts.length > 3 ? parts[2] : null;
	const pageRaw = parts[parts.length - 1];

	const { meta, body } = parseFrontmatter(raw);
	if (meta.draft) continue;

	const section = stripPrefix(sectionRaw);
	const page = stripPrefix(pageRaw);
	const slug = `${topic}/${section}/${page}`; // groups never enter the URL

	const title = meta.title || firstHeading(body) || humanize(page);
	const aliases = Array.isArray(meta.aliases) ? meta.aliases : meta.aliases ? [meta.aliases] : [];

	ENTRIES.set(slug, {
		slug,
		path,
		topic,
		section,
		sectionTitle: meta.section || humanize(section),
		sectionOrder: orderOf(sectionRaw),
		group: groupRaw ? stripPrefix(groupRaw) : null,
		groupTitle: groupRaw ? humanize(stripPrefix(groupRaw)) : null,
		groupOrder: groupRaw ? orderOf(groupRaw) : -1, // ungrouped pages sort first
		pageOrder: orderOf(pageRaw),
		title,
		navTitle: meta.navigation_title || title,
		description: meta.description || '',
		headings: extractHeadings(body),
		load: LOADERS[path],
		plain: toPlainText(body),
		keywords: keywordsFor(typeIdOf(body), aliases)
	});
}

const ALL = [...ENTRIES.values()];

// ordered list of pages within a topic (for sidebar + prev/next)
function orderedPages(topic) {
	return ALL.filter((e) => e.topic === topic).sort(
		(a, b) =>
			a.sectionOrder - b.sectionOrder ||
			a.groupOrder - b.groupOrder ||
			a.pageOrder - b.pageOrder ||
			// ported per-type pages have no NN- prefix (equal pageOrder) → sort by title
			a.navTitle.localeCompare(b.navTitle)
	);
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

/**
 * Sidebar tree for a topic:
 *   [{ title, count, pages: [{ title, slug }], groups: [{ title, pages }] }]
 * `pages` holds the section's ungrouped pages and renders above `groups`.
 */
export function getTopicNav(topic) {
	const sections = new Map();
	for (const e of orderedPages(topic)) {
		if (!sections.has(e.section)) {
			sections.set(e.section, {
				title: e.sectionTitle,
				order: e.sectionOrder,
				pages: [],
				groups: new Map()
			});
		}
		const section = sections.get(e.section);
		const item = { title: e.navTitle, slug: e.slug };
		if (!e.group) {
			section.pages.push(item);
			continue;
		}
		if (!section.groups.has(e.group)) {
			section.groups.set(e.group, { title: e.groupTitle, order: e.groupOrder, pages: [] });
		}
		section.groups.get(e.group).pages.push(item);
	}
	return [...sections.values()]
		.sort((a, b) => a.order - b.order)
		.map((s) => {
			const groups = [...s.groups.values()].sort((a, b) => a.order - b.order);
			return {
				title: s.title,
				pages: s.pages,
				groups,
				count: s.pages.length + groups.reduce((n, g) => n + g.pages.length, 0)
			};
		});
}

/** The first page of a topic (used for "Docs" landing links). */
export function getFirstPage(topic) {
	const pages = orderedPages(topic);
	return pages[0]?.slug ?? null;
}

/** The first page of a section within a topic (for section-landing redirects). */
export function firstPageOfSection(topic, section) {
	const pages = orderedPages(topic).filter((e) => e.section === section);
	return pages[0]?.slug ?? null;
}

/** All `topic/section` paths — each gets its own prerendered landing page. */
export function allSectionPaths() {
	const set = new Set();
	for (const e of ALL) set.add(`${e.topic}/${e.section}`);
	return [...set];
}

/**
 * A section landing page: every page in the category, in sidebar order, split
 * into the section's ungrouped pages and its sub-groups. This is what
 * `/docs/datapack/entity-conditions` renders — a category is a linkable page,
 * not a redirect to whichever type happens to sort first.
 */
export function getSection(topic, section) {
	const pages = orderedPages(topic).filter((e) => e.section === section);
	if (pages.length === 0) return null;

	const loose = [];
	const groups = [];
	for (const e of pages) {
		const item = { title: e.title, navTitle: e.navTitle, slug: e.slug, description: e.description };
		if (!e.group) {
			loose.push(item);
			continue;
		}
		let group = groups.find((g) => g.key === e.group);
		if (!group) {
			group = { key: e.group, title: e.groupTitle, pages: [] };
			groups.push(group);
		}
		group.pages.push(item);
	}

	const title = pages[0].sectionTitle;
	return {
		topic,
		section,
		title,
		count: pages.length,
		pages: loose,
		groups,
		breadcrumbs: [{ title: TOPICS[topic]?.title ?? topic }, { title }],
		first: pages[0].slug
	};
}

/** Everything the docs route needs to render one page. */
export async function getPage(slug) {
	const entry = ENTRIES.get(slug);
	if (!entry) return null;

	const mod = await entry.load();
	const pages = orderedPages(entry.topic);
	const idx = pages.findIndex((p) => p.slug === slug);
	const prev = idx > 0 ? pages[idx - 1] : null;
	const next = idx < pages.length - 1 ? pages[idx + 1] : null;

	return {
		slug,
		topic: entry.topic,
		title: entry.title,
		description: entry.description,
		headings: entry.headings,
		breadcrumbs: [
			{ title: TOPICS[entry.topic]?.title ?? entry.topic },
			{ title: entry.sectionTitle },
			...(entry.groupTitle ? [{ title: entry.groupTitle }] : []),
			{ title: entry.title }
		],
		component: mod.default,
		prev: prev && { title: prev.title, slug: prev.slug },
		next: next && { title: next.title, slug: next.slug }
	};
}

/** All doc slugs — used to prerender every page. */
export function allSlugs() {
	return ALL.map((e) => e.slug);
}

// ---------------------------------------------------------------------------
// search index (client-side FlexSearch consumes this)
// ---------------------------------------------------------------------------

/**
 * One block per page plus one per h2, so results can deep-link to a section.
 * `keywords` carries the type id and its legacy aliases — the page titles no
 * longer contain them, so this is what an `apoli:health` or `active_self`
 * query matches on.
 * @type {{ id: string, topic: string, title: string, breadcrumb: string, href: string, content: string, keywords: string[] }[]}
 */
export const searchBlocks = (() => {
	const blocks = [];
	let id = 0;
	const sections = new Map();
	for (const e of ALL) {
		const key = `${e.topic}/${e.section}`;
		if (!sections.has(key)) {
			sections.set(key, {
				id: String(id++),
				topic: e.topic,
				title: e.sectionTitle,
				breadcrumb: TOPICS[e.topic]?.title ?? e.topic,
				href: `/docs/${key}`,
				content: '',
				keywords: [e.section, e.section.replace(/-/g, ' ')]
			});
		}
	}
	blocks.push(...sections.values());
	for (const e of ALL) {
		const topicTitle = TOPICS[e.topic]?.title ?? e.topic;
		const breadcrumb = e.groupTitle
			? `${topicTitle} / ${e.sectionTitle} / ${e.groupTitle}`
			: `${topicTitle} / ${e.sectionTitle}`;
		blocks.push({
			id: String(id++),
			topic: e.topic,
			title: e.title,
			breadcrumb,
			href: `/docs/${e.slug}`,
			content: e.plain.slice(0, 1500),
			keywords: e.keywords
		});
		for (const h of e.headings) {
			blocks.push({
				id: String(id++),
				topic: e.topic,
				title: h.title,
				breadcrumb: `${breadcrumb} / ${e.title}`,
				href: `/docs/${e.slug}#${h.slug}`,
				content: '',
				keywords: []
			});
		}
	}
	return blocks;
})();
