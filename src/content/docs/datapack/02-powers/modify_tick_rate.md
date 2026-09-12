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
| `target` | `self`, `chunk`, `dimension`, `server` or `area` | `self` | What the tick rate is applied to. `self` is the holder, `chunk` the chunk they stand in, `dimension` their whole dimension, `server` Minecraft's own tick rate (the `/tick` one — see [the action](/docs/datapack/entity-actions/tick_rate#server-scope-is-vanillas-tick)), `area` every entity matching the filters below. |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _inherit_ | Logical ticks per second. `20` is normal speed, `10` is half speed, `0` stops everything. Omit it to leave the rate inherited and only set `frozen`. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Stops ticking entirely, regardless of `rate`. |
| `radius` | [Vector](/docs/datapack/data-types/vector) or [Float](/docs/datapack/data-types/float) | `16` | `area` only — how far the effect reaches. A single number is used for all three axes. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `cube` | `area` only — the shape carved out of that radius. |
| `bientity_condition` | Bi-entity Condition | _optional_ | `area` only — the holder is the actor and each candidate the target. Only entities that pass are affected; the ones that fail keep running at full speed even inside the chunks `affect_chunks` slows. On any other `target` the filter has nothing to pick between, so it is ignored and Apoli logs which power set it. |
| `include_self` | [Boolean](/docs/datapack/data-types/boolean) | `false` for `area`, otherwise _unset_ | Whether the holder is affected along with everything else. On `area` it also keeps the holder out of the chunks `affect_chunks` slows. On `chunk` and `dimension` write `false` explicitly to exempt the holder from the rate this power sets; leave it out and the holder is affected like anything else standing there. It cannot exempt anyone from `server`, which is Minecraft's own global rate. |
| `affect_chunks` | [Boolean](/docs/datapack/data-types/boolean) | `false` | `area` only — also applies the rate to every chunk the radius covers, so blocks, block entities and random ticks slow down too, not just entities. |
| `interval` | [Integer](/docs/datapack/data-types/integer) | `1` | `area` only — how often the area is re-scanned, in ticks. |

## What a tick rate actually changes

A rate below the server's own tick rate means the target is skipped on some server ticks, spread as evenly as possible. At `rate: 5` an entity gets one tick in four: it falls, walks, swims, burns, attacks and ages at a quarter speed, and its status effects and cooldowns count down four times slower.

Applied to a chunk, the same gate covers block entities, scheduled block and fluid ticks, and random ticks — furnaces smelt slowly, crops grow slowly, hoppers move items slowly.

Every entity that ends up running slower than the server is told so, and its client runs it on the
same schedule, so the two never disagree about where it is. For a **mob or player** the client
reproduces what vanilla `/tick rate` does for the whole game, one entity at a time: it gets one tick
per slot of `20 / rate` real ticks, and the renderer is handed a partial tick that sweeps the whole
slot. Its walk cycle, swing, head turn, breathing and every other `age`-driven animation runs at the
slowed speed and interpolates smoothly across it, rather than playing at full speed while the body
creeps along.

A **projectile, item or other non-living entity** is not ticked on its client at all while it is
slowed — those run their own physics client-side, so letting them tick even once per slot makes them
lurch and snap back. They are driven purely by the server's position updates instead.

Either way, position moves every real tick: the client glides the entity toward each position the
server sends, which is what keeps a slowed entity from stalling and snapping when a movement packet
lands slightly early or late.

A rate on a **player** slows that player's own tick, including their movement, and their camera and
first-person hand are interpolated across the slot too, so slowing yourself looks like slow motion
rather than a stutter — punching and drawing a bow play out at the slowed speed. A **frozen** entity
stops dead on both sides.

> Anything the local player is riding keeps ticking normally on their own client. Skipping it would
> stutter the camera, which is worse than the small correction the server sends instead.

For a global slow-motion effect, prefer `target: server`: it is Minecraft's own tick rate, so
everything — rendering, particles, sounds, the lot — slows together with no interpolation to patch
up. Per-entity rates are for singling out one mob or one projectile.

The rate never runs anything *faster* than the server already ticks. To speed the world up, raise the server's own rate with vanilla `/tick rate` (Minecraft 1.21 and later) and use this power — or [`/tick entity` and `/tick chunk`](/docs/datapack/commands/tick) — to hold everything else down at 20.

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
    "include_self": false,
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

While the holder sneaks, everything within eight blocks — mobs, projectiles, furnaces and growing crops alike — runs at a fifth speed. `include_self: false` keeps the holder out of it, chunk included, so they move at full speed through their own slowed bubble.

```json
{
    "type": "apoli:modify_tick_rate",
    "target": "self",
    "rate": 40
}
```

Asks for double speed. Because a rate is never faster than the server's own, this only does something once an operator has run `/tick rate 40`; on a normal 20 TPS server it is a no-op.
