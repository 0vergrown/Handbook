---
title: "Swap (Bi-Entity Action Type)"
description: "Swaps the positions of the actor and the target."
navigation_title: "Swap"
---

Swaps the positions of the actor and the target, so each ends up where the other one was, across dimensions if they were in different ones.

Type ID: `apoli:swap`

This is [apoli:teleport_to](/docs/datapack/bientity-actions/teleport_to) with `swap` already on, and it takes every field that one does. The offset, the landing conditions and the success and fail actions all work the same way.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `swap` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Setting this to `false` turns the action back into a plain `apoli:teleport_to`. `swap_position` is accepted as an alias. |
| `x`, `y`, `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | An offset applied to where the actor lands. The target still lands exactly where the actor was. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | Which axes the offset is measured along. |
| `landing_block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The swap only happens when the block below the actor's destination passes this condition. |
| `landing_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The swap only happens when the actor would pass this condition at the destination. |
| `loaded_chunks_only` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the swap is refused when the destination chunk isn't loaded. |
| `success_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the same pair once both have arrived. |
| `fail_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when the swap is refused. |

## Examples

```json
{
    "type": "apoli:action_on_hit",
    "cooldown": 100,
    "bientity_action": {
        "type": "apoli:swap"
    }
}
```

Hitting something trades places with it.

```json
{
    "type": "apoli:fire_projectile",
    "texture_location": "minecraft:textures/item/ender_eye.png",
    "cooldown": 60,
    "speed": 2.0,
    "owner_target_bientity_action_on_hit": {
        "type": "apoli:swap",
        "success_action": {
            "type": "apoli:invert",
            "action": {
                "type": "apoli:actor_action",
                "action": {
                    "type": "apoli:apply_effect",
                    "effect": { "effect": "minecraft:nausea", "duration": 100 }
                }
            }
        }
    }
}
```

A thrown eye that changes places with whoever it hits and leaves them dizzy.

> [!NOTE]
> If [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport) stops the actor, nothing moves at all. If it only stops the target, the actor still arrives and the target stays put, which makes it a one-way trip instead of a swap.
