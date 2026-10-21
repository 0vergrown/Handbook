---
title: "Explode (Bi-Entity Action Type)"
description: "Creates an explosion at the actor or the target, with control over how it treats blocks."
navigation_title: "Explode"
---

Creates an explosion at the actor or at the target, with control over how it treats blocks. Damage and kill credit go to the actor.

Type ID: `apoli:explode`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `power` | [Float](/docs/datapack/data-types/float) | _required_ | The power of the explosion, which sets its blast radius. |
| `destruction_type` | [String](/docs/datapack/data-types/string) | `"destroy"` | How the explosion affects blocks: `"none"`, `"break"` or `"destroy"`. |
| `create_fire` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the explosion starts fires in the blast area. |
| `at_target` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the explosion starts at the target's position, and otherwise at the actor's. |
| `damage_self` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the actor takes damage from its own explosion. |
| `damage_targets` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether everything other than the actor takes damage. `false` keeps the broken blocks and the knockback but deals no damage. |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | Only entities that pass this take damage, with the actor as the actor and the entity in the blast as the target. |
| `indestructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Blocks that pass this are protected from the explosion, whatever the `destruction_type`. |
| `destructible` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | Blocks that pass this can be destroyed, even if they also pass `indestructible`. Once it is set, blocks that don't pass it are protected. |

## Block destruction logic

Each block in the blast is checked in this order:

1. If `destructible` is set and the block passes it, the block can be destroyed, whatever `indestructible` says.
2. If `indestructible` is set and the block passes it, the block is protected.
3. If `destructible` is set and the block didn't pass it, the block is protected.
4. Otherwise, `destruction_type` decides as it does for a normal explosion.

## Examples

```json
{
    "type": "apoli:explode",
    "power": 3.0,
    "destruction_type": "break",
    "create_fire": false
}
```

An explosion at the actor's position that breaks blocks.
