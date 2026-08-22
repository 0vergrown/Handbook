---
title: "Prevent Accessory Unequip (Power Type)"
description: Stops the entity taking accessories off.
navigation_title: "Prevent Accessory Unequip"
aliases: ["prevent_trinket_unequip"]
---

Stops the holder removing accessories once they are on. The natural pairing is a cursed item the player cannot get rid of.

Type ID: `apoli:prevent_accessory_unequip` (alias `apoli:prevent_trinket_unequip`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`slots` | array of [String](/docs/datapack/data-types/string) or objects | `[]` | Which accessory slots to look at. A string is `slot`, `group/slot`, or `group/slot/index` — for example `"ring"`, `"hand/ring"`, `"hand/ring/0"`. An empty list means every slot.
`allow_in_creative` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Let creative-mode players ignore the restriction.
`item_condition` | [Item Condition](/docs/datapack/item-conditions) | _optional_ | Only block items matching this.

## Example

A cursed amulet you cannot take off while it still has charge:

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

> Needs an accessory mod — [Trinkets](https://modrinth.com/mod/trinkets), [Accessories](https://modrinth.com/mod/accessories) or Curios, depending on your loader. These types do not exist without one, so a pack using them must depend on it.
