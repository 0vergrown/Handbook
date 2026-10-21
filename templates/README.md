# Page templates

These templates give every reference page the same shape. They sit outside `src/content/`, so the site never builds, routes or indexes them.

| Template | Use it for |
| --- | --- |
| `power-type.md` | a power type, such as `apoli:attribute` |
| `action.md` | an entity, bi-entity, block, item or meta action |
| `condition.md` | an entity, bi-entity, block, item, damage, biome, fluid or meta condition |
| `data-type.md` | a value shape that fields share, such as an attribute modifier |
| `section-overview.md` | the first page of a section |

## Making a page

1. Copy the template into its section, for example `src/content/docs/datapack/02-powers/swim_speed.md`. Type pages are named after the type's short ID.
2. Replace every `UPPER_SNAKE_CASE` placeholder. When you are done, nothing in capitals should be left that isn't meant to be there.
3. Take every field name, type and default from the type's codec in the mod source. `optionalFieldOf("name", value)` is optional with that default, and `fieldOf("name")` is required.
4. Run `node scripts/clean-docs.mjs` and `node scripts/retitle-docs.mjs`. The second one rewrites `title`, `navigation_title` and `aliases` on type pages, so those three lines in a template are only a starting point.
5. Run `npm run build`. It must finish without broken-link warnings, and the page must show up in its sidebar section and in search.

## Writing the page

Write the prose with the humanizer skill in `Node/60 Sources/raw/humanizer-main`. Reference pages stay neutral and plain:

- Open with one or two sentences on what the type does. Don't repeat the frontmatter description word for word.
- List every field in the table, and link nested types to their data type pages.
- Give at least one example that works when pasted into a data pack, and say in one line what it does.
- Put a gotcha in an admonition (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]` or `> [!DANGER]`).
- Describe what the mod does now. Version history and fix announcements belong in a blog post.
- No em dashes, no decorative bold, and no HTML comments.
