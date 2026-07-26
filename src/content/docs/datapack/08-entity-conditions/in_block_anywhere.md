---
title: "origins:in_block_anywhere"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks how many blocks are overlapping with the entity's eyes or feet.

Type ID: `origins:in_block_anywhere`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | |  The block condition type which blocks need to fulfill in order to count for this condition.
`comparison` | Comparison | `">="` |  Determines how the amount of blocks which overlap and fulfill `block_condition` should be compared to the specified value.
`compare_to` | Integer | `1` |  The value at which the amount of blocks which overlap and fulfill `block_condition` will be compared to.


## Examples

```json
"condition": {
    "type": "origins:in_block_anywhere",
    "block_condition": {
        "type": "origins:in_tag",
        "tag": "minecraft:flowers"
    },
    "comparison": ">",
    "compare_to": 1
}
```

This example will check if the entity is currently inside a two-block tall foliage block that belongs in the `#minecraft:flowers` (`data\minecraft\tags\blocks\flowers.json`) block tag. An example is the rose bush block.

