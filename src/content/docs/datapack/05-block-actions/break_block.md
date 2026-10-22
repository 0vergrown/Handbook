---
title: "Break Block (Block Action Type)"
description: "Breaks the block at the position, optionally dropping its loot."
navigation_title: "Break Block"
---

Breaks the block at the position the way `/setblock … destroy` does. The block is replaced by air (or by its fluid, if it was waterlogged), the break particles and sound play, and the loot table is rolled.

Type ID: `apoli:break_block`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `drop_loot` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to roll the block's loot table and drop the result, experience included. `false` removes the block and drops nothing. |
| `stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | The tool given to the loot table, exactly like the tool argument of `/loot … mine <pos> <tool>`. Silk Touch and Fortune on it apply, and blocks that need a specific tool to drop anything drop for it. Without a `stack`, the loot is rolled with an empty hand. |
| `break_particles` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to play the block breaking particles and sound. |
| `as_player` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Drops the loot through the block's player mining hook instead of its plain loot table, crediting the player the action came from. A beehive or bee nest releases the bees inside it, the blocks mined statistic is awarded, the mining advancements fire, and a little hunger is spent. It needs `drop_loot` to be `true`, and has no effect when the entity behind the action isn't a player. |
| `mine` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the player behind the action mines the block exactly as if they had broken it by hand. Their held tool takes durability damage and its enchantments apply to the drops, ores drop experience, and the break is refused where the player couldn't break blocks, such as inside spawn protection, in adventure mode or in an area a claim mod protects. The other fields are ignored. When no player is behind the action, the block breaks as usual. |

## Examples

```json
"block_action": {
    "type": "apoli:break_block"
}
```

This breaks the block bare-handed, so stone crumbles to nothing and dirt drops dirt.

```json
"block_action": {
    "type": "apoli:break_block",
    "stack": {
        "item": "minecraft:netherite_pickaxe",
        "components": {
            "minecraft:enchantments": {
                "levels": {"minecraft:silk_touch": 1}
            }
        }
    }
}
```

This breaks the block as though it were mined with a Silk Touch netherite pickaxe, so ores and glass drop themselves.

```json
{
    "type": "apoli:action_on_block_break",
    "block_action": {
        "type": "apoli:offset",
        "y": -1,
        "action": {
            "type": "apoli:break_block",
            "drop_loot": false
        }
    }
}
```

Breaking a block also removes the one beneath it, without dropping anything.

```json
"block_action": {
    "type": "apoli:break_block",
    "as_player": true
}
```

This breaks the block as though the player had mined it, so a beehive or bee nest releases the bees inside it.

```json
"block_action": {
    "type": "apoli:break_block",
    "mine": true
}
```

The player mines the block with whatever they are holding, so a pickaxe loses durability and Fortune adds to the ore it drops.

> [!NOTE]
> By default this isn't a player mining the block. No tool durability is spent, no block break statistic is awarded, and no [`apoli:action_on_block_break`](/docs/datapack/powers/action_on_block_break) power fires for it, so nesting it inside its own `action_on_block_break` can't loop. `as_player` adds the block's own drop hook and the mining statistics, but still spends no durability and still doesn't fire `apoli:action_on_block_break`.
>
> `mine` is a real break by the player, so it does fire their `apoli:action_on_block_break` powers. The power whose action is running is the exception, which lets a power mine more blocks from its own action without looping.

> [!NOTE]
> `as_player` needs a player to credit the break to. The action gets one when it is reached from an entity, for example through [`apoli:block_action_at`](/docs/datapack/entity-actions/block_action_at), the `block_action` of an [`apoli:raycast`](/docs/datapack/entity-actions/raycast), or an [`apoli:area_of_effect`](/docs/datapack/block-actions/area_of_effect) or [`apoli:offset`](/docs/datapack/block-actions/offset) nested inside one of those. A block action with no entity behind it, or one run by a mob, falls back to the ordinary break.
