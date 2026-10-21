---
title: "Amount (Damage Condition Type)"
description: "Compares the amount of damage with a number."
navigation_title: "Amount"
---

Compares the amount of damage with a number.

Type ID: `apoli:amount`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the damage is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the damage is compared with. |

## Examples

```json
"damage_condition": {
    "type": "apoli:amount",
    "comparison": "==",
    "compare_to": 4
}
```

This checks whether the damage dealt or taken is exactly 2 hearts.
