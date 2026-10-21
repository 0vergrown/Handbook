---
title: "Relative Health (Entity Condition Type)"
description: "Compares the entity's health, as a fraction of its maximum, with a number."
navigation_title: "Relative Health"
---

Compares the entity's health, as a fraction of its maximum health, with a number.

Type ID: `apoli:relative_health`

> [!NOTE]
> The fraction is `currentHealth / maxHealth`, so `1` is full health and `0.5` is half.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the relative health is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the relative health is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:relative_health",
    "comparison": "<=",
    "compare_to": 0.5
}
```

This checks whether the entity has half of its max health or less.
