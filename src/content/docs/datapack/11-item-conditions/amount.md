---
title: "Amount (Item Condition Type)"
description: "Compares the number of items in the stack with a number."
navigation_title: "Amount"
---

Compares the number of items in the stack with a number.

Type ID: `apoli:amount`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the stack size is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the stack size is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:amount",
    "comparison": ">=",
    "compare_to": 10
}
```

This checks whether the stack holds 10 or more items.
