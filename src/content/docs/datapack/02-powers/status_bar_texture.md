---
title: "Status Bar Texture (Power Type)"
description: Remaps HUD sprites such as hearts, armour and hunger.
navigation_title: "Status Bar Texture"
---

Swaps the sprites the HUD draws with, so an origin can have its own hearts, its own armour icons, or hide a bar entirely by pointing it at a blank texture.

Type ID: `apoli:status_bar_texture`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`texture_map` | object | **required** | A map of vanilla sprite id to replacement sprite id. Both sides are [Identifiers](/docs/datapack/data-types/identifier), and the replacement is looked up in `assets/<namespace>/textures/gui/sprites/<path>.png`.

Sprite ids are the vanilla names under `minecraft:hud/…` — for example `hud/heart/full`, `hud/heart/half`, `hud/armor_full`, `hud/armor_half`, `hud/armor_empty`, `hud/food_full`, `hud/food_empty`, `hud/air`.

## Examples

Replace the armour bar with vines:

```json
{
  "type": "apoli:status_bar_texture",
  "texture_map": {
    "minecraft:hud/armor_full":  "moremobs:vine_full",
    "minecraft:hud/armor_half":  "moremobs:vine_half",
    "minecraft:hud/armor_empty": "moremobs:vine_empty"
  }
}
```

Hide the hunger bar for an origin that does not eat, by pointing every hunger sprite at a fully transparent texture:

```json
{
  "type": "apoli:status_bar_texture",
  "texture_map": {
    "minecraft:hud/food_full":          "moremobs:nohunger",
    "minecraft:hud/food_half":          "moremobs:nohunger",
    "minecraft:hud/food_empty":         "moremobs:nohunger",
    "minecraft:hud/food_full_hunger":   "moremobs:nohunger",
    "minecraft:hud/food_empty_hunger":  "moremobs:nohunger"
  }
}
```

Swap in only while a condition holds — here, cracked hearts on low blood:

```json
{
  "type": "apoli:status_bar_texture",
  "texture_map": { "minecraft:hud/heart/full": "vampire:starved_heart" },
  "condition": {
    "type": "apoli:resource",
    "resource": "vampire:blood",
    "comparison": "<=",
    "compare_to": 2
  }
}
```

> The replacement textures ship in the **resource pack** half of your pack, not the data pack half. This power type is 1.21.1 only — 1.20.1 draws its HUD from one atlas with no sprite ids to remap.
