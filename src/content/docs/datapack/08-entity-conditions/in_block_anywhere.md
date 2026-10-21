---
title: "In Block Anywhere (Entity Condition Type)"
description: "Counts the blocks overlapping the entity's eyes or feet that pass a condition, and compares the count."
navigation_title: "In Block Anywhere"
---

Counts how many blocks that pass a block condition overlap the entity's eyes or feet, and compares the count with a number.

Type ID: `apoli:in_block_anywhere`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The condition a block must pass to be counted. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | `1` | The number the count is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:in_block_anywhere",
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:flowers"
    },
    "comparison": ">",
    "compare_to": 1
}
```

This checks whether the entity is inside a two-block tall plant from the `#minecraft:flowers` block tag (`data/minecraft/tags/blocks/flowers.json`), such as a rose bush.
