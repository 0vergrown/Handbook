---
title: "Block Collision (Entity Condition Type)"
description: "Checks whether the entity's bounding box, optionally moved, collides with a block."
navigation_title: "Block Collision"
---

Checks whether the entity's bounding box collides with a block, optionally after moving the box by a fraction of its own size.

Type ID: `apoli:block_collision`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The block the box collides with must pass this condition. |
| `offset_x` | [Float](/docs/datapack/data-types/float) | `0` | How far to move the box on the X axis, as a multiple of its width: 0 is no offset, 1 is one full width and 2 is twice the width. |
| `offset_y` | [Float](/docs/datapack/data-types/float) | `0` | How far to move the box on the Y axis, as a multiple of its height. |
| `offset_z` | [Float](/docs/datapack/data-types/float) | `0` | How far to move the box on the Z axis, as a multiple of its depth. |

## Examples

```json
"condition": {
    "type": "apoli:block_collision",
    "offset_x": 0.1,
    "offset_y": 0,
    "offset_z": 0.1
}
```

This checks whether the entity is touching a block on its positive X or Z side.

```json
"condition": {
    "type": "apoli:or",
    "conditions": [
        {
            "type": "apoli:block_collision",
            "block_condition": {
                "type": "apoli:block",
                "block": "minecraft:slime_block"
            },
            "offset_x": 0.1,
            "offset_z": 0.1
        },
        {
            "type": "apoli:block_collision",
            "block_condition": {
                "type": "apoli:block",
                "block": "minecraft:slime_block"
            },
            "offset_x": -0.1,
            "offset_z": -0.1
        }
    ]
}
```

This checks whether the entity is touching a slime block on any of its X or Z sides.
