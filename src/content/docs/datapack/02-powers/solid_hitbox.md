---
title: "Solid Hitbox (Power Type)"
description: "Makes the entity's hitbox solid, so other entities bump into it and can stand on it."
navigation_title: "Solid Hitbox"
---

Makes the entity's hitbox solid. Other entities collide with it, are stopped by it and can stand on top of it, as they can with a boat or a shulker, instead of walking through it.

Type ID: `apoli:solid_hitbox`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pushable` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the entities bumping into it can still shove the entity with the power. `false` makes it an immovable platform. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions/bi-entity-condition-types) | _optional_ | Checked with the entity that has the power as the actor and the entity trying to move through it as the target. When it fails, that entity passes through as if the power weren't there. |

It works well with [apoli:scale](/docs/datapack/powers/scale): an entity scaled up 5 times with a solid hitbox is a platform others can walk on.

## Examples

A player who is an immovable wall:

```json
{
    "type": "apoli:solid_hitbox"
}
```

Solid to everyone except the members of your party:

```json
{
    "type": "apoli:solid_hitbox",
    "pushable": false,
    "bientity_condition": {
        "type": "apoli:in_entity_set",
        "set": "example:party",
        "inverted": true
    }
}
```

> [!WARNING]
> The condition runs every time a nearby entity works out its movement, so keep it cheap. Check a command tag or a team instead of running a raycast.
