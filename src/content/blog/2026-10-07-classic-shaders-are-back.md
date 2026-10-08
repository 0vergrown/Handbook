---
title: "The classic shaders are back"
description: "Apoli 1.110.0 and Origins 1.47.2: the twenty post-processing shaders Minecraft removed work again on 1.21.1, apoli:punch no longer crashes when a ghast or a pig throws it, and model_color is cheaper and shows in the inventory under Fabulous! graphics."
date: 2026-10-07
author: Overgrown
---

Apoli **1.110.0** and Origins **1.47.2**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1.

## The classic shaders are back

Minecraft 1.21.1 dropped twenty of the old "Super Secret Settings" shaders — `art`, `bits`, `blobs`, `notch`, `pencil`, `sobel`, `wobble` and the rest. Apoli brings them back, so a [`apoli:shader`](/docs/datapack/powers/shader) power pointing at `minecraft:shaders/post/pencil.json` works on 1.21.1 exactly as it does on 1.20.1. The [shader page](/docs/datapack/powers/shader#built-in-shaders) lists every one you can use.

## apoli:punch from anything

[`apoli:punch`](/docs/datapack/bientity-actions/punch) crashed the server when the entity throwing it had no attack damage of its own — a ghast, a pig, an armor stand — which is easy to hit with an `apoli:invert` over a selector. Those entities now punch for the attribute's default of 2, plus whatever the item they punch with adds.

## model_color

[`apoli:model_color`](/docs/datapack/powers/model_color) now works out each entity's colours once per frame, and skips the work entirely for entities that don't have the power. A see-through player also shows up in the inventory screen with Fabulous! graphics, where it used to vanish.

## Origins

Buzzborne's flower tag no longer logs an error when the Flower Patch mod isn't installed.
