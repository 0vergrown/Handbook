---
title: "Block (Block Condition Type)"
description: "Checks whether the block is a certain block (by ID)."
navigation_title: "Block"
---

Checks whether the block is a certain block (by ID).

Type ID: `apoli:block`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block` | [Identifier](/docs/datapack/data-types/identifier) | | The block this block needs to be. Prefix with `#` to match a block tag instead — `"#minecraft:logs"`.

## Examples

```json
"block_condition": {
    "type": "apoli:block",
    "block": "minecraft:diamond_block"
}
```

This example checks if the block is a Diamond Block.

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

This example will check if the block is either a Diamond Block or an Emerald Block.

```json
"block_condition": {
    "type": "apoli:block",
    "block": "#minecraft:logs"
}
```

This example passes for any block in the `minecraft:logs` tag. It is the same check as
[`apoli:in_tag`](/docs/datapack/block-conditions/in_tag) with that tag — use whichever reads
better where you are.
