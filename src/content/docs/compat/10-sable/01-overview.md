---
title: Sable
description: How apoli:phasing and ropes behave on blocks that Sable has assembled into a moving sub-level.
---

[Sable](https://github.com/ryanhcode/sable) turns a region of blocks into a **sub-level**: the
blocks keep living in the world, in a reserved chunk region called a *plot*, and Sable renders
and collides them wherever the structure has moved and rotated to.

Apoli registers **no types** for Sable. This compat is **behaviour-gated** — it is applied
automatically when Sable is installed, and nothing changes when it is not. Sable ships for both
Fabric and NeoForge on 1.21.1, and so does this integration; it is the same code in both builds,
reaching Sable through its public API rather than through anything loader-specific.

## What it fixes

### Ropes anchor to the structure

[`apoli:attach_rope`](/docs/datapack/entity-actions/attach_rope) resolves a `raycast` endpoint by
firing a ray and keeping the point it hit. Sable answers that ray in the sub-level's **own**
coordinates — the plot's, not the world's — so a raw hit point would land tens of thousands of
blocks away in the reserved plot region, with the rope drawn stretching off to nowhere.

An endpoint that lands on a sub-level is instead stored as *(which sub-level, where on it)* and
converted back to a world position every tick, on both the server and the client. The result is a
rope that stays welded to the block it hit: swing off a moving airship and you move with it, and the
rope's length constraint, its `break_beyond` distance and its rendering all use the tracked
position. When the sub-level is unloaded or disassembled the anchor stops resolving and the rope is
released, exactly as it is when an entity anchor dies.

Endpoints of type `self`, `target` and `position` are unaffected — they were never plot-space.

A block hit that resolves to a point further away than the raycast's own `distance` is thrown out
rather than anchored, so if a structure ever answers a ray in a way Apoli cannot map back to the
world, you get no rope instead of one stretched across the map.

### Ropes can drag the structure

[`apoli:rope_pull`](/docs/datapack/entity-actions/rope_pull) moves whichever end you name. When the
far end is a sub-level, `which: "other"` (or `"both"`) applies an impulse to that structure's rigid
body — at the block the rope is tied to, so a rope on the bow swings a ship around as well as
pulling it forward.

`speed` is scaled by the structure's own mass before the impulse is applied, so it reads the same
way it does on an entity: roughly the change in velocity you are asking for. A hundred-block
structure therefore needs a far larger shove than a pig does, which is the point. `sublevel_force`
multiplies that impulse if you want a specific rope to be stronger or weaker than its `speed`
implies.

```json
{
  "type": "apoli:rope_pull",
  "which": "both",
  "speed": 0.4,
  "sublevel_force": 2.0
}
```

The actor is pulled toward the structure and the structure toward the actor, which is what makes a
tether between a player and a ship feel like a tether rather than a leash.

### Phasing applies to assembled blocks

[`apoli:phasing`](/docs/datapack/powers/phasing) did not apply to assembled blocks. Everything
else — block conditions, [`apoli:action_on_block_use`](/docs/datapack/powers/action_on_block_use),
raycasts — already worked, because sub-level blocks are real blocks in the same world.

Vanilla collision asks a block for its shape *with* a collision context that names the colliding
entity, and that is the hook `apoli:phasing` uses to answer "empty" for the entities that may pass
through. Sable does not use vanilla's collision path: it runs its own oriented-bounding-box pass so
that a rotated structure collides correctly, and that pass asks for the block's shape **without a
collision context**. There was no entity in the question, so phasing never got a chance to answer.

With Sable installed, Apoli scopes the moving entity across its own movement and answers the
context-free question the same way it answers the vanilla one.

## What still differs on a sub-level

| Behaviour | On normal blocks | On sub-level blocks |
| --- | --- | --- |
| `block_condition` / `blacklist` filtering | Applies | Applies |
| `render_type` | Applies | Applies |
| `phase_down_condition` | Applies | **Ignored** — you always pass through |
| [`apoli:grab`](/docs/datapack/bientity-actions/grab) hold position | World space | World space — already correct |
| Rope endpoint | Fixed point | Tracked on the structure, follows it |
| [`apoli:rope_pull`](/docs/datapack/entity-actions/rope_pull) far end | Moves an entity | Applies a physics impulse to the structure |

[`apoli:grab`](/docs/datapack/bientity-actions/grab) needed no fix: it holds the grabbed entity at
an offset from the grabber's eyes, and entities standing on a sub-level already report world
positions. The one gap is that the grabbed entity is swept against *world* collision only, so it can
be dragged through an assembled hull — Sable's oriented-box pass is not consulted.

`phase_down_condition` exists to stop you sinking through the floor you are standing on, and it
decides that by comparing your height against the top of the block. A sub-level can be rotated to
any orientation, so "the top of the block" and "your height" are measured on different axes and the
comparison is meaningless. Apoli skips it there rather than guess.

If you want a power that phases through world blocks but not through a ship's hull, put the hull's
blocks behind a `block_condition` and use `blacklist`.

## Version note

Apoli hooks vanilla methods here, not Sable's, so it does not break when Sable changes internally —
but it only installs those hooks when Sable is present, so a world without Sable keeps the stock
collision path untouched.
