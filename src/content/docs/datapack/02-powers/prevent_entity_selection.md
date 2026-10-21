---
title: "Prevent Entity Selection (Power Type)"
description: "Stops the player from targeting entities with their crosshair."
navigation_title: "Prevent Entity Selection"
aliases: ["apugli:prevent_entity_selection"]
---

Stops the player from targeting entities with their crosshair. Attacks and interactions pass straight through the entity to whatever is behind it, the same way [`apoli:prevent_block_selection`](/docs/datapack/powers/prevent_block_selection) works for blocks.

Type ID: `apoli:prevent_entity_selection`

It also answers to `apugli:prevent_entity_selection`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, only entities that pass this condition become unselectable. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, an entity only becomes unselectable while this condition holds. The actor is the player with the power and the target is the entity being looked at. |

With neither field, every entity becomes unselectable.

## Examples

```json
{
    "type": "apoli:prevent_entity_selection",
    "entity_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:undead"
    }
}
```

The player can't hit or interact with undead mobs. The swing goes through them and lands on whatever is behind.

```json
{
    "type": "apoli:prevent_entity_selection",
    "bientity_condition": {
        "type": "apoli:distance",
        "comparison": ">",
        "compare_to": 3
    },
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

While sneaking, the player can only target entities within three blocks, and looks straight through anything further away.

> [!WARNING]
> The client decides what the crosshair is allowed to pick, so the power's [conditions](/docs/datapack/introduction/conditions) are evaluated on the client of the player who has the power. Conditions that depend on state the client doesn't have won't answer correctly here.
