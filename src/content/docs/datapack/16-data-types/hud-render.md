---
title: "HUD Render (Data Type)"
description: "An object or array of objects that decides how a resource or cooldown bar is drawn on the HUD."
navigation_title: "HUD Render"
---

An [Object](/docs/datapack/data-types/object) or [Array](/docs/datapack/data-types/array) of objects that decides how a resource or cooldown bar is drawn.

> [!NOTE]
> With an array, the bar uses the first object, from top to bottom, that is allowed to render (its `should_render` is `true`) and whose condition passes or is absent. The `order` value of the first object carries over to the following objects that don't set `order` themselves.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `should_render` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the bar is visible. |
| `sprite_location` | [Identifier](/docs/datapack/data-types/identifier) | `"apoli:textures/gui/resource_bar.png"` | The path to the texture in the assets that holds what the bar looks like. |
| `bar_index` | [Integer](/docs/datapack/data-types/integer) | `0` | Which bar on the sprite to use. Indexes start at `0`. |
| `icon_index` | [Integer](/docs/datapack/data-types/integer) | `0` | Which icon on the sprite to use. Indexes start at `0`. |
| `condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | With `should_render` on, the bar only shows when the entity with the power passes this condition. |
| `inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the bar fills the other way, so its value looks like it is going down. |
| `order` | [Integer](/docs/datapack/data-types/integer) | _optional_ | The bar's position in the stack of HUD bars. The higher the `order`, the higher it sits. |
| `max` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _optional_ | The value at which the bar reads full, overriding whatever the power itself would use. Required to draw a bar for a resource that has no `max` of its own (see below). |
| `fallback` | [Identifier](/docs/datapack/data-types/identifier), [Object](/docs/datapack/data-types/object) or [Array](/docs/datapack/data-types/array) of them | _optional_ | What to draw when `sprite_location` isn't in any loaded resource pack. See [Fallback textures](#fallback-textures). |

## Fallback textures

A `sprite_location` that comes from a resource pack is missing for every player who doesn't have that pack loaded, and their bar shows the missing texture instead. `fallback` names what to draw in that case. The bar goes through the fallbacks in order and draws the first one whose texture exists. If none of them exists either, it keeps `sprite_location`.

Each fallback is a texture identifier or an object:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `sprite_location` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The texture to draw instead. |
| `bar_index` | [Integer](/docs/datapack/data-types/integer) | the entry's `bar_index` | Which bar on this texture to use. |
| `icon_index` | [Integer](/docs/datapack/data-types/integer) | the entry's `icon_index` | Which icon on this texture to use. |

A plain identifier keeps the entry's own `bar_index` and `icon_index`, which suits a fallback sheet laid out the same way as yours. Use the object form when the bar you want sits at a different position on the fallback sheet, which is usually the case when falling back to one of the sheets that ship with Apoli.

Each player's game checks their own resource packs, and checks again whenever resource packs reload, so turning a pack on or off in the options menu switches the bar straight away.

## Which powers draw a bar

Every power type with a `hud_render` field draws a bar from it, and the bar always shows the same number the [Resource](/docs/datapack/entity-conditions/resource) condition reads for that power:

| Kind | Power types | The bar |
| --- | --- | --- |
| Resource | [apoli:resource](/docs/datapack/powers/resource) | Always shown. Fills from `min` to `max`. |
| Cooldown | [apoli:cooldown](/docs/datapack/powers/cooldown), [apoli:action_on_key_press](/docs/datapack/powers/action_on_key_press), [apoli:action_on_key_sequence](/docs/datapack/powers/action_on_key_sequence), [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), [apoli:action_on_hit](/docs/datapack/powers/action_on_hit), [apoli:action_when_hit](/docs/datapack/powers/action_when_hit), [apoli:action_on_kill](/docs/datapack/powers/action_on_kill), [apoli:action_on_collision](/docs/datapack/powers/action_on_collision), [apoli:game_event_listener](/docs/datapack/powers/game_event_listener), [apoli:action_on_scroll_wheel](/docs/datapack/powers/action_on_scroll_wheel), [apoli:action_on_mouse_movement](/docs/datapack/powers/action_on_mouse_movement) | Only shown while cooling down. Fills as the cooldown recovers. |

