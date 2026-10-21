---
title: "Can See (Bi-Entity Condition Type)"
description: "Checks whether nothing blocks the straight line from the actor's eyes to the target's eyes."
navigation_title: "Can See"
---

Checks whether nothing blocks the straight line from the actor's eyes to the target's eyes.

Type ID: `apoli:can_see`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `shape_type` | [Shape Type](/docs/datapack/data-types/shape-type) | `"visual"` | Which block shape the line collides with. |
| `fluid_handling` | [Fluid Handling](/docs/datapack/data-types/fluid-handling) | `"none"` | How the line treats fluids. |

## Examples

```json
"bientity_condition": {
    "type": "apoli:can_see"
}
```

This checks whether the line from the actor's eyes to the target's eyes is clear. If either of them is behind a source or flowing fluid, submerged in any fluid, or behind a block that isn't see-through (glass is), the condition is false.
