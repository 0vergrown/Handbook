---
title: "Layered sounds, pickup powers that fire, and attributes in expressions"
description: "Apoli 1.118.1: replace: false layers sounds again, action_on_item_pickup and prevent_item_pickup work for players and mobs, prevent_sleep respects set_spawn_point, model_color takes expressions, and expressions can read attributes."
date: 2026-10-20
author: Overgrown
---

This is Apoli 1.118.1, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Update the client and the server together.

## Layered sounds

[`replace_sound_emission`](/docs/datapack/powers/replace_sound_emission) and [`replace_sound_reception`](/docs/datapack/powers/replace_sound_reception) with `"replace": false` now do what the field says: the original sound plays and the replacement plays on top of it. They were swallowing the original instead, so a power meant to layer a chime over every sound left only the chime. This holds for the sounds the holder hears from itself and for everyone around it.

When it layers over something a player hears, the original keeps playing exactly as before, looping sounds included, and the layered sound plays once.

## Pickup powers

[`action_on_item_pickup`](/docs/datapack/powers/action_on_item_pickup) and [`prevent_item_pickup`](/docs/datapack/powers/prevent_item_pickup) now run, for players and for mobs that pick up loot. Until now, neither did anything at all.

- `item_action` changes the item just before it enters the inventory, so it lands already changed. On a player, it only runs when the item fits.
- `bientity_action` runs once the item is in. The actor is whoever threw the item, and drops and broken blocks have no thrower, so act on the picker with `apoli:target_action`.
- `action_on_item_pickup` gains a `priority` field, and when an entity has several, higher priorities run first.
- `prevent_item_pickup` leaves the item on the ground and runs its actions on every attempt to pick it up.

## Beds and spawn points

[`prevent_sleep`](/docs/datapack/powers/prevent_sleep) with `"set_spawn_point": false` now leaves the spawn point alone. The bed check used to run only after the game had already moved the spawn to the bed. It now runs at the moment the spawn would be set, so a bed the power refuses doesn't touch the spawn, and `"set_spawn_point": true` sets it without letting the player sleep. The power's message also takes the place of "You can only sleep at night" and the warning about monsters nearby.

## Attributes in expressions

[Expressions](/docs/datapack/data-types/expression#attributes) can read attributes, with the same numbers as the `/attribute` command:

```json
"amount": "attribute[minecraft:generic.max_health] - attribute[minecraft:generic.max_health, base]"
```

After the ID comes what to read: `get` (the default) for the value with every modifier applied, `base`, `default`, `min`, `max`, `has`, or one modifier with `modifier, <id>` and `has_modifier, <id>`. `target_attribute[...]` and `actor_attribute[...]` read the other entity in a bi-entity action. A mistyped attribute ID is a load error that names the expression.

## Expressions in model_color

The `red`, `green`, `blue` and `alpha` of [`model_color`](/docs/datapack/powers/model_color) take expressions, for the whole model and for each entry in `parts`. They're evaluated every frame against the entity holding the power, so a tint can follow health, armor or a resource:

```json
{
  "type": "apoli:model_color",
  "green": "clamp(health / max_health, 0.2, 1)",
  "blue": "clamp(health / max_health, 0.2, 1)"
}
```

## Custom status effects and /reload

After a `/reload`, giving a player a custom status effect could disconnect them with a "Can't find id" error. A custom effect is now the same registered effect for the whole session, and `/reload` updates its settings in place instead of swapping it for a new one.
