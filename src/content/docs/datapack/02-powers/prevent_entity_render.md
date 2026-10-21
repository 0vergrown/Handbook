---
title: "Prevent Entity Render (Power Type)"
description: "Hides entities from the player that has the power, including their armor, shadow and hitbox."
navigation_title: "Prevent Entity Render"
---

Hides entities from the player that has the power, including their armor, shadow and hitbox.

Type ID: `apoli:prevent_entity_render`

> [!WARNING]
> `entity_condition` and `bientity_condition` are only evaluated on the client, so condition types that only work on the server won't work here.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, only entities that pass this condition are hidden. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, an entity is only hidden when this condition passes. The actor is the player with the power, and the target is the entity being hidden. |

> [!NOTE]
> The player with the power is not exempt. If the conditions match the player themselves, they disappear from their own third-person view too. Use a `bientity_condition` such as `apoli:target_condition` if you only mean other entities.

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

This makes creepers invisible to the player during the day.

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

While the player is underwater, this hides mobs in the aquatic entity group that are more than 8 blocks away.
