---
title: "In Tag (Block Condition Type)"
description: "Checks whether the block is in a specified tag."
navigation_title: "In Tag"
---

Checks whether the block is in a specified tag.

Type ID: `apoli:in_tag`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`tag` | [Identifier](/docs/datapack/data-types/identifier) | | The namespace and ID of the tag which the block should be in to pass the check. The leading `#` is optional.

## Examples

```json
"block_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:base_stone_overworld"
}
```
This example will check if the block is included in the `#minecraft:base_stone_overworld` (`data/minecraft/tags/blocks/base_stone_overworld.json`) block tag.
