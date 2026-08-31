---
title: "Prevent Entity Selection (Power Type)"
description: "Prevents the player from targeting entities with their crosshair."
navigation_title: "Prevent Entity Selection"
---

Prevents the player from targeting entities with their crosshair. Attacks and interactions pass straight through the entity to whatever is behind it, the same way [`apoli:prevent_block_selection`](/docs/datapack/powers/prevent_block_selection) works for blocks.

Type ID: `apoli:prevent_entity_selection`

Also answers to `apugli:prevent_entity_selection`.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_condition` | Entity Condition Type | _optional_ | If specified, only entities that fulfill this condition become unselectable.
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the entity only becomes unselectable when this condition holds. The **actor** is the player that has the power and the **target** is the entity being looked at.

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

The player cannot hit or interact with undead mobs — the swing goes through them and lands on whatever is behind.

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

While sneaking, the player can only target entities within three blocks; anything further away is looked straight through.

> This is a client-side decision — the selection is what the player's crosshair is allowed to pick, so the power's [conditions](/docs/datapack/introduction/conditions) are evaluated on the client that has the power. Conditions that depend on state the client does not have will not answer correctly here.
