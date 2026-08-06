---
title: "Action On Block Break (Power Type)"
description: "Executes an Entity Action Type or a Block Action Type when the entity with the power breaks a block."
navigation_title: "Action On Block Break"
---

Executes an Entity Action Type or a Block Action Type when the entity with the power breaks a block.

Type ID: `apoli:action_on_block_break`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the player when a block is broken.
`block_action` | Block Action Type | _optional_ | If specified, this action will be executed on the block that is broken.
`block_condition` | Block Condition Type | _optional_ | If set, the specified actions will only trigger when this block condition is met by the broken block.
`only_when_harvested` | [Boolean](/docs/datapack/data-types/boolean) | `true` | If this is true, the specified actions will only execute when the player succeeds in harvesting the block (e.g. they will not trigger when stone is broken by hand).

> The power fires **after** the block is removed, but `block_condition` is tested against the state captured beforehand — so conditions on the broken block work, while a `block_action` that places something acts on the now-empty space.
>
> "Harvested" means the player had the right tool (`hasCorrectToolForDrops`), which is the same test vanilla uses to decide whether the block drops. [apoli:modify_harvest](/docs/datapack/powers/modify_harvest) therefore changes what counts as harvested here too.

## Examples

```json
{
    "type": "apoli:action_on_block_break",
    "entity_action": {
        "type": "apoli:damage",
        "amount": 2.0,
        "source": {
            "name": "onFire",
            "bypasses_armor": true,
            "fire": true
        }
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

This example will deal 1 heart of `onFire` damage to the player, and place a Lava fluid at where the Magma Block previously was if the player were to mine a Magma Block.
