---
title: "Invisibility (Power Type)"
description: "Grants the entity that has the power invisibility; may or may not affect their worn armor."
navigation_title: "Invisibility"
---

Grants the entity that has the power invisibility; may or may not affect their worn armor.

Type ID: `apoli:invisibility`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`render_armor` | Boolean | `false` | Determines whether armor should be shown or not.
`render_outline` | Boolean | `false` | Determines whether the glowing outline should be shown or not.
`render_held_items` | Boolean | `true` | Determines whether items held in either hand should be shown or not. Set it to `false` to hide them along with the entity.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the '**target**' will only be invisible to '**actors**' (either the player or mobs that may see the target) if the bi-entity condition is fulfilled by either or both of them.

> `render_armor`, `render_outline` and `render_held_items` only take effect while the entity is actually invisible to the viewer. With a `bientity_condition`, a viewer who still sees the entity sees its armor, outline and held items normally.

> Hiding held items covers the third-person item layer — what everyone else sees. Your own first-person hand keeps its item so you can still tell what you are holding.

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

This example will make the entity that has the power invisible if the entity is not burning, even hiding the armor.

Fully invisible — armor, outline and held items all hidden:

```json
{
    "type": "apoli:invisibility",
    "render_armor": false,
    "render_outline": false,
    "render_held_items": false
}
```
