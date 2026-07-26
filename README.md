# Handbook

Documentation for **Apoli** — the data-driven power engine for Minecraft — and **Origins**, the addon built on top of it.

A static [SvelteKit](https://svelte.dev/) site, prerendered to plain HTML and deployed to GitHub Pages. No server runs at request time.

## Develop

Requires Node 18+.

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # -> ./build  (static site)
npm run preview  # serve the build locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with the
base path set to the repo name (so the site works at
`https://<user>.github.io/<repo>/`) and publishes to GitHub Pages.

To use a **custom domain** served at the root, set `BASE_PATH` to `""` in that
workflow.

## Writing docs

Documentation is Markdown under `src/content/docs/` (`datapack/` for the JSON
side, `addon/` for the Java side) and `src/content/blog/` for posts. The sidebar,
table of contents, prev/next and search index are all generated from the files —
just add a Markdown file with `title` and `description` frontmatter.

See [`CLAUDE.md`](./CLAUDE.md) for the full authoring guide and the rule that
keeps these docs in sync with the mod source.

## Configuration

Social and download links live in `src/lib/config.js` (some are `TODO`
placeholders). Design tokens are in `src/lib/styles/tokens.css`.
