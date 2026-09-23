---
title: "Sprite (Badge Type)"
description: "Badge — an icon in the origin screen, with no tooltip."
navigation_title: "Sprite"
---

The simplest [badge](/docs/datapack/origins/badges): an icon next to the power in the origin-selection screen, with no hover text at all.

Type ID: `origins:sprite` — a badge type.

> **Needs the Origins mod.** Badges are an Origins concept; core Apoli has no equivalent.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | Full path to the texture to draw, e.g. `my_pack:textures/gui/badge/water.png`. |

## Examples

Inline on a power:

```json
{
  "type": "apoli:swimming",
  "badges": [
    {
      "type": "origins:sprite",
      "sprite": "my_pack:textures/gui/badge/water.png"
    }
  ]
}
```

As a standalone badge at `data/my_pack/badges/aquatic.json`, referenced by id from any power's `badges` array:

```json
{
  "type": "origins:sprite",
  "sprite": "my_pack:textures/gui/badge/water.png"
}
```

## Notes

- Because it has no text, a `sprite` badge is decoration — reach for [`origins:tooltip`](/docs/datapack/origins/badge_tooltip) whenever the icon needs explaining.
- `sprite` is a **full texture path**, including `textures/` and `.png`. It is not a sprite-atlas name.
