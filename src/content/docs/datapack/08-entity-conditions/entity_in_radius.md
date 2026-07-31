---
title: "Entity In Radius (Entity Condition Type)"
description: "Counts entities within a specified radius and compares the count against a value."
navigation_title: "Entity In Radius"
---

Counts entities within a specified radius and compares the count against a value. Can filter entities with bi-entity conditions.

Type ID: `apoli:entity_in_radius`

## Fields

| Field                | Type                                                             | Default    | Description                                                                                           |
|----------------------|------------------------------------------------------------------|------------|-------------------------------------------------------------------------------------------------------|
| `bientity_condition` | Bi-entity Condition         | *optional* | Optional condition to filter counted entities (actor = the entity this condition runs on, target = each nearby entity). |
| `shape`              | Shape                             | `cube`     | Determines the shape of the area used for checking entities: `cube`, `sphere`, `star` or `cone`.      |
| `radius`             | Float                             | **required** | Radius/distance for detection, in blocks.                                                           |
| `comparison`         | Comparison                   | `>=`       | How to compare the count.                                                                             |
| `compare_to`         | Integer                         | `1`        | The value to compare the count against.                                                               |

## Notes

- Positions are compared at foot level (entity position = bounding-box `minY`).
- The entity the condition runs on is never counted.
- Without a `bientity_condition`, **all** entities in range count (items, projectiles, mobs...). With one, only living entities are tested and counted.
- The scan stops early as soon as the outcome is decided, so large `radius` values with a `>=` comparison stay cheap.

## Examples

```json
{
    "type": "apoli:entity_in_radius",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:player"
        }
    },
    "shape": "sphere",
    "radius": 10.0,
    "comparison": ">=",
    "compare_to": 3
}
```
This example checks if there are at least 3 other players within 10 blocks.
