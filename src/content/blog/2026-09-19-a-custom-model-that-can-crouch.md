---
title: "A custom model that can crouch"
description: "Apoli 1.91.0 makes custom_model_render hold its ground on top of Entity Model Features, so overlays and geometry stay attached to a Fresh Animations player through a sneak."
date: 2026-09-19
author: Overgrown
---

Apoli **1.91.0**. One fix, one small piece of housekeeping, and a new compat page for the mods that
replace the player model out from under you.

## Everything was fine until they shifted

The report: a player running [Fresh Animations' Player Extension](https://modrinth.com/mod/fresh-animations)
on top of [Entity Model Features](https://modrinth.com/mod/entity-model-features) had an
`apoli:custom_model_render` rig that tracked perfectly — until they held shift. Then the overlay skin,
the emissive eyes and the geometry all detached from the body at once and hung in mid-air at standing
height.

EMF animates a CEM model **during the render**: the first part that draws runs the pack's animation
expressions and writes the result onto the model's parts. It only does that once per pass, and it
decides "is this a new pass?" from a counter that EMF steps **once for every render layer** on the
entity.

`apoli:custom_model_render` is a render layer. Its `texture` mode draws the player model a second
time with your overlay texture on it, which means that second draw looked like a new pass and re-ran
the pack's animation from a pose that had already been animated.

For most poses that is invisible — run the same expressions on the same inputs, get the same answer.
Crouching is the exception, because that is where a pack has to work out what the player is *doing*.
Fresh Animations recognises a crouch by the exact numbers vanilla writes for one:

```
var.sneak2 = if(!is_gliding && body.rx==0.5 && body.ty==3.2 && head.ty==4.2, 1, 0)
```

After the first animation those three values are the pack's own crouch pose, not vanilla's. So the
second run decided the player was standing, unwound the entire crouch, and drew the overlay on the
standing pose — while the body underneath was still crouched. The geometry ran next, read the same
now-standing pose, and went with it. Hence "textures and models, everything, all at once".

Apoli now holds EMF's animation for the length of any extra draw it makes of a model it does not own.
The overlay is drawn onto exactly the pose the body was drawn with, and the geometry reads that same
pose afterwards. The pack animates once per frame, as it expects to.

This is not specific to crouching or to the player — any CEM animation with a self-referential or
smoothed variable was being stepped twice a frame under a texture overlay. Fresh Animations' mob
animations included.

## The reference pose is vanilla's again

`geometry` mode poses a bone by measuring its body part against a rest pose and applying the
difference. That rest pose was baked through the game's model set, which is exactly the call EMF
intercepts — so with a CEM pack installed, Apoli was asking EMF to build it a second, entirely
unnecessary copy of the pack's player model, mid-render, just to read seven numbers off it.

It now builds the vanilla player mesh directly. Same numbers, no detour, and one less way for two
mods to trip over each other's static state.

## New page: Custom Entity Models

[The compat section](/docs/compat/custom-entity-models) has a page for EMF and ETF now: what follows
what, and the two authoring notes worth having in front of you before you build a rig for an animated
player — the pivot rule matters *more* under a pack with a wider range of motion, and a power that
re-poses the body or the head can change what the pack thinks the player is doing.
