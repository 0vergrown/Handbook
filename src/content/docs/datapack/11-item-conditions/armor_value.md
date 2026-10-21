---
title: "Armor Value (Item Condition Type)"
description: "Compares the item's armor value with a number."
navigation_title: "Armor Value"
---

Compares the item's armor value with a number. Items that aren't armor have an armor value of 0.

Type ID: `apoli:armor_value`

> [!TIP]
> The Minecraft Wiki lists the armor value of each piece: [Helmet](https://minecraft.wiki/w/Helmet#Defense_points), [Chestplate](https://minecraft.wiki/w/Chestplate#Defense_points), [Leggings](https://minecraft.wiki/w/Leggings#Defense_points) and [Boots](https://minecraft.wiki/w/Boots#Defense_points).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the armor value is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the armor value is compared with. |

## Examples

```json
"item_condition": {
    "type": "apoli:armor_value",
    "comparison": ">",
    "compare_to": 3
}
```

This checks whether the item, here a chestplate, has an armor value above 3, which is the value of a leather chestplate.
