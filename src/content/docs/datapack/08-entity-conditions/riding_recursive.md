---
title: "Riding Recursive (Entity Condition Type)"
description: "Counts the entities below this one in its riding stack and compares the count with a number."
navigation_title: "Riding Recursive"
---

Checks whether the entity is riding another entity, and counts every entity below it in the stack: the one it rides directly and anything that one rides in turn.

Type ID: `apoli:riding_recursive`

> [!NOTE]
> For `bientity_condition`, the actor is the passenger, which is the entity the condition is checked on, and each entity below it in the stack is a target.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only entities that pass this condition with the passenger are counted. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the number of entities being ridden is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number the count is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:riding_recursive",
    "comparison": ">=",
    "compare_to": 2
}
```

This checks whether the entity is riding something that is itself riding something, whatever their types.

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

This checks whether at least two of the entities below the passenger in its stack are striders.
