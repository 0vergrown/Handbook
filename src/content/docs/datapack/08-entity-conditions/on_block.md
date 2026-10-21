---
title: "On Block (Entity Condition Type)"
description: "Checks whether the entity is standing on the ground, optionally on a block that passes a condition."
navigation_title: "On Block"
---

Checks whether the entity is standing on the ground, optionally on a block that passes a block condition.

Type ID: `apoli:on_block`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The block under the entity's feet must pass this condition. Without it, the condition only checks that the entity is on the ground. |

## Examples

```json
"condition": {
    "type": "apoli:on_block"
}
```

This checks whether the entity is on the ground.

```json
"condition": {
    "type": "apoli:on_block",
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:grass_block"
    }
}
```

This checks whether the entity is standing on a grass block.
