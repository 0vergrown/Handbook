---
title: "Explode (Entity Action Type)"
description: "Summons an explosion with a specific explosion power."
navigation_title: "Explode"
---

Summons an explosion with a specific explosion power.

Type ID: `apoli:explode`

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`power` | Float | | Determines the power of the explosion.
`destruction_type` | Destruction Type | `"break"` | Determines the effect of the explosion to the terrain.
`damage_self` | Boolean | `true` | Determines if the entity that invoked the action should take damage from the summoned explosion.
`damage_targets` | Boolean | `true` | Determines if everything *other* than the entity that invoked the action should take damage. Set to `false` for a blast that still breaks blocks and knocks entities back without hurting them.
`indestructible` | Block Condition Type | _optional_ | If specified, the blocks that fulfill this condition will not be destroyed by the summoned explosion.
`destructible` | Block Condition Type | _optional_ | If specified, only the blocks that fulfill this condition will be destroyed by the summoned explosion.
`create_fire` | Boolean | `false` | Determines if the summoned explosion should create fire.

## Examples

```json
"entity_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "none",
    "damage_self": false,
    "create_fire": false
}
```

This example will summon an explosion that will **not** damage the entity that invoked the action, the terrain, or create fire.

```json
"entity_action": {
    "type": "apoli:explode",
    "power": 4,
    "destruction_type": "destroy",
    "damage_self": false,
    "damage_targets": false
}
```

This one levels the terrain and shoves every nearby entity away without dealing a point of damage to anyone. Knockback
is applied independently of damage, so it survives `damage_targets: false`.
