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
`max` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | *optional* | The value at which the bar reads full, overriding whatever the power itself would use. Required to draw a bar for a resource that has no `max` of its own — see below.

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

## Bars need something to fill up to

A bar is a fraction: how far the current value has travelled from empty to full. For a [apoli:resource](/docs/datapack/powers/resource) that is `min` to `max`, and for a cooldown it is the cooldown's length.

A resource with no `max` is uncapped, so there is no value that would fill the bar. In that case Apoli **does not draw the bar** and logs one warning naming the power, rather than showing a bar that is stuck at either end.

Three ways out, depending on what you meant:

- Give the resource a `max`. The bar then works normally.
- Give the **`hud_render`** a `max`. The resource stays uncapped and the bar fills up to whatever you name, so a score with no ceiling can still show progress toward the next milestone. Because it is an [Expression](/docs/datapack/data-types/expression), that milestone can move: `"max": "100 * (1 + example:level)"`.
- Set `should_render` to `false` if you did not want a bar at all.

`max` on the `hud_render` works for cooldowns too, if you want the bar to fill over something other than the full cooldown.

If `min` is absent but a maximum is available, the bar treats `0` as empty.

> A resource with a `size` above `1` draws slot `0`, the same value everything else reads when no `position` is given.
