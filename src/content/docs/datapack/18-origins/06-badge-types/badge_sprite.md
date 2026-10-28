---
title: "Sprite (Badge Type)"
description: "An icon in the origin screen with no tooltip."
navigation_title: "Sprite"
---

The simplest [badge](/docs/datapack/origins/badges): an icon next to the power in the origin selection screen, with no hover text.

Type ID: `origins:sprite`

> [!NOTE]
> Badges come from the Origins mod, and core Apoli has nothing like them.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The full path of the texture to draw, such as `my_pack:textures/gui/badge/water.png`. |
| `fallback` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of identifiers | _optional_ | Textures to draw when `sprite` isn't in any loaded resource pack. The first one that exists is used. |

## Examples

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

This puts the badge inline on a power.

```json title="data/my_pack/badges/aquatic.json"
{
  "type": "origins:sprite",
  "sprite": "my_pack:textures/gui/badge/water.png"
}
```

As a standalone badge in its own file, any power can reference it by ID from its `badges` array.

## Notes

- With no text, a `sprite` badge is decoration. Use [`origins:tooltip`](/docs/datapack/origins/badge_tooltip) whenever the icon needs explaining.
- `sprite` is a full texture path, including `textures/` and `.png`. Sprite atlas names don't work.
