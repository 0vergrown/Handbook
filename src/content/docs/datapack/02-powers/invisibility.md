---
title: "Invisibility (Power Type)"
description: "Makes the entity invisible, with or without its armor."
navigation_title: "Invisibility"
---

Makes the entity that has the power invisible. Its armor and anything else it wears can stay visible or be hidden too.

Type ID: `apoli:invisibility`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `render_armor` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the entity's armor and everything else drawn on its body is shown, including accessories. |
| `render_outline` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the glowing outline is shown. |
| `render_held_items` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether items held in either hand are shown. Set it to `false` to hide them along with the entity. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the entity with the power (the target) is only invisible to viewers (the actors, players or mobs) when this condition passes. |

> [!NOTE]
> `render_armor`, `render_outline` and `render_held_items` only matter while the entity is invisible to the viewer. With a `bientity_condition`, a viewer who can still see the entity sees its armor, outline and held items as normal.
>
> Hiding held items covers the third-person item layer that everyone else sees. Your own first-person hand keeps its item so you can still tell what you are holding.

With `render_armor` set to `false`, every layer drawn on top of the body is hidden, not only vanilla armor. That covers elytra, capes and heads worn on the helmet slot, items in [Trinkets, Accessories and Curios](/docs/compat/accessories/overview) slots, and things other mods draw on the body, such as backpacks and goggles. Held items follow `render_held_items` instead, and layers added by Apoli's own powers, such as [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render), still draw.

## Examples

```json
{
  	"type": "apoli:invisibility",
	"render_armor": false,
	"condition": {
		"type": "apoli:on_fire",
		"inverted": true
	}
}
```

This makes the entity invisible, armor included, while it isn't on fire.

Fully invisible, with armor, outline and held items all hidden:

```json
{
    "type": "apoli:invisibility",
    "render_armor": false,
    "render_outline": false,
    "render_held_items": false
}
```
