import fs from 'node:fs';
import path from 'node:path';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { imageSize } from './src/lib/content/image-size.js';

const BASE = process.env.BASE_PATH ?? '';
const STATIC_DIR = path.resolve('static');

const CLASSES = {
	'#a00001': 'tok-comment',
	'#a00002': 'tok-string',
	'#a00003': 'tok-property',
	'#a00004': 'tok-atrule',
	'#a00005': 'tok-number',
	'#a00006': 'tok-boolean',
	'#a00007': 'tok-keyword',
	'#a00008': 'tok-function',
	'#a00009': 'tok-tag',
	'#a0000a': 'tok-attr-name',
	'#a0000b': 'tok-variable',
	'#a0000c': 'tok-namespace',
	'#a0000d': 'tok-regex',
	'#a0000e': 'tok-inserted',
	'#a0000f': 'tok-deleted',
	'#a00010': 'tok-changed'
};

const PLAIN = '#a00000';

const rule = (color, scope) => ({ scope, settings: { foreground: color } });

const theme = {
	name: 'handbook-prism',
	type: 'light',
	colors: { 'editor.foreground': PLAIN, 'editor.background': '#a0ffff' },
	tokenColors: [
		rule('#a00001', ['comment', 'punctuation.definition.comment']),
		rule('#a00002', ['string', 'punctuation.definition.string']),
		rule(PLAIN, [
			'string.unquoted.plain.out.yaml',
			'string.unquoted.argument.shell',
			'source.groovy.embedded.source'
		]),
		rule('#a00003', [
			'support.type.property-name',
			'punctuation.support.type.property-name',
			'variable.other.key.toml'
		]),
		rule('#a00004', ['entity.name.tag.yaml']),
		rule('#a00005', ['constant.numeric']),
		rule('#a00006', ['constant.language']),
		rule('#a00007', [
			'keyword',
			'storage.type',
			'storage.modifier',
			'variable.language',
			'support.type.primitive'
		]),
		rule(PLAIN, [
			'keyword.operator',
			'keyword.control.ternary',
			'storage.type.annotation',
			'storage.type.java',
			'storage.type.generic.java',
			'storage.type.object.array.java',
			'entity.name.type',
			'entity.other.inherited-class',
			'support.class',
			'entity.name.section.toml',
			'meta.diff.range'
		]),
		rule('#a0000c', ['storage.modifier.package', 'storage.modifier.import']),
		rule('#a00008', ['entity.name.function', 'support.function', 'entity.name.command']),
		rule('#a00009', ['entity.name.tag']),
		rule('#a0000a', ['entity.other.attribute-name', 'keyword.other.definition.ini']),
		rule('#a0000b', [
			'variable.other.normal.shell',
			'variable.other.special.shell',
			'variable.other.positional.shell',
			'variable.other.assignment.shell',
			'punctuation.definition.variable.shell'
		]),
		rule('#a0000d', ['string.regexp']),
		rule('#a0000e', ['markup.inserted']),
		rule('#a0000f', ['markup.deleted']),
		rule('#a00010', ['markup.changed'])
	]
};

const LANGS = [
	'json',
	'jsonc',
	'json5',
	'java',
	'javascript',
	'typescript',
	'bash',
	'shell',
	'yaml',
	'toml',
	'properties',
	'groovy',
	'xml',
	'html',
	'css',
	'markdown',
	'diff'
];

const ALIASES = {
	gradle: 'groovy',
	js: 'javascript',
	ts: 'typescript',
	sh: 'bash',
	zsh: 'bash',
	console: 'bash',
	yml: 'yaml',
	md: 'markdown',
	mcfunction: 'text',
	txt: 'text',
	plaintext: 'text',
	plain: 'text'
};

const highlighter = await createHighlighter({ themes: [theme], langs: LANGS });
const loaded = new Set(highlighter.getLoadedLanguages());

