---
title: "Tooltip (Badge Type)"
description: "An icon with hover text in the origin screen."
navigation_title: "Tooltip"
---

An icon in the origin selection screen that shows a line of text when hovered. It is the everyday [badge](/docs/datapack/origins/badges) type for explaining a power.

Type ID: `origins:tooltip`

> [!NOTE]
> Badges come from the Origins mod, and core Apoli has nothing like them. Don't confuse this with the [`apoli:tooltip`](/docs/datapack/powers/tooltip) power, which adds a line to an item's tooltip in the world.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sprite` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The full path of the texture to draw, such as `origins:textures/gui/badge/isaacfanta/active.png`. |
| `fallback` | [Identifier](/docs/datapack/data-types/identifier) or [Array](/docs/datapack/data-types/array) of identifiers | _optional_ | Textures to draw when `sprite` isn't in any loaded resource pack. The first one that exists is used. |
| `text` | [Text Component](/docs/datapack/data-types/text-component) | _required_ | The hover text. A plain string is literal text, and an object can use a translation key or styling. |

The text wraps to the width of the origin panel, so a couple of sentences fit.

## Examples

```json
{
  "type": "origins:tooltip",
  "sprite": "my_pack:textures/gui/badge/water.png",
  "text": "You breathe water, but drown in air."
}
```

This badge shows literal text.

```json
{
  "type": "origins:tooltip",
  "sprite": "my_pack:textures/gui/badge/water.png",
  "text": { "translate": "badge.my_pack.aquatic" }
}
```

This one uses a translation key, so the badge follows the player's language.
