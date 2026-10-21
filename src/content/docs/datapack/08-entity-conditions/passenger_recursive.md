---
title: "Passenger Recursive (Entity Condition Type)"
description: "Compares how many passengers ride the entity, counting passengers of passengers, with a number."
navigation_title: "Passenger Recursive"
---

Compares how many passengers are riding the entity, counting the passengers' passengers too, with a number.

Type ID: `apoli:passenger_recursive`

> [!NOTE]
> For `bientity_condition`, each passenger (and each of its passengers) is the actor, and the entity the condition is checked on is the target.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only passengers that pass this condition are counted. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the passenger count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number the passenger count is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:passenger_recursive",
    "bientity_condition": {
        "type": "apoli:actor_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:armor_stand"
        }
    },
    "comparison": ">=",
    "compare_to": 2
}
```

This checks whether the entity is ridden by at least two armor stands, such as one armor stand riding another.
