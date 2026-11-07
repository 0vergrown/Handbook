---
title: "Equipped Item (Entity Condition Type)"
description: "Checks whether the item in one of the entity's equipment slots, or in its accessory slots, passes an item condition."
navigation_title: "Equipped Item"
---

Checks whether the item in one of the entity's equipment slots passes an item condition. It can also look in accessory slots from [Trinkets, Accessories or Curios](/docs/compat/accessories/overview).

Type ID: `apoli:equipped_item`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `equipment_slot` | [String](/docs/datapack/data-types/string) | _optional_ | Which equipment slot to check: `"mainhand"`, `"offhand"`, `"head"`, `"chest"`, `"legs"` or `"feet"`. |
| `accessory_slot` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | Accessory slots to check, such as `"charm"` or `"hand/ring"`. `"*"` means every accessory slot. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _required_ | The condition the item must pass. |

At least one of `equipment_slot` and `accessory_slot` is required. With both, the condition passes when either one has a matching item.

> [!NOTE]
> `accessory_slot` only tests accessory slots that hold an item, so an `item_condition` like `apoli:empty` never passes through it. Without an accessory mod installed, `accessory_slot` finds nothing, and the power still loads.

## Examples

```json
"condition": {
    "type": "apoli:equipped_item",
    "equipment_slot": "mainhand",
    "item_condition": {
        "type": "apoli:harvest_level",
        "comparison": ">=",
        "compare_to": 2
    }
}
```

This checks whether the item in the entity's main hand has a harvest level of 2 or more.

```json
"condition": {
  "type": "apoli:equipped_item",
  "accessory_slot": "*",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
      "item": "example:moon_charm"
    }
  }
}
```

This passes while the entity wears `example:moon_charm` in any accessory slot.

```json
"condition": {
  "type": "apoli:equipped_item",
  "equipment_slot": "head",
  "accessory_slot": "head/face",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
      "item": "example:goggles"
    }
  }
}
```

This passes when the goggles are worn either as a helmet or in the Trinkets `face` slot.
