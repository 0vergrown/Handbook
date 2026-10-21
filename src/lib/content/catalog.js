import { SECTION_DESCRIPTIONS, TOPICS, TOPIC_ORDER } from './topics.js';
import {
	extractHeadings,
	firstHeading,
	humanize,
	keywordsFor,
	orderOf,
	parseFrontmatter,
	readingTime,
	stripPrefix,
	toPlainText,
	typeIdOf
} from './parse.js';

const DOCS_ROOT = '/src/content/docs/';
const BLOG_ROOT = '/src/content/blog/';

const docHref = (slug) => `/docs/${slug}/`;

export function buildCatalog(files) {
	const entries = new Map();

	for (const [file, raw] of Object.entries(files)) {
		if (!file.startsWith(DOCS_ROOT)) continue;
		const parts = file.slice(DOCS_ROOT.length).replace(/\.md$/, '').split('/');
		if (parts.length < 3) continue;

		const { meta, body } = parseFrontmatter(raw);
		if (meta.draft) continue;

		const [topic, sectionRaw] = parts;
		const groupRaw = parts.length > 3 ? parts[2] : null;
		const pageRaw = parts[parts.length - 1];
		const section = stripPrefix(sectionRaw);
		const slug = `${topic}/${section}/${stripPrefix(pageRaw)}`;
		const title = meta.title || firstHeading(body) || humanize(stripPrefix(pageRaw));
		const aliases = Array.isArray(meta.aliases) ? meta.aliases : meta.aliases ? [meta.aliases] : [];

		entries.set(slug, {
			slug,
			file,
			topic,
			section,
			sectionTitle: meta.section || humanize(section),
			sectionOrder: orderOf(sectionRaw),
			group: groupRaw ? stripPrefix(groupRaw) : null,
			groupTitle: groupRaw ? humanize(stripPrefix(groupRaw)) : null,
			groupOrder: groupRaw ? orderOf(groupRaw) : -1,
			pageOrder: orderOf(pageRaw),
			title,
			navTitle: meta.navigation_title || title,
			description: meta.description || '',
			headings: extractHeadings(body),
			plain: toPlainText(body),
			keywords: keywordsFor(typeIdOf(body), aliases)
		});
	}

	const all = [...entries.values()];
	const ordered = new Map(
		TOPIC_ORDER.map((topic) => [
			topic,
			all
				.filter((entry) => entry.topic === topic)
				.sort(
					(a, b) =>
						a.sectionOrder - b.sectionOrder ||
						a.groupOrder - b.groupOrder ||
						a.pageOrder - b.pageOrder ||
						a.navTitle.localeCompare(b.navTitle)
				)
		])
	);

	function sectionsOf(topic) {
		const sections = new Map();
		for (const entry of ordered.get(topic) ?? []) {
			let section = sections.get(entry.section);
			if (!section) {
				section = {
					key: entry.section,
					slug: `${topic}/${entry.section}`,
					title: entry.sectionTitle,
					items: [],
					groups: []
				};
				sections.set(entry.section, section);
			}
			const item = { title: entry.navTitle, slug: entry.slug };
			if (!entry.group) {
				section.items.push(item);
				continue;
			}
			let group = section.groups.find((candidate) => candidate.key === entry.group);
			if (!group) {
				group = { key: entry.group, title: entry.groupTitle, items: [] };
				section.groups.push(group);
			}
			group.items.push(item);
		}
		return [...sections.values()];
	}

	const nav = Object.fromEntries(TOPIC_ORDER.map((topic) => [topic, sectionsOf(topic)]));

	function firstPage(topic) {
		return ordered.get(topic)?.[0]?.slug ?? null;
	}

	function neighbours(list, index) {
		const prev = index > 0 ? list[index - 1] : null;
		const next = index >= 0 && index < list.length - 1 ? list[index + 1] : null;
		return {
			prev: prev && { title: prev.navTitle, href: docHref(prev.slug) },
			next: next && { title: next.navTitle, href: docHref(next.slug) }
		};
	}

	function page(slug) {
		const entry = entries.get(slug);
		if (!entry) return null;
		const list = ordered.get(entry.topic);
		const index = list.indexOf(entry);
		const breadcrumbs = [{ title: entry.sectionTitle, href: docHref(`${entry.topic}/${entry.section}`) }];
		if (entry.groupTitle) breadcrumbs.push({ title: entry.groupTitle });
		breadcrumbs.push({ title: entry.navTitle });
		return {
			slug,
			file: entry.file,
			topic: entry.topic,
			topicTitle: TOPICS[entry.topic]?.title ?? entry.topic,
			title: entry.title,
			description: entry.description,
			headings: entry.headings,
			breadcrumbs,
			source: entry.file.slice(1),
			...neighbours(list, index)
		};
	}

	function section(topic, key) {
		const sections = nav[topic];
		const found = sections?.find((candidate) => candidate.key === key);
		if (!found) return null;
		const list = ordered.get(topic);
		const describe = (item) => ({
			title: item.title,
			href: docHref(item.slug),
			description: entries.get(item.slug)?.description ?? ''
		});
		const first = list.findIndex((entry) => entry.section === key);
		const prev = first > 0 ? list[first - 1] : null;
		return {
			topic,
			topicTitle: TOPICS[topic]?.title ?? topic,
			key,
			title: found.title,
			description: SECTION_DESCRIPTIONS[`${topic}/${key}`] ?? '',
			items: found.items.map(describe),
			groups: found.groups.map((group) => ({
				key: group.key,
				title: group.title,
				items: group.items.map(describe)
			})),
			prev: prev && { title: prev.navTitle, href: docHref(prev.slug) },
			next: list[first] && { title: list[first].navTitle, href: docHref(list[first].slug) }
		};
	}

	function allSlugs() {
		return all.map((entry) => entry.slug);
	}

	function allSectionPaths() {
		return [...new Set(all.map((entry) => `${entry.topic}/${entry.section}`))];
	}

	function searchBlocks() {
		const blocks = [];
		for (const topic of TOPIC_ORDER) {
			const topicTitle = TOPICS[topic].title;
			for (const group of nav[topic]) {
				blocks.push({
					title: group.title,
					section: topicTitle,
					crumb: topicTitle,
					href: docHref(group.slug),
					keywords: [group.key, group.key.replace(/-/g, ' ')],
					content: ''
				});
			}
			for (const entry of ordered.get(topic)) {
				const crumb = [topicTitle, entry.sectionTitle, entry.groupTitle].filter(Boolean).join(' / ');
				blocks.push({
					title: entry.title,
					section: `${topicTitle}: ${entry.sectionTitle}`,
					crumb,
					href: docHref(entry.slug),
					keywords: entry.keywords,
					content: `${entry.description} ${entry.plain}`.slice(0, 1500)
				});
				for (const heading of entry.headings) {
					blocks.push({
						title: heading.title,
						section: `${topicTitle}: ${entry.sectionTitle}`,
						crumb: `${crumb} / ${entry.navTitle}`,
						href: `${docHref(entry.slug)}#${heading.slug}`,
						keywords: [],
						content: ''
					});
				}
			}
		}
		return blocks;
	}

	return { nav, firstPage, page, section, allSlugs, allSectionPaths, searchBlocks };
}

