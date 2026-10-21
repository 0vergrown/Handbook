---
title: Sable
description: "How apoli:phasing, apoli:walk_on_fluid and ropes behave with Sable installed."
---

[Sable](https://github.com/ryanhcode/sable) turns a region of blocks into a sub-level. The blocks keep living in the world, in a reserved chunk region called a plot, and Sable renders and collides them wherever the structure has moved and rotated to.

Apoli registers no types for Sable. This compat is behaviour-gated: it is applied automatically when Sable is installed, and nothing changes when it isn't. Sable ships for both Fabric and NeoForge on 1.21.1, and so does this integration. It is the same code in both builds, and reaches Sable through its public API instead of anything specific to a loader.

## What it fixes

### Ropes anchor to the structure

[`apoli:attach_rope`](/docs/datapack/entity-actions/attach_rope) resolves a `raycast` endpoint by firing a ray and keeping the point it hit. Sable answers that ray in the sub-level's own coordinates, the plot's and not the world's, so a raw hit point would land tens of thousands of blocks away in the reserved plot region, with the rope stretching off to nowhere.

An endpoint that lands on a sub-level is instead stored as which sub-level it hit and where on it, and converted back to a world position every tick, on both the server and the client. The result is a rope that stays fixed to the block it hit: swing off a moving airship and you move with it, and the rope's length limit, its `break_beyond` distance and its rendering all use the tracked position. When the sub-level is unloaded or taken apart, the anchor stops resolving and the rope is released, exactly as when an entity anchor dies.

Endpoints of type `self`, `target` and `position` are unaffected, since they are never in plot space.

A block hit that resolves to a point further away than the raycast's own `distance` is thrown out instead of anchored. If a structure ever answers a ray in a way Apoli can't map back to the world, you get no rope instead of one stretched across the map.

### Ropes can drag the structure

[`apoli:rope_pull`](/docs/datapack/entity-actions/rope_pull) moves whichever end you name. When the far end is a sub-level, `which: "other"` (or `"both"`) applies an impulse to that structure's rigid body at the block the rope is tied to, so a rope on the bow swings a ship around as well as pulling it forward.

`speed` is scaled by the structure's own mass before the impulse is applied, so it reads the same way it does on an entity, roughly as the change in velocity you are asking for. A structure of a hundred blocks therefore needs a far larger shove than a pig does, which is the point. `sublevel_force` multiplies that impulse if you want a particular rope to be stronger or weaker than its `speed` implies.

```json
{
  "type": "apoli:rope_pull",
  "which": "both",
  "speed": 0.4,
  "sublevel_force": 2.0
}
```

The actor is pulled toward the structure and the structure toward the actor, which makes a tether between a player and a ship feel like a tether instead of a leash.

### Phasing applies to assembled blocks

Without this hook, [`apoli:phasing`](/docs/datapack/powers/phasing) wouldn't apply to assembled blocks. Everything else, such as block conditions, [`apoli:action_on_block_use`](/docs/datapack/powers/action_on_block_use) and raycasts, works anyway, because sub-level blocks are real blocks in the same world.

Vanilla collision asks a block for its shape with a collision context that names the colliding entity, and that is the hook `apoli:phasing` uses to answer "empty" for the entities that may pass through. Sable doesn't use vanilla's collision path. It runs its own pass with oriented bounding boxes so that a rotated structure collides correctly, and that pass asks for the block's shape without a collision context. With no entity in the question, phasing would never get a chance to answer.

With Sable installed, Apoli tracks the moving entity across its own movement and answers the question without a context the same way it answers the vanilla one.

### Walking on fluid still holds you up

[`apoli:walk_on_fluid`](/docs/datapack/powers/walk_on_fluid) doesn't add a shape of its own. It answers a question vanilla asks the fluid block, whether the colliding entity can stand on this fluid, and a source block that hears "yes" hands back a solid top surface to walk on.

Sable replaces vanilla's collision context for every entity in the world, including those far from any assembled structure, and its version reads the fluid above the block where vanilla reads the block's own fluid. An ocean surface has air above it, so the answer comes back "no" and the surface stops existing. That is worse than falling in: `walk_on_fluid` also puts the holder on land movement instead of swimming, so they would sink to the seabed and couldn't swim back up.

With Sable installed, Apoli asks the question again the vanilla way whenever a source fluid block would otherwise return nothing, and the surface is solid again. The same hook fixes anything else that stands on fluid, such as striders on lava.

## What still differs on a sub-level

| Behaviour | On normal blocks | On sub-level blocks |
| --- | --- | --- |
| `block_condition` and `blacklist` filtering | Applies | Applies |
| `render_type` | Applies | Applies |
| `phase_down_condition` | Applies | Ignored, so you always pass through |
| [`apoli:grab`](/docs/datapack/bientity-actions/grab) hold position | World space | World space, which is already correct |
| Rope endpoint | A fixed point | Tracked on the structure, and follows it |
| [`apoli:rope_pull`](/docs/datapack/entity-actions/rope_pull) far end | Moves an entity | Applies a physics impulse to the structure |

[`apoli:grab`](/docs/datapack/bientity-actions/grab) needs no fix. It holds the grabbed entity at an offset from the grabber's eyes, and entities standing on a sub-level already report world positions. The one gap is that the grabbed entity is only swept against world collision, so it can be dragged through an assembled hull, since Sable's own collision pass isn't consulted.

`phase_down_condition` exists to stop you sinking through the floor you are standing on, and it decides that by comparing your height with the top of the block. A sub-level can be rotated to any orientation, so the top of the block and your height are measured on different axes and the comparison means nothing. Apoli skips it there instead of guessing.

If you want a power that phases through world blocks but not through a ship's hull, put the hull's blocks behind a `block_condition` and use `blacklist`.

## Version note

Apoli hooks vanilla methods here, not Sable's, so it doesn't break when Sable changes internally. It only installs those hooks when Sable is present, so a world without Sable keeps the normal collision path untouched.
