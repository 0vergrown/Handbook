---
title: "Riding (Entity Condition Type)"
description: "Checks whether the entity is riding another entity directly, optionally one that passes a condition."
navigation_title: "Riding"
---

Checks whether the entity is directly riding another entity.

Type ID: `apoli:riding`

> [!NOTE]
> For `bientity_condition`, the actor is the passenger, which is the entity the condition is checked on, and the target is the entity being ridden.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The condition only passes if the pair of entities also passes this. |

## Examples

```json
"condition": {
    "type": "apoli:riding"
}
```

This checks whether the entity is riding anything.

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

This checks whether the entity is riding a minecart.
