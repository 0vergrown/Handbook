---
title: "Keep Inventory (Power Type)"
description: "Makes certain items persist in the entity's inventory."
navigation_title: "Keep Inventory"
---

Makes certain items persist in the entity's inventory.

Type ID: `apoli:keep_inventory`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`item_condition` | Item Condition Type | _optional_ | If specified, only make the items that fulfill the specified item condition type persist in the entity's inventory.
`slots` | Array of Integers | _optional_ | If specified, only make the items that are in the listed inventory slots persist in the entity's inventory. Unset means the hotbar and main inventory (`0`-`35`) plus the four armor slots (`100`-`103`).

Slot numbers are the vanilla ones the `/item replace entity` command uses: `0`-`8` is the hotbar, `9`-`35` the rest of the inventory, `98` the offhand, `99` the main hand, `100`-`103` boots/leggings/chestplate/helmet, and `200`+ the ender chest. The offhand is **not** kept unless you list `98`.

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

This example will make items in the hotbar slots persist.

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

This example keeps every sword wherever it sits in the inventory, and drops everything else.

> The kept stacks are pulled out of the inventory just before the rest of it drops and put straight back afterwards, so they survive the death and are already in place on the respawned player. Curse of Vanishing still destroys an item first, and the `keepInventory` gamerule already keeps everything, which makes this power inert.
