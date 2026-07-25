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
		.replace(/_([^_]+)_/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links
		.replace(/<[^>]+>/g, '')
		.trim();
}

function parseFrontmatter(raw) {
	const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
	const meta = {};
	if (!m) return { meta, body: raw };
	for (const line of m[1].split(/\r?\n/)) {
		const kv = /^(\w[\w-]*):\s*(.*)$/.exec(line);
		if (!kv) continue;
		let value = kv[2].trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
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

// ---------------------------------------------------------------------------
// build the index
// ---------------------------------------------------------------------------

/** @type {Map<string, any>} slug -> entry */
const ENTRIES = new Map();

for (const [path, raw] of Object.entries(RAW)) {
	const rel = path.slice(BASE.length).replace(/\.md$/, ''); // topic/NN-sec/NN-page
	const parts = rel.split('/');
	if (parts.length < 3) continue; // expect topic/section/page

	const topic = parts[0];
	const sectionRaw = parts[1];
	const pageRaw = parts[parts.length - 1];

	const { meta, body } = parseFrontmatter(raw);
	if (meta.draft) continue;

	const section = stripPrefix(sectionRaw);
	const page = stripPrefix(pageRaw);
	const slug = `${topic}/${section}/${page}`;

	ENTRIES.set(slug, {
		slug,
		path,
		topic,
		section,
		sectionTitle: meta.section || humanize(section),
		sectionOrder: orderOf(sectionRaw),
		pageOrder: orderOf(pageRaw),
		title: meta.title || firstHeading(body) || humanize(page),
		description: meta.description || '',
		headings: extractHeadings(body),
		load: LOADERS[path],
		plain: toPlainText(body)
	});
}

const ALL = [...ENTRIES.values()];

// ordered list of pages within a topic (for sidebar + prev/next)
function orderedPages(topic) {
	return ALL.filter((e) => e.topic === topic).sort(
		(a, b) => a.sectionOrder - b.sectionOrder || a.pageOrder - b.pageOrder
	);
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

/** Sidebar tree for a topic: [{ title, pages: [{ title, slug }] }]. */
export function getTopicNav(topic) {
	const sections = new Map();
	for (const e of orderedPages(topic)) {
		if (!sections.has(e.section)) {
			sections.set(e.section, { title: e.sectionTitle, order: e.sectionOrder, pages: [] });
		}
		sections.get(e.section).pages.push({ title: e.title, slug: e.slug });
	}
	return [...sections.values()].sort((a, b) => a.order - b.order);
}

/** The first page of a topic (used for "Docs" landing links). */
export function getFirstPage(topic) {
	const pages = orderedPages(topic);
	return pages[0]?.slug ?? null;
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
 * @type {{ id: string, topic: string, title: string, breadcrumb: string, href: string, content: string }[]}
 */
export const searchBlocks = (() => {
	const blocks = [];
	let id = 0;
	for (const e of ALL) {
		const topicTitle = TOPICS[e.topic]?.title ?? e.topic;
		const breadcrumb = `${topicTitle} / ${e.sectionTitle}`;
		blocks.push({
			id: String(id++),
			topic: e.topic,
			title: e.title,
			breadcrumb,
			href: `/docs/${e.slug}`,
			content: e.plain.slice(0, 1500)
		});
		for (const h of e.headings) {
			blocks.push({
				id: String(id++),
				topic: e.topic,
				title: h.title,
				breadcrumb: `${breadcrumb} / ${e.title}`,
				href: `/docs/${e.slug}#${h.slug}`,
				content: ''
			});
		}
	}
	return blocks;
})();
