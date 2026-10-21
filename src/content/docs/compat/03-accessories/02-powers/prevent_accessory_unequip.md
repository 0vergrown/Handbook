---
title: "Prevent Accessory Unequip (Power Type)"
description: "Stops the entity from taking accessories off."
navigation_title: "Prevent Accessory Unequip"
aliases: ["prevent_trinket_unequip"]
---

Stops the holder from removing accessories once they are on. It pairs naturally with a cursed item the player can't get rid of.

Type ID: `apoli:prevent_accessory_unequip` (alias `apoli:prevent_trinket_unequip`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to lock. A string is `slot`, `group/slot` or `group/slot/index`, such as `"ring"`, `"hand/ring"` or `"hand/ring/0"`. An empty list means every slot. |
| `allow_in_creative` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Lets players in creative mode ignore the restriction. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only blocks items that pass it. |

## Example

```json
{
  "type": "apoli:prevent_accessory_unequip",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "item": "minecraft:echo_shard" }
  },
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:curse_charge",
    "comparison": ">",
    "compare_to": 0
  }
}
```

This cursed amulet, an echo shard, can't be taken off while the `mypack:curse_charge` resource is above 0.
