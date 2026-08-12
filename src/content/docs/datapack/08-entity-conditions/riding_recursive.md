---
title: "Riding Recursive (Entity Condition Type)"
description: "Checks whether the 'actor' entity is directly riding the 'target' entity or the passenger(s) of the 'target' entity."
navigation_title: "Riding Recursive"
---

Checks whether the '**actor**' entity is directly riding the '**target**' entity or the passenger(s) of the '**target**' entity.

Type ID: `apoli:riding_recursive`

> In the context of this entity condition type, the '**actor**' entity is the passenger and the entity that invoked the condition whilst the '**target**' entities are the entity that is being directly ridden and the passenger(s) of the said entity.


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, this condition type will only evaluate to true if this condition is fulfilled by either or both the '**actor**' and '**target**' entities.
`comparison` | Comparison | `">="` | Determines how the amount of entities currently being ridden should be compared to the specified value.
`compare_to` | Integer | `1` | The value at which the amoutn of entities currently being ridden will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:riding_recursive",
    "comparison": ">=",
    "compare_to": 2
}
```

This example will check if the '**actor**' entity is currently riding an entity directly or an entity that has one or multiple passengers, regardless of their entity type.

```json
"condition": {
    "type": "apoli:riding_recursive",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:strider"
        }
    },
    "comparison": ">=",
    "compare_to": 2
}
```

This example will check if the '**actor**' entity is currently riding a Strider directly or an entity that has Striders as its passengers.
