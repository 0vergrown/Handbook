---
title: "Status Bar Texture (Power Type)"
description: "Replaces the textures of the status bars and other HUD sprites, from a sprite sheet, a map of sprite names, or both."
navigation_title: "Status Bar Texture"
---

Replaces the textures of the status bars (health, hunger, armor, air, experience, the mount's health and jump bar) and the other sprites the HUD draws, for the player who has the power.

Type ID: `apoli:status_bar_texture`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`texture` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | A sprite sheet laid out like the classic `textures/gui/icons.png` (256×256, or any larger multiple of it). Every status bar icon is drawn from the same spot on this sheet instead.
`texture_map` | [Object](/docs/datapack/data-types/object) of [Identifier](/docs/datapack/data-types/identifier) pairs | _optional_ | Each key is a HUD sprite to replace, each value the sprite to draw in its place. Both are GUI sprite names, such as `minecraft:hud/heart/full`.
`priority` | [Integer](/docs/datapack/data-types/integer) | `0` | Which power wins when several replace the same sprite. Higher wins.

Give `texture`, `texture_map`, or both. A power with neither fails to load.

## Sprite names

Sprite names are paths under `assets/<namespace>/textures/gui/sprites/`, without `.png`. The vanilla status bar sprites are:

Bar | Sprites
----|--------
Health | `hud/heart/container` and `hud/heart/container_hardcore`; `hud/heart/full` and `hud/heart/half`, with `hardcore_` forms (`hud/heart/hardcore_full`); the same for `poisoned_`, `withered_`, `absorbing_` and `frozen_` hearts (`hud/heart/poisoned_full`, `hud/heart/poisoned_hardcore_half`). Every heart also has a `_blinking` form, shown while the bar flashes after damage or healing.
Armor | `hud/armor_empty`, `hud/armor_half`, `hud/armor_full`
Hunger | `hud/food_empty`, `hud/food_half`, `hud/food_full`, and the `_hunger` forms shown under Hunger
Air | `hud/air`, `hud/air_bursting`
Experience | `hud/experience_bar_background`, `hud/experience_bar_progress`
Mount | `hud/heart/vehicle_container`, `hud/heart/vehicle_full`, `hud/heart/vehicle_half`, `hud/jump_bar_background`, `hud/jump_bar_cooldown`, `hud/jump_bar_progress`
Crosshair | `hud/crosshair`, `hud/crosshair_attack_indicator_background`, `hud/crosshair_attack_indicator_progress`, `hud/crosshair_attack_indicator_full`
Hotbar | `hud/hotbar`, `hud/hotbar_selection`, `hud/hotbar_offhand_left`, `hud/hotbar_offhand_right`, `hud/hotbar_attack_indicator_background`, `hud/hotbar_attack_indicator_progress`

A replacement can be another vanilla sprite (draw frozen hearts all the time) or a texture of your own in a resource pack, at `assets/<namespace>/textures/gui/sprites/<path>.png`. Replacement textures can be any size; they are scaled to fit.

## How several powers combine

Every active `apoli:status_bar_texture` power of the player counts. For each sprite, the `texture_map` of the highest-`priority` power that maps it wins; a sprite that no map lists comes from the highest-priority `texture` sheet, if any. So one power can restyle the hearts while another restyles the hunger bar, and both show.

## Versions

- **1.21.1:** on top of the status bars, `texture_map` can replace any sprite the HUD draws by name, including sprites that other mods' HUD elements draw from the vanilla set.
- **1.20.1:** the HUD draws its icons from `icons.png` and `widgets.png` rather than named sprites. `texture_map` still takes the sprite names above, and Apoli finds the matching icon, so the same power works on both versions. On 1.20.1 it covers the sprites in the table above.

> The replacements are worked out once per tick from the player's powers and conditions, and looked up per sprite while the HUD draws. With no `status_bar_texture` power in any loaded data pack, the HUD draws exactly as without Apoli.

## Examples

```json
{
	"type": "apoli:status_bar_texture",
	"texture_map": {
		"minecraft:hud/heart/full": "minecraft:hud/heart/frozen_full",
		"minecraft:hud/heart/half": "minecraft:hud/heart/frozen_half",
		"minecraft:hud/heart/hardcore_full": "minecraft:hud/heart/frozen_hardcore_full",
		"minecraft:hud/heart/hardcore_half": "minecraft:hud/heart/frozen_hardcore_half"
	},
	"condition": {
		"type": "apoli:biome",
		"condition": {
			"type": "apoli:in_tag",
			"tag": "minecraft:spawns_snow_foxes"
		}
	}
}
```

This example shows frozen hearts while the player is in a snowy biome.

```json
{
	"type": "apoli:status_bar_texture",
	"texture": "example:textures/gui/blazeborn_icons.png",
	"priority": 1
}
```

This example draws every status bar icon from `assets/example/textures/gui/blazeborn_icons.png`, a sheet in the classic `icons.png` layout. Sheets made for Apace's Apoli work unchanged.