export function buildBlog(files) {
	const posts = [];
	for (const [file, raw] of Object.entries(files)) {
		if (!file.startsWith(BLOG_ROOT)) continue;
		const name = file.slice(BLOG_ROOT.length).replace(/\.md$/, '');
		const { meta, body } = parseFrontmatter(raw);
		if (meta.draft) continue;
		const slug = meta.slug || name.replace(/^\d{4}-\d{2}-\d{2}-/, '');
		posts.push({
			slug,
			file,
			name,
			title: meta.title || slug,
			description: meta.description || '',
			date: String(meta.date || name.slice(0, 10)),
			author: meta.author || 'Overgrown',
			readingTime: readingTime(body),
			headings: extractHeadings(body),
			plain: toPlainText(body)
		});
	}
	posts.sort((a, b) => (a.date === b.date ? b.name.localeCompare(a.name) : a.date < b.date ? 1 : -1));

	const summary = ({ slug, title, description, date, author, readingTime }) => ({
		slug,
		title,
		description,
		date,
		author,
		readingTime
	});

	function list() {
		return posts.map(summary);
	}

	function sidebar() {
		return posts.map(({ slug, title, date }) => ({ slug, title, date }));
	}

	function get(slug) {
		const index = posts.findIndex((post) => post.slug === slug);
		if (index === -1) return null;
		const post = posts[index];
		const newer = posts[index - 1];
		const older = posts[index + 1];
		return {
			...summary(post),
			file: post.file,
			headings: post.headings,
			newer: newer ? { title: newer.title, href: `/blog/${newer.slug}/` } : null,
			older: older ? { title: older.title, href: `/blog/${older.slug}/` } : null
		};
	}

	function slugs() {
		return posts.map((post) => post.slug);
	}

	function searchBlocks() {
		return posts.map((post) => ({
			title: post.title,
			section: 'Blog',
			crumb: `Blog / ${post.date}`,
			href: `/blog/${post.slug}/`,
			keywords: [],
			content: `${post.description} ${post.plain}`.slice(0, 1500)
		}));
	}

	return { list, sidebar, get, slugs, searchBlocks };
}
