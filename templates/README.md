# Doc page templates

Reference templates for writing Handbook pages. **These files are not part of the
site** — they live outside `src/content/`, so they are never built, routed, or
searched. They exist only so every real doc page comes out in the same shape.

## How to use one

1. Pick the template that matches what you're documenting:

   | Template              | For                                                 |
   |-----------------------|-----------------------------------------------------|
   | `power-type.md`       | a power `type` (e.g. `apoli:attribute`)             |
   | `action.md`           | an action (entity / bientity / block / item / meta) |
   | `condition.md`        | a condition                                         |
   | `data-type.md`        | a reusable value type (modifier, effect, …)         |
   | `section-overview.md` | the intro/overview page of a section                |

2. **Copy** it into the right place under `src/content/docs/`:

   ```
   src/content/docs/<topic>/<NN-section>/<NN-page>.md
   ```

   e.g. `src/content/docs/datapack/02-powers/05-swim_speed.md`.

3. **Replace every placeholder.** Placeholders are written in `UPPER_SNAKE_CASE`
   (like `TYPE_ID`, `FIELD`, `DEFAULT`) and the guidance is in `<!-- HTML comments -->`.
   Delete the comments as you go. Nothing should be left in caps that isn't meant
   to be there.

4. Run `npm run build` and confirm:
   - no broken-link warnings,
   - the page shows up in its section sidebar,
   - searching its title finds it.

## The rules that matter

- **Frontmatter `title` + `description` are required.** The title becomes the
  `<h1>`, the sidebar label, and the search title. The description shows under the
  heading and in search results.
- **Every field in the fields table must match the source codec** — name, type,
  and default.
- Keep the house voice: one-line summary → fields table → working example. Short
  paragraphs, second person, real type names.
