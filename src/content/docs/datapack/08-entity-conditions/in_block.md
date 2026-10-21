---
title: "In Block (Entity Condition Type)"
description: "Checks whether a block that passes a condition overlaps the entity's feet."
navigation_title: "In Block"
---

Checks whether a block that passes a block condition overlaps the entity's feet.

Type ID: `apoli:in_block`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The condition the block at the entity's feet must pass. |

## Examples

```json
"condition": {
    "type": "apoli:in_block",
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:grass"
    }
}
```

This checks whether grass (the plant) overlaps the entity's feet.

```json
"condition": {
    "type": "apoli:in_block",
    "block_condition": {
        "type": "apoli:and",
        "conditions": [
            {
                "type": "apoli:block",
                "block": "minecraft:sand"
            },
            {
                "type": "apoli:offset",
                "condition": {
                    "type": "apoli:block",
                    "block": "minecraft:sand"
                },
                "y": 1
            }
        ]
    }
}
```

This checks whether there is sand at the entity's feet and at its eyes, which means it is buried in sand.
