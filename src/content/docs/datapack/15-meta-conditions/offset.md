---
title: "Offset (Meta Condition Type)"
description: Tests a block condition at a position offset from this one.
navigation_title: "Offset"
---

Tests a [block condition](/docs/datapack/block-conditions) at a position offset from the one being checked. This is a **block condition only** — it has no entity or item equivalent, because only block conditions have a position to offset from.

Type ID: `apoli:offset`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`condition` | [Block Condition](/docs/datapack/block-conditions) | **required** | The condition to test at the offset position.
`x` | [Integer](/docs/datapack/data-types/integer) | `0` | Blocks east.
`y` | [Integer](/docs/datapack/data-types/integer) | `0` | Blocks up.
`z` | [Integer](/docs/datapack/data-types/integer) | `0` | Blocks south.

## Examples

Is the block above this one air? This is the usual "is there room to grow" check:

```json
{
  "type": "apoli:offset",
  "y": 1,
  "condition": { "type": "apoli:air" }
}
```

Standing on grass with air above, combined:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:block", "block": "minecraft:grass_block" },
    {
      "type": "apoli:offset",
      "y": 1,
      "condition": { "type": "apoli:air" }
    }
  ]
}
```

Offsets nest, so you can reach diagonally or several blocks out:

```json
{
  "type": "apoli:offset",
  "x": 1,
  "condition": {
    "type": "apoli:offset",
    "y": -1,
    "condition": { "type": "apoli:block", "block": "minecraft:water" }
  }
}
```
