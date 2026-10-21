---
title: "Passenger (Entity Condition Type)"
description: "Compares how many passengers are riding the entity with a number."
navigation_title: "Passenger"
---

Compares how many passengers are riding the entity with a number.

Type ID: `apoli:passenger`

> [!NOTE]
> For `bientity_condition`, each passenger is the actor, and the entity the condition is checked on is the target.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only passengers that pass this condition are counted. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the number of passengers is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number the passenger count is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:passenger",
    "bientity_condition": {
        "type": "apoli:actor_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:player"
        }
    }
}
```

This checks whether a player is riding the entity.
