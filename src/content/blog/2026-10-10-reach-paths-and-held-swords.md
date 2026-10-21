---
title: "Draw a path for a reach, and keep the sword in your hand"
description: "Apoli 1.115.0: reach keyframes can carry points, first person reaches line up with third person, and a reaching hand holds its item."
date: 2026-10-10
author: Overgrown
---

This is Apoli 1.115.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1, with Origins 1.47.7 built against it.

## Draw a path with keyframes

Keyframes on a `reach` could only blend it in and out, so the hand always went to the same point. Each keyframe can now carry its own `target`, and the hand follows the points in order. `catmullrom` easing bends them into a smooth curve, which is enough to animate a sword slash, a wave or a wind-up from one transformation. Points and values are separate tracks, so a reach can still fade in on its own schedule while its point moves. [Drawing a path](/docs/datapack/data-types/model-part-transformation#drawing-a-path) has a horizontal slash to start from.

## Hands meet in first person too

Each first person arm read `target` through its own view, so two arms reaching for one point crossed over and missed each other on screen. A first person reach now measures `target` from the shoulders Minecraft draws, in the frame of the third person body. Both hands land on the same point, the arms keep about their third person length, and the hands turn the way they do in third person. [Reaching in first person](/docs/datapack/data-types/model-part-transformation#reaching-in-first-person) shows which targets end up on screen. A first person reach you tuned by eye on 1.113 or 1.114 will land somewhere new, so check it against that guide.

## A reaching hand holds its item

In first person, the item in a reaching hand stayed where Minecraft normally draws it, away from the hand. It now sits in the hand, gripped the way it is in third person, so a sword follows the reach. While you use the item (eating, drawing a bow or blocking), it goes back to its usual place. Arms edited in other ways are still drawn beside the item.

## Docs fix

The [Held items](/docs/datapack/data-types/model-part-transformation#held-items) section said a positive `pitch` tips a held sword towards the ground. It tips it up, and a negative `pitch` tips it down.
