---
title: "Prevent Entity Collision (Power Type)"
description: "Stops the entity that has the power from colliding with other entities."
navigation_title: "Prevent Entity Collision"
---

Stops the entity that has the power from colliding with other entities. The actor is the entity with the power, and the target is the entity it collides with.

Type ID: `apoli:prevent_entity_collision`

This covers both halves of a collision: the soft shove entities give each other when they overlap, and the hard hitboxes of entities you normally can't walk through, such as boats and shulkers. It is enough for either entity in the pair to have the power.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the collision is only prevented when the actor and target pass this condition. |

## Examples

```json
{
    "type": "apoli:prevent_entity_collision"
}
```

This stops the entity from colliding with any other entity.

```json
{
    "type": "apoli:prevent_entity_collision",
    "bientity_condition": {
        "type": "apoli:owner"
    }
}
```

This stops the entity from colliding with tamed animals it owns.

> [!NOTE]
> The power doesn't stop the entity from being hit, only from being pushed and blocked. Use [apoli:invulnerability](/docs/datapack/powers/invulnerability) for damage and [apoli:prevent_entity_selection](/docs/datapack/powers/prevent_entity_selection) for targeting.
