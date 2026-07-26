---
title: Origins
description: The addon that turns Apoli powers into choosable origins.
---

**Origins** is an addon built on Apoli. Apoli gives you [powers](/docs/datapack/introduction/powers); Origins gives players a way to *choose* a bundle of them at spawn. An **origin** is that bundle — a name, an icon, some lore, and a list of Apoli powers.

Everything on this page is Origins-specific. If you're not using the Origins mod, you don't need any of it — you can grant Apoli powers by command or your own addon instead.

## An origin file

Origins live in `data/<namespace>/origins/`. The file name is the origin's id.

```json
{
  "powers": [
    "origins:aqua_affinity",
    "origins:water_breathing",
    "origins:like_water"
  ],
  "icon": "minecraft:cod",
  "impact": 2,
  "name": "Merling",
  "description": "You breathe water — but air is another matter."
}
```

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `powers` | list of identifier | `[]` | The Apoli powers this origin grants. |
| `icon` | item / identifier | — | Shown in the selection screen. |
| `impact` | 0–3 | `0` | The "impact" dots — how strong the origin is. |
| `name` | [text](/docs/datapack/data-types/text-component) | auto | The origin's display name. |
| `description` | [text](/docs/datapack/data-types/text-component) | auto | The lore shown when selecting. |
| `order` | number | `0` | Sort position in the screen. |
| `loading_priority` | number | `0` | Higher wins when packs define the same id. |
| `unchoosable` | boolean | `false` | Exists but can't be picked (e.g. an admin origin). |
| `name_scroll_speed` | number | — | Speed a long name marquees at. |

## Powers come from Apoli

The `powers` list is just Apoli power ids. There's nothing Origins-specific about them — they're the same powers you'd write in any data pack. A good origin is usually **one [`apoli:multiple`](/docs/datapack/powers/multiple)** that bundles the traits, plus a couple of standalone powers, so the selection screen stays readable.

## Origins need a layer

An origin file alone doesn't appear in-game. It has to be placed into a **layer** — the slot the player chooses from. See [Layers](/docs/datapack/origins/layers).

## See also

- [Layers](/docs/datapack/origins/layers) — how origins are offered to players.
- [`apoli:multiple`](/docs/datapack/powers/multiple) — the usual way to package an origin's traits.
