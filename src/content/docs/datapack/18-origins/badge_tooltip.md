---
title: "origins:tooltip (badge)"
description: "Badge — an icon with hover text in the origin screen."
---

An icon in the origin-selection screen that shows a line of text when hovered. The everyday [badge](/docs/datapack/origins/badges) type for explaining a power.

Type ID: `origins:tooltip` — a badge type.

> **Needs the Origins mod.** Badges are an Origins concept; core Apoli has no equivalent. Not to be confused with the [`apoli:tooltip`](/docs/datapack/powers/tooltip) *power*, which adds a line to an item's tooltip in-world.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Full path to the texture to draw, e.g. `origins:textures/gui/badge/active.png`. |
| `text` | [Text Component](/docs/datapack/data-types/text-component) | _required_ | The hover text. A bare string is a literal; use an object for a translation key or styling. |

The text wraps to the width of the origin panel, so a couple of sentences is fine.

## Examples

A plain literal:

```json
{
  "type": "origins:tooltip",
  "sprite": "my_pack:textures/gui/badge/water.png",
  "text": "You breathe water, but drown in air."
}
```

A translated one, so the badge follows the player's language:

```json
{
  "type": "origins:tooltip",
  "sprite": "my_pack:textures/gui/badge/water.png",
  "text": { "translate": "badge.my_pack.aquatic" }
}
```

## See also

- [Badges](/docs/datapack/origins/badges) — how badges are attached to a power.
- [`origins:sprite`](/docs/datapack/origins/badge_sprite) — the same icon without text.
- [`origins:keybind`](/docs/datapack/origins/badge_keybind) — use this instead when the text should name a key.
