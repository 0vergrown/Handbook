---
title: "Modify Tick Rate (Power Type)"
description: "Slows, freezes or restores the flow of time for the holder, the chunk they stand in, the whole dimension, or every entity around them."
navigation_title: "Modify Tick Rate"
---

Slows, freezes or restores the flow of time for the holder, the chunk they stand in, the whole dimension, or every entity in an area around them. It is the power-shaped half of [apoli:tick_rate](/docs/datapack/entity-actions/tick_rate): the state is re-applied every tick while the power is active and lapses on its own a couple of ticks after the power stops, so nothing stays frozen when the power is lost, the holder dies, or the data pack is reloaded.

Type ID: `apoli:modify_tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `self`, `chunk`, `dimension` or `area` | `self` | What the tick rate is applied to. `self` is the holder, `chunk` the chunk they stand in, `dimension` their whole dimension, `area` every entity matching the filters below. |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _inherit_ | Logical ticks per second. `20` is normal speed, `10` is half speed, `0` stops everything. Omit it to leave the rate inherited and only set `frozen`. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Stops ticking entirely, regardless of `rate`. |
| `radius` | [Vector](/docs/datapack/data-types/vector) or [Float](/docs/datapack/data-types/float) | `16` | `area` only — how far the effect reaches. A single number is used for all three axes. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `cube` | `area` only — the shape carved out of that radius. |
| `bientity_condition` | Bi-entity Condition | _optional_ | `area` only — the holder is the actor and each candidate the target. Only entities that pass are affected. |
| `include_self` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `area` only — whether the holder is affected along with everything else. |
| `affect_chunks` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `area` only — also applies the rate to every chunk the radius covers, so blocks, block entities and random ticks slow down too, not just entities. |
| `interval` | [Integer](/docs/datapack/data-types/integer) | `1` | `area` only — how often the area is re-scanned, in ticks. |

## What a tick rate actually changes

A rate below the server's own tick rate means the target is skipped on some server ticks, spread as evenly as possible. At `rate: 5` an entity gets one tick in four: it falls, walks, swims, burns, attacks and ages at a quarter speed, and its status effects and cooldowns count down four times slower.

Applied to a chunk, the same gate covers block entities, scheduled block and fluid ticks, and random ticks — furnaces smelt slowly, crops grow slowly, hoppers move items slowly.

The rate never runs anything *faster* than the server already ticks. To speed the world up, raise the server's own rate with vanilla `/tick rate` (Minecraft 1.21 and later) and use this power to hold everything else down at 20.

The scopes fall back to each other: an entity with no rate of its own uses its chunk's, and a chunk with no rate of its own uses its dimension's. A passenger always follows its root vehicle.

> Freezing a **player** stops their server-side tick — hunger, regeneration, status effects, item cooldowns, block breaking. It does not stop their client from walking, because movement is client-authoritative. Pair it with a power that actually immobilises them if you need them held in place.

> `target: area` runs an entity query every `interval` ticks for every holder. On a busy server, raise `interval` before raising `radius`.

## Examples

```json
{
    "type": "apoli:modify_tick_rate",
    "target": "area",
    "radius": 8,
    "shape": "sphere",
    "rate": 4,
    "affect_chunks": true,
    "bientity_condition": {
        "type": "apoli:invert",
        "condition": {
            "type": "apoli:relative_rotation",
            "comparison": ">",
            "compare_to": 0
        }
    },
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

While the holder sneaks, everything within eight blocks — mobs, projectiles, furnaces and growing crops alike — runs at a fifth speed.

```json
{
    "type": "apoli:modify_tick_rate",
    "target": "self",
    "rate": 40
}
```

Asks for double speed. Because a rate is never faster than the server's own, this only does something once an operator has run `/tick rate 40`; on a normal 20 TPS server it is a no-op.
