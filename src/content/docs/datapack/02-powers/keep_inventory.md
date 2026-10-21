---
title: "Keep Inventory (Power Type)"
description: "Keeps chosen items in the entity's inventory when it dies."
navigation_title: "Keep Inventory"
---

Keeps chosen items in the entity's inventory when it dies.

Type ID: `apoli:keep_inventory`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `item_condition` | [Item Condition Type](/docs/datapack/item-conditions) | _optional_ | If set, only items that pass this condition are kept. |
| `slots` | [Array](/docs/datapack/data-types/array) of [Integers](/docs/datapack/data-types/integer) | _optional_ | If set, only items in these inventory slots are kept. Without it, the hotbar and main inventory (`0` to `35`) and the four armor slots (`100` to `103`) are kept. |

Slot numbers are the vanilla ones the `/item replace entity` command uses: `0` to `8` is the hotbar, `9` to `35` is the rest of the inventory, `98` is the off hand, `99` is the main hand, `100` to `103` are the boots, leggings, chestplate and helmet, and `200` and up are the ender chest. The off hand is not kept unless you list `98`.

## Examples

```json
{
    "type": "apoli:keep_inventory",
    "slots": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
    ]
}
```

This keeps the items in the hotbar.

```json
{
  "type": "apoli:keep_inventory",
  "item_condition": {
    "type": "apoli:ingredient",
    "ingredient": {
      "tag": "minecraft:swords"
    }
  }
}
```

This keeps every sword wherever it sits in the inventory, and drops everything else.

The kept stacks are taken out of the inventory just before the rest of it drops and put straight back afterwards, so they survive the death and are already in place on the respawned player. Curse of Vanishing still destroys an item first. The `keepInventory` gamerule already keeps everything, so with it on this power does nothing.

> [!NOTE]
> Grave mods respect the power too. Kept items stay with the player instead of going into the grave with [You're in Grave Danger](/docs/compat/youre-in-grave-danger/overview), [Gravestones](/docs/compat/gravestones/overview) and the [GraveStone Mod](/docs/compat/gravestone-mod/overview).
