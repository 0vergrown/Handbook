---
title: "apoli:amount"
description: "Checks whether the damage is of a specified amount."
---

Checks whether the damage is of a specified amount.

Type ID: `apoli:amount`

## Fields

| Field        | Type                  | Default | Description                                                                    |
|--------------|-----------------------|---------|--------------------------------------------------------------------------------|
| `comparison` | Comparison (Data Type |         | Determines how the amount of damage should be compared to the specified value. |
| `compare_to` | [Float](/docs/datapack/data-types/float)     |         | The value at which the amount of damage will be compared to.                   |

## Examples

```json
"damage_condition": {
    "type": "apoli:amount",
    "comparison": "==",
    "compare_to": 4
}
```
This example will check if the damage dealt/taken is equal to 2 hearts.
