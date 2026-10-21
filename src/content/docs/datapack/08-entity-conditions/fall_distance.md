---
title: "Fall Distance (Entity Condition Type)"
description: "Compares how many blocks the entity has fallen with a number."
navigation_title: "Fall Distance"
---

Compares how many blocks the entity has fallen with a number.

Type ID: `apoli:fall_distance`

> [!NOTE]
> The fall distance reads as `0` while the entity has the Slow Falling status effect.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the fall distance is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the fall distance is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:fall_distance",
    "comparison": ">=",
    "compare_to": 4
}
```

This checks whether the entity has fallen 4 blocks or more.
