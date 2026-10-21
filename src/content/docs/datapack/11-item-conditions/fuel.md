---
title: "Fuel (Item Condition Type)"
description: "Compares how long the item burns as furnace fuel with a number."
navigation_title: "Fuel"
---

Checks whether the item works as fuel, by comparing how many ticks it burns for with a number.

Type ID: `apoli:fuel`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">"` | How the burn time, in ticks, is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `0` | The number the burn time is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:fuel",
    "comparison": ">=",
    "compare_to": 10
}
```

This checks whether the item burns as fuel for 10 ticks or more.