const tokenClasses = {
	name: 'handbook-token-classes',
	pre(node) {
		delete node.properties.style;
		delete node.properties.tabindex;
		node.properties.class = 'shiki';
	},
	span(node) {
		const style = node.properties.style;
		if (typeof style !== 'string') return;
		const color = /color:\s*(#[0-9a-fA-F]{6})/.exec(style)?.[1]?.toLowerCase();
		delete node.properties.style;
		const className = color && CLASSES[color];
		if (className) node.properties.class = className;
	}
};

const COPY_ICON =
	'<svg viewBox="0 0 24 24" class="copy-button__icon" aria-hidden="true"><path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>';
const SUCCESS_ICON =
	'<svg viewBox="0 0 24 24" class="copy-button__success" aria-hidden="true"><path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"></path></svg>';

const escapeHtml = (text) =>
	text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function highlight(code, lang = 'text', meta = '') {
	const requested = (lang ?? 'text').toLowerCase();
	const resolved = ALIASES[requested] ?? requested;
	const language = loaded.has(resolved) ? resolved : 'text';
	const html = highlighter.codeToHtml(code.replace(/\n$/, ''), {
		lang: language,
		theme: 'handbook-prism',
		transformers: [tokenClasses]
	});
	const title = /title=(["'])(.*?)\1/.exec(meta ?? '')?.[2];
	const heading = title ? `<div class="code-block__title">${escapeHtml(title)}</div>` : '';
	const button =
		'<div class="code-block__buttons"><button type="button" class="clean-btn copy-button" aria-label="Copy code to clipboard" title="Copy">' +
		`<span class="copy-button__icons">${COPY_ICON}${SUCCESS_ICON}</span></button></div>`;
	return escapeSvelte(
		`<div class="code-block language-${language}">${heading}<div class="code-block__content">${html}${button}</div></div>`
	);
}

function textOf(node) {
	if (node.type === 'text') return node.value;
	return (node.children ?? []).map(textOf).join('');
}

function walk(node, visit, parent = null) {
	visit(node, parent);
	if (node.children) for (const child of [...node.children]) walk(child, visit, node);
}

const ADMONITIONS = {
	note: {
		tone: 'note',
		viewBox: '0 0 14 16',
		d: 'M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z'
	},
	tip: {
		tone: 'tip',
		viewBox: '0 0 12 16',
		d: 'M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z'
	},
	info: {
		tone: 'info',
		viewBox: '0 0 14 16',
		d: 'M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z'
	},
	warning: {
		tone: 'warning',
		viewBox: '0 0 16 16',
		d: 'M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z'
	},
	danger: {
		tone: 'danger',
		viewBox: '0 0 12 16',
		d: 'M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z'
	}
};

const KINDS = {
	note: 'note',
	tip: 'tip',
	info: 'info',
	important: 'info',
	warning: 'warning',
	caution: 'warning',
	danger: 'danger'
};

const element = (tagName, properties, children = []) => ({ type: 'element', tagName, properties, children });

function leadingText(paragraph) {
	let text = '';
	for (const child of paragraph.children) {
		if (child.type !== 'text') break;
		text += child.value;
	}
	return text;
}

function dropLeading(paragraph, count) {
	let remaining = count;
	while (remaining > 0 && paragraph.children.length && paragraph.children[0].type === 'text') {
		const first = paragraph.children[0];
		if (first.value.length <= remaining) {
			remaining -= first.value.length;
			paragraph.children.shift();
		} else {
			first.value = first.value.slice(remaining);
			remaining = 0;
		}
	}
}

function rehypeAdmonitions() {
	return (tree) => {
		walk(tree, (node) => {
			if (node.type !== 'element' || node.tagName !== 'blockquote') return;
			const paragraph = node.children.find((child) => child.type === 'element');
			if (!paragraph || paragraph.tagName !== 'p') return;
			const match = /^\s*\[!([A-Za-z]+)\][ \t]*([^\n]*)\n?/.exec(leadingText(paragraph));
			if (!match) return;
			const kind = KINDS[match[1].toLowerCase()];
			if (!kind) return;
			const label = match[2].trim() || match[1].toLowerCase();
			dropLeading(paragraph, match[0].length);
			if (!paragraph.children.length || !textOf(paragraph).trim()) {
				node.children.splice(node.children.indexOf(paragraph), 1);
			}
			const icon = ADMONITIONS[kind];
			node.tagName = 'div';
			node.properties = { className: ['admonition', `admonition--${icon.tone}`] };
			node.children = [
				element('div', { className: ['admonition__heading'] }, [
					element('span', { className: ['admonition__icon'] }, [
						element('svg', { viewBox: icon.viewBox, ariaHidden: 'true' }, [element('path', { d: icon.d })])
					]),
					{ type: 'text', value: label }
				]),
				element('div', { className: ['admonition__content'] }, node.children)
			];
		});
	};
}

function fixHref(href) {
	if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return href;
	const match = /^([^?#]*)(.*)$/.exec(href);
	let pathname = match[1];
	const last = pathname.split('/').pop();
	if (pathname && !pathname.endsWith('/') && !last.includes('.')) pathname += '/';
	return BASE + pathname + match[2];
}

function rehypeLinks() {
	return (tree) => {
		walk(tree, (node) => {
			if (node.type !== 'element') return;
			if (node.tagName === 'a' && typeof node.properties.href === 'string') {
				const href = node.properties.href;
				if (/^https?:\/\//.test(href)) {
					node.properties.target = '_blank';
					node.properties.rel = ['noopener', 'noreferrer'];
				} else {
					node.properties.href = fixHref(href);
				}
			}
		});
	};
}

function rehypeImages() {
	return (tree) => {
		walk(tree, (node, parent) => {
			if (node.type !== 'element' || node.tagName !== 'img') return;
			const src = node.properties.src;
			if (typeof src === 'string' && src.startsWith('/') && !src.startsWith('//')) {
				const file = path.join(STATIC_DIR, decodeURI(src.split(/[?#]/)[0]));
				if (!node.properties.width && fs.existsSync(file)) {
					const size = imageSize(fs.readFileSync(file));
					if (size) {
						node.properties.width = size.width;
						node.properties.height = size.height;
					}
				}
				node.properties.src = BASE + src;
			}
			node.properties.loading = 'lazy';
			node.properties.decoding = 'async';
			if (!parent || parent.type !== 'element' || parent.tagName !== 'p') return;
			const alone = parent.children.every(
				(child) => child === node || (child.type === 'text' && !child.value.trim())
			);
			if (!alone) return;
			const caption = node.properties.title;
			parent.tagName = 'figure';
			parent.properties = {};
			parent.children = [node];
			if (caption) {
				delete node.properties.title;
				parent.children.push(element('figcaption', {}, [{ type: 'text', value: caption }]));
			}
		});
	};
}

const config = {
	extensions: ['.md'],
	smartypants: false,
	highlight: { highlighter: highlight },
	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'append',
				content: [],
				properties: (node) => {
					const label = `Direct link to ${textOf(node).replace(/["{}<>`]/g, '').trim()}`;
					return { className: ['hash-link'], ariaLabel: label, title: label };
				}
			}
		],
		rehypeAdmonitions,
		rehypeImages,
		rehypeLinks
	]
};

export default config;
