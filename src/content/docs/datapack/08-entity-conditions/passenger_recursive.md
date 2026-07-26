---
title: "origins:passenger_recursive"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks how many passengers (including the passengers' passengers) are currently riding the entity.

Type ID: `origins:passenger_recursive`


!!! note

    In the context of this entity condition type, the '**actor**' entity/entities is/are the passenger(s) (and its passengers' passengers) and the '**target**' is the entity that invoked the condition.


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, only increase the amount of passengers if either or both the '**actor**' entity/entities and the '**target**' entity fulfills this bi-entity condition.
`comparison` | Comparison | `">="` | Determines how the amount of passengers (including the passengers' passengers) of the entity should be compared to the specified value.
`compare_to` | Integer | `1` | The value at which the amount of passengers (including the passengers' passengers) of the entity will be compared to.


## Examples

```json
"condition": {
    "type": "origins:passenger_recursive",
    "bientity_condition": {
        "type": "origins:actor_condition",
        "condition": {
            "type": "origins:entity_type",
            "entity_type": "minecraft:armor_stand"
        }
    },
    "comparison": ">=",
    "compare_to": 2
}
```

This example will check if the target entity is being ridden by an armor stand that is also being ridden by an armor stand (and so on).

