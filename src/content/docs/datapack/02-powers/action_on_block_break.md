---
title: "Action On Block Break (Power Type)"
description: "Runs an entity action, a block action or both when the entity with the power breaks a block."
navigation_title: "Action On Block Break"
---

Runs an entity action, a block action or both when the entity with the power breaks a block.

Type ID: `apoli:action_on_block_break`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the player when a block is broken. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _optional_ | If set, this action runs on the block that was broken. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the actions only run when the broken block passes this condition. |
| `only_when_harvested` | [Boolean](/docs/datapack/data-types/boolean) | `true` | If `true`, the actions only run when the player harvests the block. For example, they don't run when stone is broken by hand. |

> [!NOTE]
> The power fires after the block is removed, but `block_condition` is tested against the state captured beforehand. Conditions on the broken block work, and a `block_action` that places something acts on the now empty space.
>
> "Harvested" means the player had the right tool (`hasCorrectToolForDrops`), the same test vanilla uses to decide whether the block drops. [apoli:modify_harvest](/docs/datapack/powers/modify_harvest) changes what counts as harvested here too.

## Examples

```json
{
    "type": "apoli:action_on_block_break",
    "entity_action": {
        "type": "apoli:damage",
        "amount": 2.0,
        "damage_type": "minecraft:on_fire"
    },
    "block_action": {
        "type": "apoli:set_block",
        "block": "minecraft:lava"
    },
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:magma_block"
    },
    "only_when_harvested": false
}
```

When the player breaks a magma block, this deals 1 heart of `minecraft:on_fire` damage to them and places lava where the magma block was.
