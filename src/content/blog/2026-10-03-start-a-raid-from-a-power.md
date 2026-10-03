---
title: "Start a raid from a power"
description: "Apoli 1.108.0 and Origins 1.46.14: a new apoli:start_raid entity action that calls a raid down on a village and credits it to whoever started it."
date: 2026-10-03
author: Overgrown
---

Apoli **1.108.0** and Origins **1.46.14**. Origins has no changes of its own this time; it is built against the new Apoli.

## apoli:start_raid

[`apoli:start_raid`](/docs/datapack/entity-actions/start_raid) starts a raid on the village the entity is standing in, as if it had walked in carrying an omen. `omen_level` sets how strong the raid is, from `1` to `5`, and takes an expression, so the level can come from a resource. If a raid is already running there, it absorbs the omen and grows instead, the same way a second omen would.

The raid is credited to whoever started it. A player gets the *Raids Triggered* statistic and fires the `minecraft:voluntary_exile` advancement trigger, exactly as if their own omen had started it. Mobs, armor stands and markers can run it too, so a data pack can start a raid from any spot in a village.

Raids still need a village. Outside one, or on Peaceful, with `disableRaids` on, or in a dimension without raids, nothing happens and the new `fail_action` runs instead, so a power can tell the player why. `success_action` runs when a raid starts or grows.

```json
{
    "type": "apoli:start_raid",
    "omen_level": 3,
    "success_action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:event.raid.horn",
        "volume": 4.0
    }
}
```

## A missing page

[`apoli:modify_use_slowdown`](/docs/datapack/powers/modify_use_slowdown), which changes how much raising a shield, drawing a bow or eating slows you down, has been in Apoli for a while without a page in the Handbook. It has one now.
