---
title: "Riding Root (Entity Condition Type)"
description: "Checks whether the 'actor' entity is indirectly riding the 'target' entity."
navigation_title: "Riding Root"
---

Checks whether the '**actor**' entity is indirectly riding the '**target**' entity.

Type ID: `apoli:riding_root`

> In the context for this entity condition type, the '**actor**' entity is the passenger and the entity that invoked the condition while the '**target**' is the entity that is being indirectly ridden (at the start of the riding chain).


## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, this condition type will only evaluate to true if this condition is fulfilled by either or both the '**actor**' and '**target**' entities.

## Examples

```json
"condition": {
    "type": "apoli:riding_root"
}
```

This example will check if the '**actor**' entity is riding an entity.

```json
"condition": {
    "type": "apoli:riding_root",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:pig"
        }
    }
}
```

This example will check if the '**actor**' entity is riding a pig. This will also check if the '**actor**' entity is riding the passenger(s) of a pig.
