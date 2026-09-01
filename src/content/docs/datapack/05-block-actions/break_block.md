---
title: "Break Block (Block Action Type)"
description: "Breaks the block at the targeted position, optionally processing its loot table."
navigation_title: "Break Block"
---

Breaks the block at the targeted position, the way `/setblock … destroy` does: the block is replaced by air (or by its fluid, if it was waterlogged), the break particles and sound play, and the loot table is processed.

Type ID: `apoli:break_block`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`drop_loot` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to roll the block's loot table and drop the result, experience included. `false` removes the block and drops nothing.
`stack` | [Item Stack](/docs/datapack/data-types/item-stack) | _optional_ | The tool the loot table is given, exactly like the tool argument of `/loot … mine <pos> <tool>`. Silk Touch and Fortune on it apply, and blocks that need a specific tool to drop anything will drop for it. With no `stack` the loot is rolled with an empty hand.
`break_particles` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether to play the block-breaking particles and sound.
`as_player` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Drops the loot through the block's player-mining hook instead of its plain loot table, crediting the player the action came from. A beehive or bee nest releases the bees inside it, the block-mined statistic is awarded, the mining advancements fire, and a little hunger is spent. Needs `drop_loot` to be `true`, and has no effect when the entity behind the action is not a player.

## Examples

```json
"block_action": {
    "type": "apoli:break_block"
}
```

Breaks the block bare-handed — stone crumbles to nothing, dirt drops dirt.

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

Breaks the block as though mined with a Silk Touch netherite pickaxe, so ores and glass drop themselves.

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

Breaking a block silently removes the one beneath it as well.

```json
"block_action": {
    "type": "apoli:break_block",
    "as_player": true
}
```

Breaks the block as though the player had mined it, so a beehive or bee nest releases the bees inside it.

> By default this is not a player mining the block — no tool durability is spent, no block-break statistic is awarded, and no [`apoli:action_on_block_break`](/docs/datapack/powers/action_on_block_break) power fires for it. Nesting it inside its own `action_on_block_break` therefore cannot loop. `as_player` adds the block's own drop hook and the mining statistics; it still spends no durability and still does not fire `apoli:action_on_block_break`.

> `as_player` needs a player to attribute the break to. The action gets one when it is reached from an entity, for example through [`apoli:block_action_at`](/docs/datapack/entity-actions/block_action_at), a [`apoli:raycast`](/docs/datapack/entity-actions/raycast) `block_action`, or an [`apoli:area_of_effect`](/docs/datapack/block-actions/area_of_effect) / [`apoli:offset`](/docs/datapack/block-actions/offset) nested inside one of those. A block action with no entity behind it, or one run by a mob, falls back to the ordinary break.
