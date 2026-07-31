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
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the '**target**' will only be invisible to '**actors**' (either the player or mobs that may see the target) if the bi-entity condition is fulfilled by either or both of them.

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
