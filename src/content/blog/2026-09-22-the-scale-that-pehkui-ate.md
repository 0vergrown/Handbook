---
title: "The scale that Pehkui ate"
description: "Apoli 1.94.1: apoli:scale with more than one scale_type only applied the first one when Pehkui was installed, because the hand-off to Pehkui sat behind a hitbox check that model scales never trigger."
date: 2026-09-22
author: Overgrown
---

This is Apoli 1.94.1, and a bug report that looked impossible for about two hours and turned out to be one line in the wrong place.

## The report

```json
"projectile_action": {
    "type": "apoli:scale",
    "scale_types": [
        "apoli:model_height",
        "apoli:model_width"
    ],
    "operation": "set",
    "scale": 5
}
```

Only the first entry applied. Swap the order and the other one applies instead. Both work on their own, and splitting it into two separate `apoli:scale` actions changed nothing.

Every stage on the server checked out. The codec parses both IDs, which I checked against a standalone harness on the same `Codec.either(type, type.listOf())` shape. The action's loop writes both, which I checked with a probe data pack reading `data get entity <projectile> scales`. And the value the renderer actually uses was right too: `/apoli:scale get` returns the resolved number as its command result, so `execute store result score` could check it, and it read 5 for both types.

The pipeline was correct from end to end, and the size on screen still wasn't.

## The missing detail

Pehkui was installed. Remove it and the problem goes away.

When Pehkui is present, Apoli stands down: `Scales.applied(...)` returns `1` and Apoli renders nothing of its own, handing its values to Pehkui instead, so the two mods agree on one size instead of multiplying each other. That means that under Pehkui, what Apoli pushes is exactly what you see, and Apoli was pushing only half of it.

Here's the line:

```java
float width  = value(entity, HITBOX_WIDTH);
float height = value(entity, HITBOX_HEIGHT);
if (!state.dimensionsChanged(width, height)) return;
if (PehkuiBridge.ownsGeometry()) push(entity); else entity.refreshDimensions();
```

Once that early return fires, nothing below it runs. The check exists so vanilla doesn't recompute an entity's bounding box when nothing about the bounding box changed, which is perfectly reasonable for the vanilla branch. But the Pehkui push was sitting behind it, and `model_width` and `model_height` are registered without `affectsDimensions`, so they never move the hitbox:

| Call | The check | Result |
| --- | --- | --- |
| `set(model_height, 5)` runs `onChanged` | `dimensionsChanged(1, 1)` is true, since it starts at NaN | Pehkui gets a height of 5 |
| `set(model_width, 5)` runs `onChanged` | `dimensionsChanged(1, 1)` is false | The push never runs |

The first one in wins, forever. It explains the test with two actions too, since the second action hits exactly the same early return.

## The fix

The hand-off to Pehkui no longer asks about the hitbox at all. It asks whether the scales changed:

```java
if (PehkuiBridge.ownsGeometry()) {
    PehkuiBridge.push(entity, state);
    return;
}
```

`push` resolves the entity's own values once (they're cached) and compares them against a snapshot of what it last sent, a comparison of nineteen floats. The reflective calls into Pehkui only happen when a number actually moved, so the path that runs every tick stays cheap, and it now catches changes the hitbox check never could: an `apoli:scale` power whose factor is an expression, `third_person`, `visibility`, `attack`, and anything else that isn't the bounding box.

I checked it by dropping Pehkui into the dev server and reading the result with Pehkui's own command, which is the honest place to read it from. `/scale get <type> <entity> <scalingFactor>` returns `baseScale × factor` as its result, so a probe can store it into a scoreboard. Before the fix it read `model_height 5` and `model_width 1`. After it, both read 5, from the list form and from two separate actions.

## While I was in there: 1.94.0

`apoli:scale` used to write each type with its own call, and every one of those sent a full state sync. Four scale types meant four packets, each carrying the whole state, the first three being partial snapshots of it. It's now a single `setAll`: one state resolve, every type written, one packet.

That change alone already fixes the list form, since it fires the update once while the old check was still open. It doesn't fix the case with two actions, the case of a power driven by an expression or any of the others, which is why both changes are in.

Nothing about the data pack side changed. `scale_types` has always taken a list. Both [the action](/docs/datapack/entity-actions/scale) and [the power](/docs/datapack/powers/scale) now show an example with several types, because neither of them did, and that's probably where the doubt started.

