---
title: "Harvest Level (Item Condition Type)"
description: "Compares the harvest level of the item's material with a number."
navigation_title: "Harvest Level"
---

Compares the harvest level of the item's material with a number. Items without a material have a harvest level of 0.

Type ID: `apoli:harvest_level`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the harvest level is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the harvest level is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:harvest_level",
    "comparison": ">",
    "compare_to": 1
}
```

This checks whether the item has a harvest level above 1, which is the value for stone tools.
