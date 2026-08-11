---
title: "HUD Render (Data Type)"
description: "An Object or Array of objects used to define how a resource or cooldown bar should be rendered."
navigation_title: "HUD Render"
---

An [Object](/docs/datapack/data-types/object) or [Array](/docs/datapack/data-types/array) of objects used to define how a resource or cooldown bar should be rendered.

> If the specified HUD render is an array of objects, then the HUD render will choose the first object that is allowed to be rendered (its `should_render` field set to `true`) and its condition fulfilled (or if its `condition` field is absent) from top to bottom. The `order` value of the very first object will also be inherited by the following objects that do not have the `order` field specified.

##	Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`should_render` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the bar should be visible or not.
`sprite_location` | [Identifier](/docs/datapack/data-types/identifier) | `"origins:textures/gui/resource_bar.png"` | The path to the file in the assets which contains what the bar looks like. See the List of sprites for a list of files included by default in the mod.
`bar_index` | [Integer](/docs/datapack/data-types/integer) | `0` | The indexed position of the bar on the sprite to use. Please note that indexes start at `0`.
`icon_index` | [Integer](/docs/datapack/data-types/integer) | `0` | The indexed position of the icon on the sprite to use. Please note that indexes start at `0`.
`condition` | Entity Condition Type | _optional_ | If set (and `should_render` is true), the bar will only display when the entity with the power fulfills this condition.
`inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If set to true, inverts the way the hud render process (it'll look like its value is being decreased).
`order` | [Integer](/docs/datapack/data-types/integer) | *optional* | If specified, this determines the position of the HUD render when being rendered. The higher the `order` value is, the higher it is on the rendered HUD render stack.

## Examples

```json
"hud_render": {
    "sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_03.png",
    "bar_index": 5
}
```

This definition shows the resource/cooldown as a white bar with a bone icon.

```json
"hud_render": [
	{
		"sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_03.png",
		"bar_index": 3,
		"condition": {
			"type": "apoli:relative_health",
			"comparison": "<=",
			"compare_to": 0.5
		}
	},
	{
		"sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_01.png",
		"bar_index": 4
	}
]
```
This definition will show the resource/cooldown as a white bar with a bone icon if the player has half or less of their max health. Otherwise, the resource/cooldown will be shown as a red bar with a heart icon.
