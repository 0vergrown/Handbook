---
title: "Powers on projectiles, and a lifetime for every shot"
description: "Apoli 1.106.0 and Origins 1.46.11: apoli:grant_power works on entities that held no powers, projectiles wear every model they are given, max_distance counts the path flown, a new lifetime field, and frozen entities still flinch."
date: 2026-10-02
author: Overgrown
---

Apoli **1.106.0** and Origins **1.46.11**. Origins has no changes of its own this time; it is built against the new Apoli.

## grant_power on a fresh projectile

[`apoli:grant_power`](/docs/datapack/entity-actions/grant_power) only worked on entities that already held at least one power. A projectile fresh out of [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile), an item or a mob that had never had a power was skipped without a word, so a `projectile_action` that granted a model, a particle trail or a marker power did nothing at all. The projectile flew as its flat `texture_location` sprite, with no trail, and a marker checked on impact was never there.

Every entity can receive powers now. The same fix covers [`apoli:grant_all_powers`](/docs/datapack/entity-actions/grant_all_powers), the receiving side of [`apoli:transfer`](/docs/datapack/bientity-actions/transfer), and the KubeJS `grantPower` helper.

## Projectiles wear every model

A projectile carried only the first geometry [`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) power it held. Give it a body and a glowing-eyes layer, and it drew only one of them. It now draws every geometry power it holds when fired.

## max_distance counts the path, and lifetime is new

`max_distance` on `apoli:fire_projectile` was measured as a straight line from where the shot started. A homing projectile curling round its target, or a ball bouncing around a small room, could therefore fly forever without ever getting far enough away. It is now the distance actually travelled along the path, which is what the field always said it was. A bouncing or homing shot with a `max_distance` now ends sooner than it did.

`lifetime` is the new backstop: the projectile is removed after that many ticks in the air whatever it is doing, running `bientity_action_on_expire` first. Without gravity, a slow shot under water would otherwise hang where it stopped.

```json
"max_distance": 12,
"lifetime": 100
```

## Frozen entities still flinch

An entity frozen with [`apoli:tick_rate`](/docs/datapack/entity-actions/tick_rate) or [`apoli:modify_tick_rate`](/docs/datapack/powers/modify_tick_rate) used to keep its red hurt tint for as long as it stayed frozen, since nothing counted the flash down. The flash now fades on screen as usual. Its half-second immunity after a hit still does not count down while it is frozen, and the [tick-rate pages](/docs/datapack/powers/modify_tick_rate#riding) explain what that means for damage.

## Worth knowing

These are not changes, but each of them cost a data pack an afternoon, so they are now spelled out on the pages:

- **A grant's source should not be an `apoli:multiple` id.** A multiple keeps everything held under its own id equal to its `sub_powers`. Anything else granted under that id is revoked again within a tick. See [Choosing a source](/docs/datapack/entity-actions/grant_power#choosing-a-source).
- **The bi-entity [`apoli:modify_resource`](/docs/datapack/bientity-actions/modify_resource)'s `from_side` only redirects `from`.** An Expression in `value` reads the entity being written. Use `actor_resource(...)` or `target_resource(...)` to read the other one.
- **Damage that has to land on a frozen entity** needs a damage type in `#minecraft:bypasses_cooldown`.
