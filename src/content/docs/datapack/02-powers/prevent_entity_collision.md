---
title: "Prevent Entity Collision (Power Type)"
description: "Prevents the entity that has the power from colliding with other entities."
navigation_title: "Prevent Entity Collision"
---

Prevents the entity that has the power from colliding with other entities.

Type ID: `apoli:prevent_entity_collision`

> In the context of this power type, the '**actor**' entity is the entity that has the power whilst the '**target**' entity is the entity that was collided with.

    

> Currently, this power type does not prevent collisions of certain entities that have solid hitboxes, such as Boats and Shulkers.

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
