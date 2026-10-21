---
title: "Block (Block Condition Type)"
description: "Checks whether the block is a given block, or in a block tag."
navigation_title: "Block"
---

Checks whether the block is a given block, by ID.

Type ID: `apoli:block`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The block this block must be. Start it with `#` to match a block tag instead, as in `"#minecraft:logs"`. |

## Examples

```json
"block_condition": {
    "type": "apoli:block",
    "block": "minecraft:diamond_block"
}
```

This checks whether the block is a diamond block.

```json
"block_condition": {
    "type": "apoli:or",
    "conditions": [
        {
            "type": "apoli:block",
            "block": "minecraft:diamond_block"
        },
        {
            "type": "apoli:block",
            "block": "minecraft:emerald_block"
        }
    ]
}
```

This checks whether the block is a diamond block or an emerald block.

```json
"block_condition": {
    "type": "apoli:block",
    "block": "#minecraft:logs"
}
```

This passes for any block in the `minecraft:logs` tag. It is the same check as [`apoli:in_tag`](/docs/datapack/block-conditions/in_tag) with that tag, so use whichever reads better where you are.
