---
title: "Riding Root (Entity Condition Type)"
description: "Checks whether the entity is riding something, looking at the entity at the bottom of the stack."
navigation_title: "Riding Root"
---

Checks whether the entity is riding another entity, directly or through other riders, and tests the entity at the bottom of the stack.

Type ID: `apoli:riding_root`

> [!NOTE]
> For `bientity_condition`, the actor is the passenger, which is the entity the condition is checked on, and the target is the entity at the start of the riding chain, which is ridden indirectly.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | The condition only passes if the pair of entities also passes this. |

## Examples

```json
"condition": {
    "type": "apoli:riding_root"
}
```

This checks whether the entity is riding anything.

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

This checks whether the entity is riding a pig, either directly or by riding one of the pig's passengers.
