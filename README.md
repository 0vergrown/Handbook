# Handbook

Documentation for Apoli, a data-driven power engine for Minecraft, and Origins, the mod built on it.

The site is a static [SvelteKit](https://svelte.dev/) app. It is prerendered to plain HTML and deployed to GitHub Pages, so no server runs when someone reads it.

## Develop

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `build/`, and `npm run preview` serves that folder locally.

## Deploy

A push to `main` runs `.github/workflows/deploy.yml`. It builds with the base path set to the repository name, so the site works at `https://<user>.github.io/<repo>/`, and publishes the result to GitHub Pages. To serve the site from the root of a custom domain, set `BASE_PATH` to an empty string in that workflow.

## Writing docs

The docs are Markdown files in `src/content/docs/`: `datapack/` for the JSON reference, `addon/` for the Java API and `compat/` for integrations with other mods. Blog posts live in `src/content/blog/`. The sidebar, table of contents, previous and next links, and the search index are all built from those files, so a new page only needs a Markdown file with `title` and `description` frontmatter.

Images go in `static/assets/`, in `docs/` or `blog/`, and are linked from Markdown with a root path such as `![Alt text](/assets/blog/post-slug/screenshot.png "Caption")`. The title becomes the caption under the image.

## Configuration

Links to GitHub, Discord, X, Modrinth and CurseForge are in `src/lib/config.js`. Colors and other design tokens are in `src/lib/styles/tokens.css`.
