---
title: "Connected Blocks (Block Action Type)"
description: "Runs a block action on every block connected to this one, such as the rest of a tree trunk or an ore vein."
navigation_title: "Connected Blocks"
---

Runs a block action on every block connected to this one. The search starts at this block and spreads to the neighbouring blocks that belong to the group, then to their neighbours, until it runs out of blocks or reaches `limit`. The starting block itself is not part of the group.

Type ID: `apoli:connected_blocks`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _required_ | The action to run on each block in the group, nearest blocks first. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Which blocks belong to the group. Without it, only blocks of the same block as the starting one do, so an oak log connects to oak logs and iron ore to iron ore. |
| `diagonal` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether blocks that only touch at an edge or a corner count as connected. With `false`, only the six blocks that share a face do. |
| `downward` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the search can spread to blocks lower than the one it came from. With `false` it only spreads sideways and up. |
| `limit` | [Integer](/docs/datapack/data-types/integer) | `64` | The most blocks the group can hold, from `1` to `1024`. |
| `neighbor_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the action only runs when at least one block next to the group matches this condition. If the group reaches `limit` before such a block turns up, nothing happens. |
| `actor_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, this is checked on the entity behind the action before each block, and the action stops the first time it fails. With it set, the action does nothing when no entity is behind it. |

Inside `block_action`, the [expression](/docs/datapack/data-types/expression) variable `count` is the number of blocks in the group and `index` is the position of the current block in it, starting at `0`.

> [!NOTE]
> The block conditions see the world as it is when the action starts, and `block_action` sees each block as it is when its turn comes. The search never loads a chunk: blocks in chunks that aren't loaded are treated as not connected.

## Examples

```json
{
    "type": "apoli:action_on_block_break",
    "condition": {
        "type": "apoli:equipped_item",
        "equipment_slot": "mainhand",
        "item_condition": {
            "type": "apoli:ingredient",
            "ingredient": {
                "tag": "minecraft:axes"
            }
        }
    },
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:logs"
    },
    "only_when_harvested": false,
    "block_action": {
        "type": "apoli:connected_blocks",
        "downward": false,
        "limit": 256,
        "neighbor_condition": {
            "type": "apoli:all_of",
            "conditions": [
                {
                    "type": "apoli:in_tag",
                    "tag": "minecraft:leaves"
                },
                {
                    "type": "apoli:block_state",
                    "property": "persistent",
                    "value": false
                }
            ]
        },
        "actor_condition": {
            "type": "apoli:equipped_item",
            "equipment_slot": "mainhand",
            "item_condition": {
                "type": "apoli:ingredient",
                "ingredient": {
                    "tag": "minecraft:axes"
                }
            }
        },
        "block_action": {
            "type": "apoli:break_block",
            "mine": true
        }
    }
}
```

Chopping a log with an axe also chops every log of the same kind above it and beside it. The rest of the tree only falls when part of it touches natural leaves, so a log cabin stays standing. Each log is mined with the axe, costing a point of durability, and the felling stops when the axe breaks.

```json
"block_action": {
    "type": "apoli:connected_blocks",
    "diagonal": false,
    "limit": 16,
    "block_action": {
        "type": "apoli:break_block",
        "mine": true
    }
}
```

Run from an [apoli:action_on_block_break](/docs/datapack/powers/action_on_block_break) whose `block_condition` matches ores, this mines up to 16 more blocks of the same ore that share a face with the vein.
