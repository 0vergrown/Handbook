---
title: "apoli:riding"
description: "Checks whether the 'actor' entity is directly riding the 'target' entity."
---

Checks whether the '**actor**' entity is directly riding the '**target**' entity.

Type ID: `apoli:riding`

> In the context for this entity condition type, the '**actor**' entity is the passenger and the entity that invoked the condition while the '**target**' entity is the entity that is being ridden.

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, this condition type will only evaluate to true if this condition is fulfilled by either or both the '**actor**' and '**target**' entities.


## Examples

```json
"condition": {
    "type": "apoli:riding"
}
```

This example will check if the '**actor**' entity is riding an entity.

```json
"condition": {
    "type": "apoli:riding",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:minecart"
        }
    }
}
```

This example will check if the '**actor**' entity is currently riding a minecart ('**target**' entity).

