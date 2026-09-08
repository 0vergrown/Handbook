---
title: "Tick targets, and expressions in every particle"
description: "Apoli 1.69.0 puts entity and chunk branches on Minecraft's own /tick command, makes every number on a particle an expression, and fixes apoli:action_on_mouse_movement on NeoForge."
date: 2026-09-05
author: Overgrown
---

Three things this time, and the first one is a command rather than a power.

## `/tick entity` and `/tick chunk`

Minecraft has had `/tick` since 1.20.3, and it is the right place for this: it already knows how to
slow the world down, and it already tells every client about it. Apoli now hangs two more branches
off it.

```mcfunction
tick entity @e[type=creeper] freeze
tick entity @e[type=arrow] rate 4
tick chunk ~ ~ radius 64 rate 5
tick chunk 0 0 512 512 query
```

Every operation the server-wide command has — `query`, `rate`, `freeze`, `unfreeze`, `step`,
`sprint` — works on a selector full of entities or on a patch of chunks. The full syntax is on the
[Tick command page](/docs/datapack/commands/tick).

The vanilla branches sit under permission level 3, which is more than a data-pack function gets, so
the same tree is also registered as `/apoli:tick entity …` and `/apoli:tick chunk …` at Apoli's own
level 2. Use that one inside `.mcfunction` files.

A rate above the server's own still does nothing on its own — a server cannot tick one entity more
often than it ticks at all. Raise the whole server with `/tick rate 40` and hold everything else
down with `tick chunk`, `tick entity` or
[apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate) on a `dimension` target.

## Every number on a particle is an expression

`count`, `speed`, `spread`, `offset_x`/`y`/`z`, `velocity_x`/`y`/`z` and `frequency` on
[apoli:particle](/docs/datapack/powers/particle) and both
[apoli:spawn_particles](/docs/datapack/entity-actions/spawn_particles) actions now take an
[expression](/docs/datapack/data-types/expression) wherever they took a number, and `spread` takes a
single number as shorthand for the same figure on all three axes.

So does every number inside a
[custom particle](/docs/datapack/data-types/custom-particle) — `size`, `lifetime`, `gravity`,
`friction` and the variation fields. Those are evaluated on the server, once, at the moment the
burst is spawned, against the entity that spawned it:

```json
{
    "type": "apoli:particle",
    "particle": {
        "type": "apoli:custom",
        "texture": "example:textures/particle/spark.png",
        "size": "0.1 + resource('example:charge') * 0.02",
        "lifetime": "10 + resource('example:charge')"
    },
    "count": "resource('example:charge')",
    "spread": "0.2 + resource('example:charge') * 0.05",
    "frequency": 2
}
```

That is one power whose particles grow, multiply and live longer as a resource fills, instead of
five powers with a condition each.

`roll` and `roll_speed` stay as they were: they run on the client, once per particle, which is what
makes `"roll": "rUni(0, 360)"` give every particle its own angle.

## `apoli:action_on_mouse_movement` on NeoForge

The power reads the camera through a wrapper on `Entity.turn`. On NeoForge that wrapper was still
the older cursor-speed-only version, so the client never accumulated anything and the power never
fired. It fires now.
