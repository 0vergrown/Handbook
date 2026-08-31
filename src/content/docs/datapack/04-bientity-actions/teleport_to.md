---
title: "Teleport To (Bi-Entity Action Type)"
description: "Teleports the actor to the target, optionally swapping the two."
navigation_title: "Teleport To"
---

Teleports the **actor** to the **target**, across dimensions if they are in different ones. With `swap` it becomes an exchange: each entity ends up where the other one was.

Type ID: `apoli:teleport_to`

The direction is worth reading twice: the actor is the one that moves. In a power's `bientity_action` the actor is the entity that has the power, so the plain form teleports the holder *to* whatever the target is. Wrap it in [apoli:invert](/docs/datapack/bientity-actions/invert) to send the target to the holder instead.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`swap` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the target is moved to where the actor was, so the two trade places. _Alias: `swap_position`._ See [apoli:swap](/docs/datapack/bientity-actions/swap) for the same thing under its own name.
`x`, `y`, `z` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `0` | An offset from the target, so the actor can land beside or behind it rather than inside it. The Expressions read the **actor**.
`space` | [Space](/docs/datapack/data-types/space) | `world` | Which axes the offset is measured along. `local` turns with the **target**, so `z: -1` is one block behind them.
`landing_block_condition` | Block Condition Type | _optional_ | If specified, the teleport only happens when the block **below** the destination fulfills this condition.
`landing_condition` | Entity Condition Type | _optional_ | If specified, the teleport only happens when the actor would fulfill this condition **at the destination**. Skipped when the two are in different dimensions.
`loaded_chunks_only` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the teleport is refused when the destination chunk is not loaded.
`success_action` | Bi-Entity Action Type | _optional_ | Runs with the same pair once they have arrived.
`fail_action` | Bi-Entity Action Type | _optional_ | Runs when the teleport is refused — by a condition, by an unloaded chunk, or by [apoli:prevent_teleport](/docs/datapack/powers/prevent_teleport).

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

A backstab blink: the actor lands one block behind the target, whichever way it is facing.

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

An ender pearl with none of the vanilla side effects. `bientity_action_on_miss` hands this action the shooter as the actor and the projectile as the target, so the shooter arrives wherever the projectile stopped — which is what a pearl does, without the five points of fall damage vanilla charges for it.

> The actor keeps its own rotation. Nothing about this action makes room at the destination, so pair it with `landing_condition` when the target might be standing somewhere the actor does not fit.
