---
title: "Prevent Accessory Equip (Power Type)"
description: "Stops the entity from equipping accessories."
navigation_title: "Prevent Accessory Equip"
aliases: ["prevent_trinket_equip"]
---

Stops the holder from putting accessories on. Anything already equipped stays where it is, and [`apoli:prevent_accessory_unequip`](/docs/compat/accessories/prevent_accessory_unequip) covers the other half.

Type ID: `apoli:prevent_accessory_equip` (alias `apoli:prevent_trinket_equip`)

> [!NOTE]
> This type only exists when an accessory mod is installed: [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. A pack that uses it must depend on one.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `slots` | [Array](/docs/datapack/data-types/array) of [slots](/docs/compat/accessories/overview#slots) | `[]` | The accessory slots to block. A string is `slot`, `group/slot` or `group/slot/index`, such as `"ring"`, `"hand/ring"` or `"hand/ring/0"`. An empty list means every slot. |
| `allow_in_creative` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Lets players in creative mode ignore the restriction, so building and testing still work. |
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | Only blocks items that pass it. |

## Examples

```json
{
  "type": "apoli:prevent_accessory_equip",
  "slots": ["hand/ring"]
}
```

This blocks rings entirely.

```json
{
  "type": "apoli:prevent_accessory_equip",
  "allow_in_creative": false,
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": { "tag": "minecraft:iron_tool_materials" }
  }
}
```

This origin can't wear anything matching the `minecraft:iron_tool_materials` tag in any slot, in creative mode too.
