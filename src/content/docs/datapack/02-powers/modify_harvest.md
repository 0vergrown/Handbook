---
title: "Modify Harvest (Power Type)"
description: "Modifies whether a player is able to harvest a block or not (= receive the block drops)."
navigation_title: "Modify Harvest"
---

Modifies whether a player is able to harvest a block or not (= receive the block drops).

Type ID: `apoli:modify_harvest`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | _optional_ | If specified, only blocks that fulfill this condition are affected.
`allow` | [Boolean](/docs/datapack/data-types/boolean) | **required** | Whether the player can harvest the block. `true` grants drops regardless of the tool, `false` denies them even with the right one.
`stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | Roll the block's loot table as if the player had been holding this item, exactly like the tool argument of `/loot … mine <pos> <tool>`. The player's real tool still takes the durability damage and still decides how fast the block breaks; only the drops are computed from `stack`.

## Examples

```json
{
    "type": "apoli:modify_harvest",
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:diamond_block"
    },
    "allow": true
}
```

This example will allow players to harvest a Diamond Block regardless of using the proper tool or not.

```json
{
    "type": "apoli:modify_harvest",
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:needs_diamond_tool"
    },
    "allow": true,
    "stack": {
        "item": "minecraft:netherite_pickaxe"
    }
}
```

This example lets the player harvest blocks that normally need a diamond tool, and rolls their drops as though a netherite pickaxe had been used. That matters when a mod's loot table tests the tool itself rather than the harvest level — [`apoli:modify_enchantment_level`](/docs/datapack/powers/modify_enchantment_level) can add Fortune or Silk Touch to the roll, but it cannot make the tool *be* a pickaxe.

> Whether the block drops anything at all is `allow`'s job; `stack` only decides what the drops are computed from. A power with `allow: false` denies the drops no matter what `stack` says.
