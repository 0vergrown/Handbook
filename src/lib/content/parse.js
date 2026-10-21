import GithubSlugger from 'github-slugger';
import { SECTION_TITLES } from './topics.js';

export const stripPrefix = (segment) => segment.replace(/^\d+-/, '');

export function orderOf(segment) {
	const match = /^(\d+)-/.exec(segment);
	return match ? parseInt(match[1], 10) : 999;
}

export function humanize(slug) {
	if (SECTION_TITLES[slug]) return SECTION_TITLES[slug];
	return slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

const unquote = (value) =>
	(value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
		? value.slice(1, -1)
		: value;

export function parseFrontmatter(raw) {
	const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
	const meta = {};
	if (!match) return { meta, body: raw };
	for (const line of match[1].split(/\r?\n/)) {
		const pair = /^(\w[\w-]*):\s*(.*)$/.exec(line);
		if (!pair) continue;
		const value = pair[2].trim();
		if (value.startsWith('[') && value.endsWith(']')) {
			meta[pair[1]] = value
				.slice(1, -1)
				.split(',')
				.map((item) => unquote(item.trim()))
				.filter(Boolean);
			continue;
		}
		const plain = unquote(value);
		meta[pair[1]] = plain === 'true' ? true : plain === 'false' ? false : plain;
	}
	return { meta, body: raw.slice(match[0].length) };
}

export const stripFences = (body) =>
	body.replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^[ \t]*\1[ \t]*$/gm, '');

export function stripInline(markdown) {
	return markdown
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.split(/(`+[^`]*`+)/)
		.map((part, index) =>
			index % 2
				? part.replace(/^`+|`+$/g, '')
				: part
						.replace(/<[^>]+>/g, '')
						.replace(/\*\*([^*]+)\*\*/g, '$1')
						.replace(/\*([^*]+)\*/g, '$1')
						.replace(/(?<![A-Za-z0-9])_([^_]+)_(?![A-Za-z0-9])/g, '$1')
						.replace(/\\([\\`*_{}[\]()#+\-.!<>|])/g, '$1')
		)
		.join('')
		.trim();
}

export function extractHeadings(body, maxDepth = 3) {
	const slugger = new GithubSlugger();
	const flat = [];
	for (const line of stripFences(body).split(/\r?\n/)) {
		const match = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
		if (!match) continue;
		const depth = match[1].length;
		const title = stripInline(match[2]);
		if (!title) continue;
		const slug = slugger.slug(title);
		if (depth < 2 || depth > maxDepth) continue;
		flat.push({ depth, title, slug });
	}
	const tree = [];
	for (const heading of flat) {
		if (heading.depth === 2 || tree.length === 0) tree.push({ ...heading, children: [] });
		else tree[tree.length - 1].children.push(heading);
	}
	return tree;
}

export function toPlainText(body) {
	return stripFences(body)
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
		.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
		.replace(/^>\s*\[![A-Z]+\]/gm, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[`*_>#|]/g, ' ')
		.replace(/\\([\\`*_{}[\]()#+\-.!<>|])/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

export function firstHeading(body) {
	const match = /^#\s+(.*)$/m.exec(stripFences(body));
	return match ? stripInline(match[1]) : null;
}

export function typeIdOf(body) {
	const match = /^Type ID:\s*`([^`]+)`/m.exec(body);
	return match ? match[1] : null;
}

export function keywordsFor(typeId, aliases) {
	const out = new Set();
	const add = (id) => {
		if (!id) return;
		out.add(id);
		const bare = id.includes(':') ? id.slice(id.indexOf(':') + 1) : id;
		out.add(bare);
		if (!id.includes(':')) out.add(`apoli:${id}`);
	};
	add(typeId);
	for (const alias of aliases) add(alias);
	return [...out];
}

export function readingTime(body) {
	const words = toPlainText(body).split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}
