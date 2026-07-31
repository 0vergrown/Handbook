---
title: "Prevent Entity Render (Power Type)"
description: "Prevents an entity from being rendered to the entity that has the power, including their armor, shadow, and hitboxes."
navigation_title: "Prevent Entity Render"
---

Prevents an entity from being rendered to the entity that has the power, including their armor, shadow, and hitboxes.

Type ID: `apoli:prevent_entity_render`

!!! caution

    The conditions specified in the `entity_condition` and `bientity_condition` fields are only evaluated on the **client-side**, therefore, using any condition types that only work on the server-side will not work.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_condition` | Entity Condition Type | _optional_ | If specified, only entities which fulfills this condition will be affected.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the power will only be active if this condition is fulfilled by either or both the 'actor' (the player that has the power) and 'target' (the entity that will not render) entities.

## Examples

```json
{
    "type": "apoli:prevent_entity_render",
    "entity_condition": {
		"type": "apoli:entity_type",
		"entity_type": "minecraft:creeper"
	},
	"condition": {
		"type": "apoli:daytime"
	}
}
```

This example will make creepers invisible for the player that has the power during the day.

```json
{
    "type": "apoli:prevent_entity_render",
    "bientity_condition": {
        "type": "apoli:and",
        "conditions": [
            {
                "type": "apoli:distance",
                "comparison": ">",
                "compare_to": 8
            },
            {
                "type": "apoli:target_condition",
                "condition": {
                    "type": "apoli:entity_group",
                    "group": "aquatic"
                }
            }
        ]
    },
    "condition": {
        "type": "apoli:submerged_in",
        "fluid": "minecraft:water"
    }
}
```

This example will prevent mobs that are from the 'aquatic' entity group from rendering for the entity that has the power only if the entity that has the power is submerged in water and those mobs are 9 or more blocks away.
