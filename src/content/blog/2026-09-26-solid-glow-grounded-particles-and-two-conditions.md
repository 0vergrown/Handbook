---
title: "Solid glow, grounded particles and two new conditions"
description: "Apoli 1.100.0 and Origins 1.46.2: glowing geometry hides the water behind it, custom particles land instead of sinking, a raycast bi-entity condition with beams and cones, and grabbed conditions."
date: 2026-09-26
author: Overgrown
---

Apoli **1.100.0** and Origins **1.46.2**.

## Glowing models stay solid

A [`custom_model_render`](/docs/datapack/powers/custom_model_render) in geometry mode with an `emissive`, `glow` or `eyes` [render type](/docs/datapack/data-types/render-type) used to let water show through it: those styles are made for glowing layers on top of a model and never marked where they were drawn, so the water, drawn later, painted straight over the model. Standalone geometry now blocks what is behind it like any solid model, and keeps its full-bright look.

## Particles land

[Custom particles](/docs/datapack/data-types/custom-particle) now collide with blocks unless you set `"physics": false`. They used to fall through the floor by default, and even with physics on, a large one sank half into the ground because it collided from the middle of its sprite. A particle now rests on the bottom edge of its sprite.

## Is the target in my aim?

[`apoli:raycast`](/docs/datapack/bientity-conditions/raycast) is now a bi-entity condition too: does the actor's ray reach the target? `radius` turns it into a beam and `cone_angle` into a cone, and walls block it unless `block` is `false`. The raycast action and the condition share the same beam and cone checks, so they agree about which targets count.

## Grabbed

[`apoli:grabbed`](/docs/datapack/entity-conditions/grabbed) checks whether an entity is being held by an `apoli:grab`, and its [bi-entity form](/docs/datapack/bientity-conditions/grabbed) whether the actor is the one holding the target.

## Compatibility

Origins 1.46.2 needs Apoli 1.100.0 or newer. Custom particles that should pass through blocks need `"physics": false` now.
