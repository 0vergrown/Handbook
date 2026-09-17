---
title: "Prevent Entity Collision (Power Type)"
description: "Prevents the entity that has the power from colliding with other entities."
navigation_title: "Prevent Entity Collision"
---

Prevents the entity that has the power from colliding with other entities.

Type ID: `apoli:prevent_entity_collision`

> In the context of this power type, the '**actor**' entity is the entity that has the power whilst the '**target**' entity is the entity that was collided with.

This covers both halves of a collision: the soft shove entities give each other when they overlap, and the hard hitboxes of entities you normally cannot walk through, such as boats and shulkers. It is enough for either entity in the pair to have the power.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`bientity_condition` | Bi-entity Condition Type | _optional_ | If specified, the collision will only be prevented if this condition is fulfilled by either or both '**actor**' and '**target**' entities.

## Examples

```json
{
    "type": "apoli:prevent_entity_collision"
}
```

This example will prevent the entity that has the power from colliding with other entities.

```json
{
    "type": "apoli:prevent_entity_collision",
    "bientity_condition": {
        "type": "apoli:owner"
    }
}
```

This example will prevent the entity that has the power from colliding with tamable entities that are owned by the said entity.

> The power does not stop the entity from being *hit*, only from being pushed and blocked. Use [apoli:invulnerability](/docs/datapack/powers/invulnerability) for damage and [apoli:prevent_entity_selection](/docs/datapack/powers/prevent_entity_selection) for targeting.
