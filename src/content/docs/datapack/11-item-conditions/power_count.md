---
title: "Power Count (Item Condition Type)"
description: "Compares how many powers are embedded in the item with a number."
navigation_title: "Power Count"
---

Compares how many powers are embedded in the item with a number.

Type ID: `apoli:power_count`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slot` | Equipment Slot | _optional_ | Only counts the powers assigned to this equipment slot: `"head"`, `"chest"`, `"legs"`, `"feet"`, `"mainhand"` or `"offhand"`. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the number of powers is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the count is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:power_count",
    "comparison": ">",
    "compare_to": 0
}
```

This checks whether the item has any powers embedded in it.

```json
"item_condition": {
    "type": "apoli:power_count",
    "slot": "mainhand",
    "comparison": "<",
    "compare_to": 10
}
```

This checks whether the item has fewer than 10 powers assigned to the main hand.
