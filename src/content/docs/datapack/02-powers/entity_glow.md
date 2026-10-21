---
title: "Entity Glow (Power Type)"
description: "Makes other entities glow, as with the Glowing effect, but only for the player that has the power."
navigation_title: "Entity Glow"
aliases: ["self_glow"]
---

Makes other entities glow, as they do with the Glowing effect, but only for the player that has the power.

Type ID: `apoli:entity_glow`

Both the entity with the power and the glowing entity can be any entity, not only living ones. Granting `apoli:self_glow` to a projectile, such as an arrow or a custom projectile, makes the projectile itself glow.

In `bientity_condition`, the actor is always the entity that has the power. For `apoli:entity_glow` that is the viewer, and the target is the entity that would glow. For `apoli:self_glow` it is the other way round: the actor is the glowing entity and the target is the viewer who might see it.

> [!TIP]
> To get colour values from a colour picker, divide each RGB value by 255 to get a number between 0.0 and 1.0.

> [!WARNING]
> `entity_condition` and `bientity_condition` are evaluated on the client, so only conditions the client can answer work: the world and time, entity flags and pose, equipment, `apoli:power_active`, resources and cooldowns, your own [apoli:inventory](/docs/datapack/powers/inventory) containers, and [entity sets](/docs/datapack/bientity-conditions/in_entity_set), both your own and those of any entity in view. `apoli:command`, `apoli:advancement`, `apoli:scoreboard`, `apoli:stat` and `apoli:predicate` read as `false` there. Nothing glows in first person either, because Minecraft doesn't render the camera entity, so test `apoli:self_glow` in third person (F5).

> [!NOTE]
> A `bientity_condition` or `entity_condition` that fails to parse fails the whole power, with a log line naming it. Check the log first, because a glow that ignores its condition is usually a condition that never parsed.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, only entities that pass this condition glow for the player with the power. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, an entity only glows when this condition passes. The actor is the player with the power, and the target is the entity that would glow. |
| `use_teams` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether glowing entities use their team colour. If `false`, the glow uses the `red`, `green` and `blue` fields. |
| `red` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplies the red component of the glow, from 0.0 to 1.0. |
| `green` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplies the green component of the glow, from 0.0 to 1.0. |
| `blue` | [Float](/docs/datapack/data-types/float) | `1.0` | Multiplies the blue component of the glow, from 0.0 to 1.0. |
| `self_glow_target` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, the entity that has the power glows for everyone else, instead of other entities glowing for it. The `apoli:self_glow` type ID is an alias for this power with `self_glow_target` set to `true` (see [Self Glow](/docs/datapack/powers/self_glow)). |

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
            		"tag": "apoli:material/cobweb"
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

This makes every entity that isn't an arthropod glow while it is in a cobweb. The glow uses the entity's team colour.

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

This makes every entity the player can see glow green.
