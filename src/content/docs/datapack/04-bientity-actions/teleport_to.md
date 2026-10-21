---
title: "Teleport To (Bi-Entity Action Type)"
description: "Teleports the actor to the target, optionally swapping the two."
navigation_title: "Teleport To"
---

Teleports the actor to the target, across dimensions if they are in different ones. With `swap` it becomes an exchange, and each entity ends up where the other one was.

Type ID: `apoli:teleport_to`

The actor is the one that moves. In a power's `bientity_action` the actor is the entity that has the power, so the plain form teleports the holder to whatever the target is. Wrap it in [apoli:invert](/docs/datapack/bientity-actions/invert) to send the target to the holder instead.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `swap` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the target is moved to where the actor was, so the two trade places. `swap_position` is accepted as an alias. See [apoli:swap](/docs/datapack/bientity-actions/swap) for the same thing under its own name. |
| `x`, `y`, `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | An offset from the target, so the actor can land beside or behind it instead of inside it. The expressions read the actor. |
| `space` | [Space](/docs/datapack/data-types/space) | `world` | Which axes the offset is measured along. `local` turns with the target, so `z: -1` is one block behind it. |
| `landing_block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The teleport only happens when the block below the destination passes this condition. |
| `landing_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | The teleport only happens when the actor would pass this condition at the destination. It is tested as though the actor were already standing there, so everything that depends on where the actor is gets read at the destination: the fluid around it ([apoli:fluid_height](/docs/datapack/entity-conditions/fluid_height), [apoli:submerged_in](/docs/datapack/entity-conditions/submerged_in)), the block under it ([apoli:on_block](/docs/datapack/entity-conditions/on_block)), the blocks it overlaps and the sky above it. Skipped when the two are in different dimensions. |
| `loaded_chunks_only` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the teleport is refused when the destination chunk isn't loaded. |
| `success_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs with the same pair once they have arrived. |
| `fail_action` | [Bi-entity Action Type](/docs/datapack/bientity-actions) | _optional_ | Runs when the teleport is refused by a condition, an unloaded chunk or [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport). |

## Examples

```json
"bientity_action": {
    "type": "apoli:teleport_to"
}
```

The actor arrives at the target.

```json
"bientity_action": {
    "type": "apoli:teleport_to",
    "space": "local",
    "z": -1,
    "success_action": {
        "type": "apoli:actor_action",
        "action": {
            "type": "apoli:play_sound",
            "sound": "minecraft:entity.enderman.teleport"
        }
    }
}
```

A backstab blink: the actor lands one block behind the target, whichever way the target is facing.

```json
{
    "type": "apoli:fire_projectile",
    "texture_location": "minecraft:textures/item/ender_pearl.png",
    "cooldown": 30,
    "speed": 1.5,
    "sound": "minecraft:entity.ender_pearl.throw",
    "bientity_action_on_miss": { "type": "apoli:teleport_to" },
    "owner_target_bientity_action_on_hit": { "type": "apoli:teleport_to" }
}
```

An ender pearl with none of the vanilla side effects. `bientity_action_on_miss` gives this action the shooter as the actor and the projectile as the target, so the shooter arrives wherever the projectile stopped. That is what a pearl does, without the five points of fall damage vanilla charges for it.

> [!NOTE]
> The actor keeps its own rotation. Nothing about this action makes room at the destination, so pair it with `landing_condition` when the target might be standing somewhere the actor doesn't fit.
