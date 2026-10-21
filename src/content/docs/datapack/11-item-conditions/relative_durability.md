---
title: "Relative Durability (Item Condition Type)"
description: "Compares the item's durability, as a fraction of its maximum, with a number."
navigation_title: "Relative Durability"
---

Compares the item's remaining durability, as a fraction of its maximum durability, with a number.

Type ID: `apoli:relative_durability`

> [!NOTE]
> The fraction is `currentDurability / maxDurability`, so `1` is a brand new item.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the relative durability is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the relative durability is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:relative_durability",
    "comparison": ">=",
    "compare_to": 0.9
}
```

This checks whether the item has 90% of its durability or more left.
