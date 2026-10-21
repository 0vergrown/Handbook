---
title: "In Tag (Block Condition Type)"
description: "Checks whether the block is in a block tag."
navigation_title: "In Tag"
---

Checks whether the block is in a block tag.

Type ID: `apoli:in_tag`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `tag` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the block tag. The leading `#` is optional. |

## Examples

```json
"block_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:base_stone_overworld"
}
```

This checks whether the block is in the `#minecraft:base_stone_overworld` block tag (`data/minecraft/tags/blocks/base_stone_overworld.json`).
