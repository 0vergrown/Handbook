---
title: "Entity Glow (Power Type)"
description: "Makes other entities glow (as with the glowing status effect), but only for the player that has the power."
navigation_title: "Entity Glow"
aliases: ["self_glow"]
---

Makes other entities glow (as with the glowing status effect), but only for the player that has the power.

Type ID: `apoli:entity_glow`

> You can use a color picker website and divide the RGB values by 255 to get the values *(e.g: ranging from 0.0 to 1.0)* to be used for the power type.

> Both the holder of the power and the glowing entity can be **any entity**, not just living ones — granting `apoli:self_glow` to a projectile (e.g. an arrow or a custom projectile) makes the projectile itself glow.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_condition` | Entity Condition Type | _optional_ | If specified, only entities which fulfill this condition will glow for the player that has the power.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the power will only be active if this condition is fulfilled by either or both the 'actor' (the player that has the power) and 'target' (the entity that would glow) entities.
`use_teams` | Boolean | `true` | Determines whether glowing entities should use their team's color with their glow. If set to false, the entity will instead use the `red`, `green` and `blue` fields within this power type.
`red` | Float | `1.0` | Value by which the red component of the glow will be multiplied. Range: 0.0 - 1.0.
`green` | Float | `1.0` | Value by which the green component of the glow will be multiplied. Range: 0.0 - 1.0.
`blue` | Float | `1.0` | Value by which the blue component of the glow will be multiplied. Range: 0.0 - 1.0.
`self_glow_target` | Boolean | `false` | If `true`, the power makes the entity that **has** the power glow for everyone else, instead of making other entities glow for the holder. The `apoli:self_glow` type ID is an alias for this power with `self_glow_target` defaulting to `true` (see [Self Glow](/docs/datapack/powers/self_glow)).

## Examples

```json
{
	"type": "apoli:entity_glow",
    "entity_condition": {
      	"type": "apoli:and",
      	"conditions": [
        	{
          		"type": "apoli:in_block_anywhere",
          		"block_condition": {
            		"type": "apoli:in_tag",
            		"tag": "apoli:cobwebs"
          		}
        	},
        	{
          		"type": "apoli:entity_group",
          		"group": "arthropod",
          		"inverted": true
        	}
      	]
    }
}
```

This example will make all entities which are not arthropods glow when they're in cobwebs. The glow is the same color as the entity's team.

```json
{
	"type": "apoli:entity_glow",
    "bientity_condition": {
		"type": "apoli:can_see"
	},
	"use_teams": false,
	"red": 0.0,
	"green": 1.0,
	"blue": 0.0
}
```

This example will make all entities that the player is able to see glow with a green glow.
