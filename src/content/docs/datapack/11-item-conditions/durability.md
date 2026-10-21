---
title: "Durability (Item Condition Type)"
description: "Compares the item's remaining durability with a number."
navigation_title: "Durability"
---

Compares the item's remaining durability with a number.

Type ID: `apoli:durability`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the durability is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the durability is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:durability",
    "comparison": "<=",
    "compare_to": 100
}
```

This checks whether the item has 100 durability or less left.
