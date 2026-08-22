---
title: "Prevent Accessory Equip (Power Type)"
description: Stops the entity equipping accessories.
navigation_title: "Prevent Accessory Equip"
aliases: ["prevent_trinket_equip"]
---

Stops the holder putting accessories on. Anything already equipped stays where it is — use [`apoli:prevent_accessory_unequip`](/docs/compat/accessories/prevent_accessory_unequip) for the other half.

Type ID: `apoli:prevent_accessory_equip` (alias `apoli:prevent_trinket_equip`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`slots` | array of [String](/docs/datapack/data-types/string) or objects | `[]` | Which accessory slots to look at. A string is `slot`, `group/slot`, or `group/slot/index` — for example `"ring"`, `"hand/ring"`, `"hand/ring/0"`. An empty list means every slot.
`allow_in_creative` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Let creative-mode players ignore the restriction, so building and testing still work.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only block items matching this.

## Examples

No rings at all:

```json
{
  "type": "apoli:prevent_accessory_equip",
  "slots": ["hand/ring"]
}
```

An origin that cannot wear anything made of iron, in any slot, creative included:

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

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
