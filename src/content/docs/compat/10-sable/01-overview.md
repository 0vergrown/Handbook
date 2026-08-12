---
title: Sable
description: How apoli:phasing behaves on blocks that Sable has assembled into a moving sub-level.
---

[Sable](https://github.com/ryanhcode/sable) turns a region of blocks into a **sub-level**: the
blocks keep living in the world, in a reserved chunk region called a *plot*, and Sable renders
and collides them wherever the structure has moved and rotated to.

Apoli registers **no types** for Sable. This compat is **behaviour-gated** — it is applied
automatically when Sable is installed, and nothing changes when it is not.

## What it fixes

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
