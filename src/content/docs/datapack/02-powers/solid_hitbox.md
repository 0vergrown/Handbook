---
title: "Solid Hitbox (Power Type)"
description: "Makes the entity's hitbox solid, so other entities walk into it and stand on it instead of passing through."
navigation_title: "Solid Hitbox"
---

Makes the entity's hitbox solid. Other entities collide with it, are stopped by it and can stand on top of it — the way a boat, a shulker or a happy ghast behaves — instead of walking through it.

Type ID: `apoli:solid_hitbox`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `pushable` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the holder can still be shoved by the entities bumping into it. `false` makes it an immovable platform. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions/bi-entity-condition-types) | _optional_ | Checked with the holder as **actor** and the entity trying to move through it as **target**. When it fails, that entity passes through as if the power were not there. |

Pairs naturally with [apoli:scale](/docs/datapack/powers/scale): a holder scaled up to 5× with a solid hitbox is a walkable platform.

## Examples

An immovable wall of a player:

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

> The condition runs whenever a nearby entity resolves its movement, so keep it cheap — a command tag or a team check rather than a raycast.
