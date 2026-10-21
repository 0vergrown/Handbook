---
title: "Meat (Item Condition Type)"
description: Passes when the item is meat.
navigation_title: "Meat"
---

Passes when the stack is edible and counts as meat, the same set of foods a wolf accepts.

Type ID: `apoli:meat`

## Fields

This condition has no fields.

## Example

A vegetarian origin that can't bring itself to eat meat:

```json
{
  "type": "apoli:prevent_item_use",
  "item_condition": {
    "type": "apoli:meat"
  }
}
```

Or the reverse, a carnivore that gets nothing out of anything else:

```json
{
  "type": "apoli:modify_food",
  "item_condition": {
    "type": "apoli:meat",
    "inverted": true
  },
  "food_modifier": { "operation": "set_total", "value": 0 },
  "saturation_modifier": { "operation": "set_total", "value": 0 }
}
```

> [!NOTE]
> On 1.21.1 this also matches the `c:foods/meat` convention tag as well as vanilla's meat items, so items from other mods that tag themselves correctly are included.
