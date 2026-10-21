---
title: "Modify Harvest (Power Type)"
description: "Changes whether a player can harvest a block, meaning whether it drops anything."
navigation_title: "Modify Harvest"
---

Changes whether a player can harvest a block, meaning whether breaking it gives its drops.

Type ID: `apoli:modify_harvest`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, only blocks that pass this condition are affected. |
| `allow` | [Boolean](/docs/datapack/data-types/boolean) | _required_ | Whether the player can harvest the block. `true` gives drops with any tool, and `false` denies them even with the right one. |
| `stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | Rolls the block's loot table as if the player were holding this item, like the tool argument of `/loot … mine <pos> <tool>`. The player's real tool still takes the durability damage and still decides how fast the block breaks. Only the drops are worked out from `stack`. |

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

This lets players harvest diamond blocks with any tool, or none.

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

This lets the player harvest blocks that normally need a diamond tool, and rolls their drops as if a netherite pickaxe had been used. That matters when a mod's loot table checks the tool itself instead of the harvest level. [`apoli:modify_enchantment_level`](/docs/datapack/powers/modify_enchantment_level) can add Fortune or Silk Touch to the roll, but it can't make the tool count as a pickaxe.

> [!NOTE]
> `allow` decides whether the block drops anything at all, and `stack` only decides what the drops are worked out from. A power with `allow: false` denies the drops whatever `stack` says.
