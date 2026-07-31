---
title: "Passenger (Entity Condition Type)"
description: "Checks how many passengers are currently riding the entity."
navigation_title: "Passenger"
---

Checks how many passengers are currently riding the entity.

Type ID: `apoli:passenger`

> In the context of this entity condition type, the '**actor**' entity/entities is/are the passenger(s) and the '**target**' is the entity that invoked the condition.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, only increase the amount of passengers if either or both the '**actor**' entity/entities and the '**target**' entity fulfills this bi-entity condition.
`comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the amount of passengers of the entity should be compared to the specified value.
`compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The value at which the amount of passengers of the entity will be compared to.

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

This example will check if the target entity is being ridden by a player (actor entity).
