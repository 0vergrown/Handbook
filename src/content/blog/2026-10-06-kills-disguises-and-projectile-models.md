---
title: "Kills count, disguises match, bullets point forward"
description: "Apoli 1.109.1 and Origins 1.47.1: apoli:action_on_kill fires for every kill, a player disguised as another player takes their slim or wide arms, custom projectile models face where they fly, and model_color's alpha shows on the first-person arm."
date: 2026-10-06
author: Overgrown
---

Apoli **1.109.1** and Origins **1.47.1**. Four fixes, all on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Nothing in your data packs needs to change.

## apoli:action_on_kill fires for every kill

[`apoli:action_on_kill`](/docs/datapack/powers/action_on_kill) only fired when the entity you killed had a power of its own. Most mobs don't, so the example on its page — heal when you kill a skeleton — did nothing in a plain world. It fires for every kill now, whatever you killed, and that includes powers written under the legacy `self_action_on_kill` ID.

## Disguised players take the target's arms

A player disguised as another player with [`apoli:disguise_as`](/docs/datapack/entity-actions/disguise_as) or `/disguise player` already wore the target's skin, but kept their own arm model. A wide-armed player disguised as someone with a slim skin was drawn with wide arms, so the skin didn't line up. The disguise now uses the target's slim or wide model too: in third person, on your own first-person hand and in the inventory preview. It works in both directions.

## Custom projectile models face where they fly

A projectile wearing a geometry model from [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) faced the right way only when fired north or south. Fired east or west it flew backwards, pointing at whoever shot it, and fired diagonally it flew sideways. Projectiles now face their direction of travel in every direction, with or without Flywheel.

The side of the model that leads is the one Blockbench labels **north**. If you turned a model around to make up for the old behaviour, turn it back.

## model_color alpha in first person

[`apoli:model_color`](/docs/datapack/powers/model_color)'s `alpha` now shows on your own first-person arm, and it matches the rest of your body in third person: a 0.5 arm is half see-through, without the inside of the arm showing through it.
