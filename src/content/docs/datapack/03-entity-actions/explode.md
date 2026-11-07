---
title: "Explode (Entity Action Type)"
description: "Creates an explosion of a given power at the entity."
navigation_title: "Explode"
---

Creates an explosion of a given power at the entity's position. The explosion is credited to that entity, so a kill names it in the death message. When the action runs on the target of a bi-entity action, for example through [apoli:target_action](/docs/datapack/bientity-actions/target_action) in an [apoli:raycast](/docs/datapack/entity-actions/raycast) or a hit power, the actor of that bi-entity action gets the credit instead. A projectile's credit goes to the entity that fired it.

Type ID: `apoli:explode`

> [!NOTE]
> A credited explosion follows the server's PvP and team rules like a melee hit. With `pvp=false`, or between teammates when friendly fire is off, a blast credited to a player doesn't hurt other players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Float](/docs/datapack/data-types/float) | _required_ | The power of the explosion. |
| `destruction_type` | [Destruction Type](/docs/datapack/data-types/destruction-type) | `"break"` | What the explosion does to the terrain. |
| `damage_self` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the entity that ran the action takes damage from the explosion. |
| `damage_targets` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether everything other than the entity that ran the action takes damage. Set it to `false` for a blast that still breaks blocks and knocks entities back without hurting them. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only entities that pass this take damage, with the entity that ran the action as the actor and the entity in the blast as the target. |
| `indestructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Blocks that pass this condition aren't destroyed by the explosion. |
| `destructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Only blocks that pass this condition are destroyed by the explosion. |
| `create_fire` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the explosion starts fires. |

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

This explosion doesn't hurt the entity that ran the action, doesn't damage the terrain and doesn't start fires.

```json
"entity_action": {
    "type": "apoli:explode",
    "power": 4,
    "destruction_type": "destroy",
    "damage_self": false,
    "damage_targets": false
}
```

This one levels the terrain and shoves every nearby entity away without dealing any damage. Knockback is applied separately from damage, so it still happens with `damage_targets: false`.
