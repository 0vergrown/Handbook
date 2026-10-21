---
title: "Modify Tick Rate (Power Type)"
description: "Slows, freezes or restores time for the entity, its chunk, its dimension, or every entity around it."
navigation_title: "Modify Tick Rate"
---

Slows, freezes or restores the flow of time for the entity with the power, the chunk it stands in, its whole dimension, or every entity in an area around it. It is the power form of [apoli:tick_rate](/docs/datapack/entity-actions/tick_rate). The state is applied again every tick while the power is active and lapses a couple of ticks after the power stops, so nothing stays frozen when the power is lost, the entity dies or the data pack is reloaded.

Type ID: `apoli:modify_tick_rate`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | `self`, `chunk`, `dimension`, `server` or `area` | `self` | What the tick rate applies to. `self` is the entity with the power, `chunk` is the chunk it stands in, `dimension` is its whole dimension, `server` is Minecraft's own tick rate (the one `/tick` sets, see [the action](/docs/datapack/entity-actions/tick_rate#server-scope-is-vanillas-tick)), and `area` is every entity that matches the filters below. |
| `rate` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _inherit_ | Logical ticks per second. `20` is normal speed, `10` is half speed and `0` stops everything. Leave it out to keep the inherited rate and only set `frozen`. |
| `frozen` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Stops ticking entirely, whatever `rate` says. |
| `radius` | [Vector](/docs/datapack/data-types/vector) or [Float](/docs/datapack/data-types/float) | `16` | For `area` only. How far the effect reaches. A single number is used for all three axes. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `cube` | For `area` only. The shape cut out of that radius. |
| `hollow_thickness` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | For `area` only. How thick a hollow `shape` is, in blocks, read from the entity with the power. |
| `bientity_condition` | [Bi-entity Condition](/docs/datapack/bientity-conditions) | _optional_ | For `area` only. The entity with the power is the actor and each candidate is the target. Only entities that pass are affected, and the ones that fail keep running at full speed even inside the chunks `affect_chunks` slows. On any other `target` the filter has nothing to choose between, so it is ignored and Apoli logs which power set it. |
| `include_self` | [Boolean](/docs/datapack/data-types/boolean) | `false` for `area`, otherwise _unset_ | Whether the entity with the power is affected along with everything else. On `area` it also keeps the entity out of the chunks `affect_chunks` slows. On `chunk` and `dimension`, write `false` to exempt the entity from the rate this power sets, and leave it out to affect the entity like anything else standing there. It can't exempt anyone from `server`, which is Minecraft's own global rate. |
| `affect_chunks` | [Boolean](/docs/datapack/data-types/boolean) | `false` | For `area` only. Also applies the rate to every chunk the radius covers, so blocks, block entities and random ticks slow down too, not only entities. |
| `interval` | [Integer](/docs/datapack/data-types/integer) | `1` | For `area` only. How often the area is scanned again, in ticks. |

## What a tick rate changes

A rate below the server's own tick rate means the target is skipped on some server ticks, spread as evenly as possible. At `rate: 5` an entity gets one tick in four, so it falls, walks, swims, burns, attacks and ages at a quarter speed, and its status effects and cooldowns count down four times slower.

On a chunk, the same gate covers block entities, scheduled block and fluid ticks and random ticks, so furnaces smelt slowly, crops grow slowly and hoppers move items slowly.

Every entity that ends up running slower than the server is told so, and its client runs it on the same schedule, so the two never disagree about where it is. For a mob or a player, the client does what vanilla `/tick rate` does for the whole game, one entity at a time: the entity gets one tick per slot of `20 / rate` real ticks, and the renderer gets a partial tick that sweeps across the whole slot. Its walk cycle, swing, head turn, breathing and every other animation driven by `age` run at the slowed speed and interpolate smoothly across it, instead of playing at full speed while the body creeps along.

A projectile, item or other non-living entity isn't ticked on its client at all while it is slowed. Those run their own physics on the client, so letting them tick even once per slot makes them lurch and snap back. The server's position updates drive them instead.

Either way, the position moves every real tick. The client glides the entity toward each position the server sends, which keeps a slowed entity from stalling and snapping when a movement packet arrives slightly early or late.

A rate on a player slows that player's own tick, including their movement, and their camera and first-person hand are interpolated across the slot too, so slowing yourself looks like slow motion instead of a stutter. Punching and drawing a bow play out at the slowed speed. A frozen entity stops dead on both sides.

For a global slow motion effect, use `target: server`. It is Minecraft's own tick rate, so rendering, particles, sounds and everything else slow down together, with no interpolation to fix up. Rates for single entities are for picking out one mob or one projectile.

The rate never runs anything faster than the server already ticks. To speed the world up, raise the server's own rate with vanilla `/tick rate` (Minecraft 1.21 and later), and use this power, or [`/tick entity` and `/tick chunk`](/docs/datapack/commands/tick), to hold everything else at 20.

The scopes fall back to each other. An entity with no rate of its own uses its chunk's, and a chunk with no rate of its own uses its dimension's.

> [!NOTE]
> Freezing a player stops them on both sides. Their server tick stops (hunger, regeneration, status effects, item cooldowns, block breaking), and so does their own client's tick, so they can't walk either. Looking around and clicking aren't part of the tick, so a frozen player can still look around and use or attack what is in reach.

> [!WARNING]
> A frozen entity's half-second immunity after a hit never counts down, so while it stays frozen, any later hit that is no stronger than the last one does nothing. Damage that has to land on something frozen, such as a power that holds enemies in place and then hurts them, needs a damage type in `#minecraft:bypasses_cooldown`. The red hurt flash still fades on screen as usual.

## Riding

- An entity's own rate or freeze always applies to it, whatever it is riding. A frozen passenger stays frozen in a moving boat. It is carried along, but it doesn't tick, so it can't steer or climb out.
- A passenger with no rate of its own takes its vehicle's.
- A vehicle never runs faster than whoever is steering it, such as the player in a boat's front seat, on a saddled horse or on a pig with a carrot on a stick. A frozen rider freezes the boat or mount under them, and the vehicle goes back to its own rate as soon as they get off.
- Anything the local player is riding keeps ticking as usual on their own client while it is only slowed, because skipping ticks would make their camera stutter, and the server's small corrections are the lesser problem. A frozen vehicle stops for its rider too.

> [!WARNING]
> `target: area` runs an entity query every `interval` ticks for every entity with the power. On a busy server, raise `interval` before you raise `radius`.

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

While the entity with the power sneaks, everything within eight blocks runs at a fifth of normal speed, including mobs, projectiles, furnaces and growing crops. `include_self: false` keeps the entity out of it, chunk included, so it moves at full speed through its own slowed bubble.

```json
{
    "type": "apoli:modify_tick_rate",
    "target": "self",
    "rate": 40
}
```

This asks for double speed. A rate is never faster than the server's own, so this only does something once an operator has run `/tick rate 40`, and on a normal 20 TPS server it does nothing.
