---
title: "Explode (Block Action Type)"
description: "Creates an explosion of a given power at the block's position."
navigation_title: "Explode"
---

Creates an explosion of a given power at the block's position. The explosion is credited to the entity that ran the block action, such as the caster of an [apoli:raycast](/docs/datapack/entity-actions/raycast) or the shooter whose projectile ran it from `block_action_on_hit` in [apoli:fire_projectile](/docs/datapack/powers/fire_projectile), so a kill names them in the death message. A block action with no entity behind it gives no credit, and the death message names no killer.

Type ID: `apoli:explode`

> [!NOTE]
> A credited explosion follows the server's PvP and team rules like a melee hit. With `pvp=false`, or between teammates when friendly fire is off, a blast credited to a player doesn't hurt other players.

> [!NOTE]
> The explosion starts at the centre of the block. When that block is solid, it shields nearby entities from the blast, so they take only the explosion's minimum damage and hardly any knockback. Entities still take full damage from an explosion that starts in an open space, such as the block an entity stands in through [apoli:block_action_at](/docs/datapack/entity-actions/block_action_at).

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Float](/docs/datapack/data-types/float) | _required_ | The power of the explosion. |
| `destruction_type` | [Destruction Type](/docs/datapack/data-types/destruction-type) | `"break"` | What the explosion does to the terrain. |
| `damage_targets` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether entities caught in the blast take damage. `false` still breaks blocks and applies knockback. |
| `indestructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Blocks that pass this condition aren't destroyed by the explosion. |
| `destructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Only blocks that pass this condition are destroyed by the explosion. |
| `create_fire` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the explosion starts fires. |

## Examples

```json
"block_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "none",
    "create_fire": false
}
```

This creates an explosion at the block's position that neither damages the terrain nor starts fires.

```json
"block_action": {
    "type": "apoli:explode",
    "power": 5,
    "destruction_type": "break",
    "destructible": {
        "type": "apoli:in_tag",
        "tag": "minecraft:impermeable"
    },
    "create_fire": false
}
```

This creates an explosion at the block's position that only destroys blocks in the `#minecraft:impermeable` block tag (`data/minecraft/tags/blocks/impermeable.json`).
