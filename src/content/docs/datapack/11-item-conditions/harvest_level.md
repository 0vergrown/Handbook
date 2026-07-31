---
title: "Harvest Level (Item Condition Type)"
description: "Checks whether the material of the item has a certain harvest level value."
navigation_title: "Harvest Level"
---

Checks whether the material of the item has a certain harvest level value. Items without a material are considered to have a harvest level of 0.

Type ID: `apoli:harvest_level`

## Fields

| Field        | Type                   | Default | Description                                                                                                     |
|--------------|------------------------|---------|-----------------------------------------------------------------------------------------------------------------|
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) |         | Determines how the harvest level of the material from the item stack should be compared to the specified value. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer)    |         | The value at which the harvest level of the material from the item stack will be compared to.                   |

## Examples

```json
"item_condition": {
    "type": "apoli:harvest_level",
    "comparison": ">",
    "compare_to": 1
}
```

This example checks if the item has a harvest level higher than 1, which is the value for stone tools.
