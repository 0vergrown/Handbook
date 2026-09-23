---
title: "The scale that Pehkui ate"
description: "Apoli 1.94.1: apoli:scale with more than one scale_type only applied the first one when Pehkui was installed, because the hand-off to Pehkui was gated behind a hitbox change that model scales never trigger."
date: 2026-09-22
author: Overgrown
---

Apoli **1.94.1**. A bug report that looked impossible for about two hours, and turned out to be one
line in the wrong place.

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

Only the **first** entry applied. Swap the order and the other one applies instead. Both work on their
own. Splitting it into two separate `apoli:scale` actions changed nothing.

Every server-side stage checked out. The codec parses both ids — verified against a standalone harness
on the same `Codec.either(type, type.listOf())` shape. The action's loop writes both — verified with a
probe datapack reading `data get entity <projectile> scales`. And the value the renderer actually
consumes was right too: `/apoli:scale get` returns the resolved number as its command result, so
`execute store result score` could assert it, and it read 5 for *both* types.

The pipeline was correct from end to end. The size on screen still wasn't.

## The missing detail

**Pehkui was installed.** Remove it and the problem goes away.

When Pehkui is present Apoli stands down: `Scales.applied(...)` returns `1` and Apoli renders nothing of
its own, handing its values to Pehkui instead so the two mods agree on one size rather than multiplying
each other. Which means, under Pehkui, *what Apoli pushed is exactly what you see* — and Apoli was
pushing only half of it.

Here is the line:

```java
float width  = value(entity, HITBOX_WIDTH);
float height = value(entity, HITBOX_HEIGHT);
if (!state.dimensionsChanged(width, height)) return;   // ← everything below is now unreachable
if (PehkuiBridge.ownsGeometry()) push(entity); else entity.refreshDimensions();
```

That guard exists so vanilla doesn't recompute an entity's bounding box when nothing about the bounding
box changed. Perfectly reasonable — for the vanilla branch. But the **Pehkui push was sitting behind
it**, and `model_width` and `model_height` are registered *without* `affectsDimensions`. They never move
the hitbox. So:

| | | |
|---|---|---|
| `set(model_height, 5)` → `onChanged` | `dimensionsChanged(1, 1)` → **true** (it starts at NaN) | Pehkui gets height 5 |
| `set(model_width, 5)` → `onChanged` | `dimensionsChanged(1, 1)` → **false** | push never runs |

First one in wins, forever. And it explains the split-action test too: the second action hits exactly
the same early-out.

## The fix

The Pehkui hand-off no longer asks about the hitbox at all — it asks whether the **scales** changed:

```java
if (PehkuiBridge.ownsGeometry()) {
    PehkuiBridge.push(entity, state);
    return;
}
```

`push` resolves the entity's own values once (they're cached) and compares them against a snapshot of
what it last sent — a nineteen-float comparison. The reflective calls into Pehkui only happen when a
number actually moved, so the per-tick path stays cheap, and it now catches changes the hitbox guard
never could: a `apoli:scale` power whose factor is an expression, `third_person`, `visibility`, `attack`
— anything that isn't the bounding box.

Verified by dropping Pehkui into the dev server and asserting with Pehkui's *own* command, which is the
honest place to read it from: `/scale get <type> <entity> <scalingFactor>` returns `baseScale × factor`
as its result, so a probe can store it into a scoreboard. Before the fix: `model_height 5`,
`model_width 1`. After: both 5 — from the list form and from two separate actions.

## While I was in there — 1.94.0

`apoli:scale` used to write each type with its own call, and every one of those ran a full-state sync
broadcast. Four scale types meant four packets, each carrying the whole state, the first three being
partial snapshots of it. It's now a single `setAll` — one state resolve, every type written, one packet.

That change alone already fixes the list form, since it fires the update once while the old guard was
still open. It does **not** fix the split-action case, the expression-driven power case, or any of the
others — which is why both changes are in.

Nothing about the data pack side changed. `scale_types` has always taken a list; both
[the action](/docs/datapack/entity-actions/scale) and [the power](/docs/datapack/powers/scale) now show
a multi-type example, because neither of them did, and that is probably where the doubt started.
