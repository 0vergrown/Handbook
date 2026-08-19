---
title: Sable
description: How apoli:phasing and ropes behave on blocks that Sable has assembled into a moving sub-level.
---

[Sable](https://github.com/ryanhcode/sable) turns a region of blocks into a **sub-level**: the
blocks keep living in the world, in a reserved chunk region called a *plot*, and Sable renders
and collides them wherever the structure has moved and rotated to.

Apoli registers **no types** for Sable. This compat is **behaviour-gated** — it is applied
automatically when Sable is installed, and nothing changes when it is not.

## What it fixes

### Ropes anchor to the structure

[`apoli:attach_rope`](/docs/datapack/entity-actions/attach_rope) resolves a `raycast` endpoint by
firing a ray and keeping the point it hit. Sable answers that ray in the sub-level's **own**
coordinates — the plot's, not the world's — so the anchor used to be stored tens of thousands of
blocks away in the reserved plot region, and the rope was drawn stretching off to nowhere.

An endpoint that lands on a sub-level is now stored as *(which sub-level, where on it)* and
converted back to a world position every tick, on both the server and the client. The result is a
rope that stays welded to the block it hit: swing off a moving airship and you move with it, and the
rope's length constraint, its `break_beyond` distance and its rendering all use the tracked
position. When the sub-level is unloaded or disassembled the anchor stops resolving and the rope is
released, exactly as it is when an entity anchor dies.

Endpoints of type `self`, `target` and `position` are unaffected — they were never plot-space.

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
