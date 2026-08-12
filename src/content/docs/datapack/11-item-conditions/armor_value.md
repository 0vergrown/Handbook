---
title: "Armor Value (Item Condition Type)"
description: "Checks whether the item has a certain armor value."
navigation_title: "Armor Value"
---

Checks whether the item has a certain armor value. Non-armor items are considered as having an armor value of 0.

Type ID: `apoli:armor_value`

> You can visit these pages to get the armor values for each armor item piece:
>
> * [Helmet](https://minecraft.wiki/w/Helmet#Defense_points)
> * [Chestplate](https://minecraft.wiki/w/Chestplate#Defense_points)
> * [Leggings](https://minecraft.wiki/w/Leggings#Defense_points)
> * [Boots](https://minecraft.wiki/w/Boots#Defense_points)

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the armor value of the item should be compared to the specified value.
`compare_to` | Integer | | The value at which the armor value of the item will be compared to.

## Examples

```json
"item_condition": {
    "type": "apoli:armor_value",
    "comparison": ">",
    "compare_to": 3
}
```

This example will check if the armor item (in this context, a chestplate) has a higher armor value than 3, which is the armor value for the leather chestplate armor item.
