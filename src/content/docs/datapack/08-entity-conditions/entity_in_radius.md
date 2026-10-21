---
title: "Entity In Radius (Entity Condition Type)"
description: "Counts the entities around the entity and compares the count with a number."
navigation_title: "Entity In Radius"
---

Counts the entities within an area around the entity and compares the count with a number. A bi-entity condition can filter which entities count.

Type ID: `apoli:entity_in_radius`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Filters which entities count, with the entity the condition runs on as the actor and each nearby entity as the target. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `cube` | The shape of the area: `cube`, `sphere`, `star`, `cone`, or a hollow one (`cube_hollow`, `sphere_hollow`, `star_hollow`, `cone_hollow`). |
| `hollow_thickness` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | How thick a hollow `shape` is, in blocks. A `sphere_hollow` counts entities between `radius - hollow_thickness` and `radius` away. Ignored by the solid shapes. |
| `radius` | [Float](/docs/datapack/data-types/float) | _required_ | The radius of the area, in blocks. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `>=` | How the count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | The number the count is compared with. |

## Notes

- Positions are compared at foot level, where the entity's position is the bottom of its bounding box.
- The entity the condition runs on is never counted.
- Without a `bientity_condition`, every entity in range counts, including items, projectiles and mobs. With one, only living entities are tested and counted.
- The scan stops as soon as the result is known, so a large `radius` with a `>=` comparison stays cheap.

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

This checks whether there are at least 3 other players within 10 blocks.

## An expression threshold

`compare_to` accepts a full [expression](/docs/datapack/data-types/expression), so the threshold doesn't have to be a fixed number. It is evaluated against the entity holding the power each time the condition is tested:

```json
"condition": {
    "type": "apoli:entity_in_radius",
    "radius": 8,
    "comparison": ">=",
    "compare_to": "example:crowd_threshold"
}
```
