---
title: "Connected Blocks (Data Type)"
description: "Describes a group of blocks connected to one block, such as a tree trunk or an ore vein."
navigation_title: "Connected Blocks"
---

Describes a group of blocks connected to one block. The group is found the same way as in the [apoli:connected_blocks](/docs/datapack/block-actions/connected_blocks) block action: starting at the block, the search spreads to the neighbouring blocks that belong to the group, then to their neighbours. The starting block is not part of the group.

[apoli:modify_break_speed](/docs/datapack/powers/modify_break_speed) uses it to make breaking a block depend on how many blocks are attached to it.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Which blocks belong to the group. Without it, only blocks of the same block as the starting one do. |
| `diagonal` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether blocks that only touch at an edge or a corner count as connected. With `false`, only the six blocks that share a face do. |
| `downward` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the search can spread to blocks lower than the one it came from. |
| `limit` | [Integer](/docs/datapack/data-types/integer) | `64` | The most blocks the group can hold, from `1` to `1024`. |
| `neighbor_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the group only counts when at least one block next to it matches this condition. Otherwise it is empty. It is also empty when it reaches `limit` before such a block turns up. |

## Examples

```json
"connected_blocks": {
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
    }
}
```

This is the rest of a tree above a log: logs of the same kind going sideways and up, up to 256 of them, as long as they touch natural leaves.
