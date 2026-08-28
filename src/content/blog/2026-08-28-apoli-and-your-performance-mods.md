---
title: "Apoli and your performance mods"
description: Sodium was quietly eating apoli:modify_block_render, Sodium Extra could out-vote a phasing power's fog, and animated particle textures never animated. Apoli 1.48.0 fixes all three and makes the render hooks nearly free when nobody is using them.
date: 2026-08-28
author: Overgrown
---

Almost every server and singleplayer world Apoli runs in has a performance mod in it — Sodium or one
of its forks, Lithium, EntityCulling, ImmediatelyFast, FerriteCore. Those mods work by replacing the
exact parts of the client Apoli's render powers hook into, and that is a problem in both directions:
a power can quietly stop doing anything, and a hook that runs per block or per entity per frame can
undo the speed the player installed the mod for.

Apoli 1.48.0 is about both halves of that. There is also a real bug fix for animated particle
textures, which is where I will start, because it is the one somebody reported.

## Animated particle textures now animate

`apoli:custom` builds a particle out of a texture you ship yourself. It has always had `frames` and
`frame_time` for a sprite strip, but you had to know the frame count and write it, the strip had to
be vertical, and the game's own animation metadata — the `.png.mcmeta` next to every animated block
and item texture — was ignored completely.

So the obvious thing did not work:

```json
{
  "type": "apoli:custom",
  "texture": "minecraft:textures/block/fire_0.png",
  "lifetime": 32
}
```

`fire_0.png` is a 32-frame animation. Apoli drew all 32 frames squashed into one quad.

Now it reads the `.mcmeta`. Frame count, frame order and `frametime` all come from the texture, so
that snippet animates fire exactly the way a fire block does. This matters more than it sounds:
`fire_0.png`'s metadata does not run its frames in file order, it runs `16…31` and then `0…15`, so
even a hand-written `"frames": 32` was playing the animation from the middle.

Textures **without** an `.mcmeta` still work the old way, and gained some room:

```json
{
  "type": "apoli:custom",
  "texture": "example:textures/particle/spark.png",
  "frames": 4,
  "frame_time": 2,
  "loop_frames": true
}
```

`frame_layout` picks between a vertical strip, a horizontal one and a grid, and `auto` — the default
— works it out from the image. `frames: 1` still pins a texture to a single frame if you want a
non-square sprite drawn whole.

The one behaviour change: leaving `loop_frames` out now means "do what the texture says". An
animation that came from an `.mcmeta` loops, because that is what the person who drew it intended. A
hand-numbered strip still holds its last frame.

## Sodium was eating `apoli:modify_block_render`

`apoli:modify_block_render` makes one block render as another for the player holding the power —
stone as glass, that sort of thing. It worked by hooking the object vanilla reads block states from
while it builds a chunk mesh.

Sodium does not use that object. It copies each chunk section into its own reader and meshes from
there, on worker threads. So with Sodium installed — or Rubidium, or Embeddium, which are ports of
it — the power did nothing at all, silently, which is the worst way for something to be broken.

Apoli now hooks Sodium's reader too, and only when Sodium is present. The power behaves the same
either way.

While I was in there I found a second half of the same bug that had nothing to do with Sodium:
nothing ever told the game to rebuild the chunks. Granting the power did not make blocks change; you
had to walk far enough away and back, or break a block nearby, before the chunk happened to rebuild
for another reason. Now granting it, revoking it, or its `block_condition` flipping schedules the
rebuild itself.

## Sodium Extra could out-vote a fog power

Two Apoli powers set fog: `apoli:fluid_vision`, and `apoli:phasing` with `"render_type": "blindness"`.
Sodium Extra also sets fog, at the end of the same method, for its fog-distance slider. Which one the
player actually saw came down to mod load order.

Apoli's fog hooks now run last on purpose, so the power wins where the two disagree and Sodium
Extra's setting governs everything else.

Its **Prevent Shaders** option is a different story: it blocks every post-processing shader the game
loads, `apoli:shader` included, and there is no honest way for Apoli to sneak past a setting the
player turned on deliberately. What Apoli does now is say so — a shader that fails to load logs a
warning naming both possible causes instead of failing silently.

## The other direction: making the hooks cheap

The mods above are installed to make frames cheaper. A render power that hooks `shouldRender` or a
chunk mesher and then does real work per call is spending exactly what they saved.

Every render hook now reads a single flag first, refreshed once a tick from the powers you actually
hold. If nobody has `prevent_entity_render`, the per-entity check is a field read. If nobody has
`modify_block_render`, the hook inside Sodium's mesher is an array-length check. That is what makes
it defensible to sit in that loop at all.

A few more, in the same spirit:

- **The client cached nothing.** Every power lookup on a rendered entity allocated a fresh container
  object and then scanned all of that entity's powers to find the ones of the type it wanted — per
  entity, per frame, for glow, model colour, feature hiding and the rest. Containers are cached and
  indexed by type now, the same way the server side already was.
- **It also never let go.** Client-side power data was keyed by entity id and never removed, so a
  long session on a busy server accumulated the powers of every mob that had ever been in range.
  Entity data is dropped when the entity unloads.
- **Particles resolved themselves every time.** `apoli:particle` re-parsed its particle definition
  from JSON on every fire, for every entity holding it. It parses once now.
- **Particle broadcasts skipped the cheap test.** The particle power tested its `bientity_condition`
  against every player on the server before the range check the game does anyway, and built one
  network packet per recipient. Range first, one packet for everyone.

None of that changes what a pack does. It changes what it costs.

## What needs nothing

Worth saying plainly, because "add compat for X" is a fair question to ask: **EntityCulling,
ImmediatelyFast and FerriteCore need no integration and never did.**

EntityCulling skips entities behind walls at a point in the frame *after* Apoli has already decided
whether to render one, so a hidden entity costs less, not more. ImmediatelyFast batches HUD drawing,
and Apoli's bars, overlays and badges already go through `GuiGraphics` without forcing a flush, so
they batch like anything else. FerriteCore is about the memory layout of block states and models and
touches nothing Apoli hooks — the leak fixed above is the closest thing to a FerriteCore-shaped
problem in Apoli, and it was Apoli's own.

Lithium is server-side, and the one thing worth checking — whether its rewritten collision sweeper
still asks blocks for their shape the normal way, which is how `apoli:phasing` works — it does.

There is a page for all of this under **Compat → Performance Mods**, so the next person asking "does
Apoli work with Sodium" has somewhere to look.