The bar is drawn whether or not the power's own `condition` passes, so an ability that needs you on the ground still shows its cooldown while you are in the air. Use the `condition` on the `hud_render` entry to hide it.

## Where the bars sit

Bars stack upward in the status column on the right, starting on the first free row above whatever the HUD already draws there: the hunger bar, mount health, the air bubbles, and rows other mods add, such as a thirst meter. Apoli claims the rows it fills, so a HUD element drawn after it stacks on top instead of through it. Among Apoli's own bars, a higher `order` sits higher up.

There is nothing to configure for this in a data pack. Apoli reads the HUD as it is drawn, so a mod that hides the hunger bar, keeps the air bubbles up all the time or adds a row of its own moves the bars without either mod knowing about the other.

> [!NOTE]
> On NeoForge every HUD element advances a shared row counter, and Apoli reads and advances the same one. Fabric has no shared counter, so Apoli measures the column instead, and anything drawn on the grid of status bar rows inside it counts as a row. An element that draws itself some other way, off the 10-pixel grid or wider than the column, isn't seen, and the offsets below are there for that case.

### Client options

These live in `config/apoli-client.json` and on the Apoli Settings screen. They only affect the player who sets them.

| Option | Default | What it does |
| --- | --- | --- |
| `hudAutoStack` | `true` | Places the bars above whatever the HUD already draws. `false` pins them to the vanilla position, one row above the hunger bar, and leaves the rest to the offsets. |
| `hudOffsetX` | `0` | Moves the bars sideways. Positive is right. |
| `hudOffsetY` | `0` | Moves the bars down. Negative is up. |

## Examples

```json
"hud_render": {
    "sprite_location": "apoli:textures/gui/community/spiderkolo/resource_bar_03.png",
    "bar_index": 5
}
```

This draws the resource or cooldown with bar `5` of the `resource_bar_03.png` sprite sheet.

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

This draws bar `3` of `resource_bar_03.png` while the player has half of their max health or less, and bar `4` of `resource_bar_01.png` otherwise.

```json
"hud_render": {
    "sprite_location": "example:textures/gui/mana_bar.png",
    "bar_index": 0,
    "icon_index": 0,
    "fallback": {
        "sprite_location": "apoli:textures/gui/resource_bar.png",
        "bar_index": 3,
        "icon_index": 2
    }
}
```

This draws the bar from the `example` resource pack, and bar `3` with icon `2` of Apoli's own sheet for players who don't have that pack.

## Bars need something to fill up to

A bar is a fraction: how far the current value has travelled from empty to full. For an [apoli:resource](/docs/datapack/powers/resource) that is `min` to `max`, and for a cooldown it is the cooldown's length.

A resource with no `max` is uncapped, so there is no value that would fill the bar. In that case Apoli doesn't draw the bar and logs one warning naming the power, instead of showing a bar stuck at either end.

There are three ways out, depending on what you meant:

- Give the resource a `max`, and the bar works normally.
- Give the `hud_render` a `max`. The resource stays uncapped and the bar fills up to whatever you name, so a score with no ceiling can still show progress toward the next milestone. Because it is an [expression](/docs/datapack/data-types/expression), that milestone can move: `"max": "100 * (1 + example:level)"`.
- Set `should_render` to `false` if you didn't want a bar at all.

`max` on the `hud_render` works for cooldowns too, if you want the bar to fill over something other than the full cooldown.

If `min` is absent but there is a maximum, the bar treats `0` as empty.

> [!NOTE]
> A resource with a `size` above `1` draws slot `0`, the same value everything else reads when no `position` is given.
