---
title: "Offset (Meta Condition Type)"
description: Tests a block condition at a position offset from this one.
navigation_title: "Offset"
---

Tests a [block condition](/docs/datapack/block-conditions) at a position offset from the one being checked. It is a block condition only, with no entity or item equivalent, because only block conditions have a position to offset from.

Type ID: `apoli:offset`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The condition to test at the offset position. |
| `x` | [Integer](/docs/datapack/data-types/integer) | `0` | Blocks east. |
| `y` | [Integer](/docs/datapack/data-types/integer) | `0` | Blocks up. |
| `z` | [Integer](/docs/datapack/data-types/integer) | `0` | Blocks south. |

## Examples

Is the block above this one air? That is the usual check for room to grow (the `minecraft:air` block tag covers cave air and void air too):

```json
{
  "type": "apoli:offset",
  "y": 1,
  "condition": { "type": "apoli:in_tag", "tag": "minecraft:air" }
}
```

Grass with air above it, combined:

```json
{
  "type": "apoli:all_of",
  "conditions": [
    { "type": "apoli:block", "block": "minecraft:grass_block" },
    {
      "type": "apoli:offset",
      "y": 1,
      "condition": { "type": "apoli:in_tag", "tag": "minecraft:air" }
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
