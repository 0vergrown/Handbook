import { escapeSvelte } from 'mdsvex';
import { createHighlighter, createCssVariablesTheme } from 'shiki';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// On GitHub project pages the site is served from /<repo>/. Links authored in
// markdown as "/docs/..." must have that base baked in at build time, or they
// break in production. The deploy workflow sets BASE_PATH; locally it's "".
const BASE = process.env.BASE_PATH ?? '';

/** Rewrite root-relative hrefs/srcs in compiled markdown to include the base path. */
function rehypeBasePath() {
	if (!BASE) return (tree) => tree;
	const fix = (value) =>
		typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')
			? BASE + value
			: value;
	const walk = (node) => {
		if (node.type === 'element') {
			if (node.tagName === 'a' && node.properties?.href) {
				node.properties.href = fix(node.properties.href);
			}
			if ((node.tagName === 'img' || node.tagName === 'source') && node.properties?.src) {
				node.properties.src = fix(node.properties.src);
			}
		}
		if (node.children) node.children.forEach(walk);
	};
	return (tree) => {
		walk(tree);
		return tree;
	};
}

// A single theme driven entirely by CSS variables (--shiki-*), so one highlight
// pass serves both light and dark mode — the variables are redefined per theme
// in src/lib/styles/tokens.css. This mirrors how svelte.dev highlights code.
const theme = createCssVariablesTheme({
	name: 'css-variables',
	variablePrefix: '--shiki-',
	variableDefaults: {},
	fontStyle: true
});

// Languages that appear in the Apoli / Origins docs. `text` is the fallback.
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
	'gradle',
	'xml',
	'html',
	'css',
	'markdown',
	'diff',
	'mcfunction',
	'text'
];

// createHighlighter is async; a top-level await here is fine because
// svelte.config.js imports this module asynchronously during startup.
const highlighter = await createHighlighter({
	themes: [theme],
	langs: LANGS.filter((l) => l !== 'gradle' && l !== 'mcfunction') // aliases resolved below
});

// gradle ≈ groovy, mcfunction has no grammar → treat as text
const ALIASES = { gradle: 'groovy', mcfunction: 'text' };
const loaded = new Set(highlighter.getLoadedLanguages());

/** @type {import('mdsvex').MdsvexOptions} */
const config = {
	extensions: ['.md'],

	highlight: {
		highlighter: (code, lang = 'text') => {
			const resolved = ALIASES[lang] ?? lang;
			const language = loaded.has(resolved) ? resolved : 'text';
			const html = highlighter.codeToHtml(code, {
				lang: language,
				theme: 'css-variables'
			});
			// escapeSvelte prevents the compiler from treating { } ` in code as Svelte syntax
			return escapeSvelte(html);
		}
	},

	remarkPlugins: [remarkGfm],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap',
				properties: { class: 'heading-anchor', 'data-heading-anchor': true }
			}
		],
		rehypeBasePath
	]
};

export default config;
