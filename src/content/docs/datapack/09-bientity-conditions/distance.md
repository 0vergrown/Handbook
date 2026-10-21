---
title: "Distance (Bi-Entity Condition Type)"
description: "Compares the distance between the actor and the target with a number."
navigation_title: "Distance"
---

Compares the distance between the actor and the target, in blocks, with a number.

Type ID: `apoli:distance`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the distance is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the distance is compared with. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:distance",
    "comparison": "<=",
    "compare_to": 30
}
```

This checks whether the target is within 30 blocks of the actor.
