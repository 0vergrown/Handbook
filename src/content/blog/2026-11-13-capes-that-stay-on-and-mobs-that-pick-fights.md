---
title: "Capes that stay on, and mobs that pick fights"
description: "Apoli 1.132.0: capes and elytras follow modify_model_parts, aggro_at sets any mob on any living entity, and raycast cones hit what you look at up close."
date: 2026-11-13
author: Overgrown
---

This is Apoli 1.132.0, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Origins 1.52.0 works with it as it is, and nothing changed on the network, so 1.132 and 1.131 can play together.

All three changes came out of testing the new airbending paths in Elemental Bendings.

## Capes that stay on

Spiritual airbenders can fly now, and the flight leans the whole body forward with [`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts). Anyone wearing a cape got a nasty surprise: the body tipped forward and the cape stayed upright, hanging in the air where the back used to be.

Vanilla never draws the cape as part of the body. It hangs it from a fixed spot behind the shoulders and only bends it for crouching and walking. Since the power moves each body part on its own, nothing told the cape that the body had gone anywhere. Now Apoli remembers where vanilla left the body before the power touched it, and moves the cape by exactly the difference, so it follows any lean, turn or move. The elytra gets the same treatment, because it hangs from the same spot.

## Mobs that pick fights

The sound bubble in soundbending traps a growl and throws it at a creature, and every hostile mob nearby should turn on whatever it hit. [`apoli:aggro_at`](/docs/datapack/bientity-actions/aggro_at) sounds like the right tool, but it only worked for a neutral mob angry at a player. The pack faked it with a punch from the victim, which hurt the mobs it was meant to lure.

So `aggro_at` now takes any mob as the target and any living entity as the actor. A neutral mob angry at a player still holds the timed grudge it always did. Every other mob turns on the actor straight away, as if the actor had just hit it, which is also why it keeps that target instead of wandering back to the nearest player. Piglins, hoglins and the other mobs that think in memories store the actor as their attack target for `duration` ticks.

```json
{
    "type": "apoli:area_of_effect",
    "radius": 10,
    "bientity_action": {
        "type": "apoli:aggro_at",
        "duration": 200
    }
}
```

Run that on a creature and every mob within 10 blocks goes after it for ten seconds.

## Cones that hit what you look at

Fire breath in Elemental Bendings uses the `cone_angle` of [`apoli:raycast`](/docs/datapack/entity-actions/raycast), and it kept missing creatures right in front of the player. The cone only looked at the middle of each hitbox. Stand next to a zombie and look at its head, and its middle sits more than twenty degrees below your aim, well outside an eleven degree cone.

A creature now counts when any part of its hitbox is inside the cone, or when your aim passes straight through it. The [`raycast` bi-entity condition](/docs/datapack/bientity-conditions/raycast) shares the same test, so it changed with it.
