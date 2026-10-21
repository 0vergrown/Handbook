---
title: WoodWalkers
description: "Shape conditions, actions and powers that read and drive a player's WoodWalkers shape."
---

[WoodWalkers](https://modrinth.com/mod/walkers) (mod ID `walkers`) lets a player take the shape of a mob they have killed. Apoli reads and drives that shape through twelve types, all registration-gated: they don't exist at all in a pack without WoodWalkers, so a data pack that uses them needs WoodWalkers as a dependency.

Every type also answers to its `shappoli:` ID, so data packs written for Shappoli's Walkers integration load unchanged.

## Shapes and Apoli's own disguise

Apoli's [`apoli:disguise_as`](/docs/datapack/entity-actions/disguise_as) system and a WoodWalkers shape are separate things, and both can be active at once:

- An Apoli disguise wins the render, because it is applied before WoodWalkers' own renderer swap.
- [`apoli:disguised`](/docs/datapack/entity-conditions/disguised) also passes for a WoodWalkers shape, so a condition written for one works for the other.

## Types

| Type ID | Flavour | What it does |
| --- | --- | --- |
| [`apoli:shape_condition`](/docs/compat/woodwalkers/shape_condition) | Entity condition | Tests a bi-entity condition between the player and their shape. Alias `apoli:shape`. |
| [`apoli:has_shape_ability`](/docs/compat/woodwalkers/has_shape_ability) | Entity condition | Checks whether the current shape has an ability. |
| [`apoli:can_use_shape_ability`](/docs/compat/woodwalkers/can_use_shape_ability) | Entity condition | Checks whether the ability is off cooldown and usable. |
| [`apoli:shape_ability_cooldown`](/docs/compat/woodwalkers/shape_ability_cooldown) | Entity condition | Compares the ability cooldown in ticks. |
| [`apoli:switch_shape`](/docs/compat/woodwalkers/switch_shape) | Entity and bi-entity action | Changes the shape. Aliases `apoli:change_shape` and `apoli:morph`. |
| [`apoli:shape_action`](/docs/compat/woodwalkers/shape_action) | Entity action | Runs a bi-entity action between the player and their shape. Alias `apoli:action_on_shape`. |
| [`apoli:use_shape_ability`](/docs/compat/woodwalkers/use_shape_ability) | Entity action | Triggers the shape ability. |
| [`apoli:change_shape_ability_cooldown`](/docs/compat/woodwalkers/change_shape_ability_cooldown) | Entity action | Adds to or sets the ability cooldown. |
| [`apoli:action_on_shape_change`](/docs/compat/woodwalkers/action_on_shape_change) | Power | Fires when the shape changes. Alias `apoli:action_on_morph`. |
| [`apoli:action_on_shape_ability_use`](/docs/compat/woodwalkers/action_on_shape_ability_use) | Power | Fires when the ability is used. |
| [`apoli:prevent_shape_change`](/docs/compat/woodwalkers/prevent_shape_change) | Power | Blocks shape changes. Alias `apoli:prevent_morph`. |
| [`apoli:prevent_shape_ability_use`](/docs/compat/woodwalkers/prevent_shape_ability_use) | Power | Blocks ability use. |

## Example

```json
{
  "type": "apoli:prevent_shape_change",
  "bientity_condition": {
    "type": "apoli:target_condition",
    "condition": { "type": "apoli:in_tag", "tag": "minecraft:undead" }
  }
}
```

This power stops the player from taking the shape of anything undead.

> [!NOTE]
> Apoli talks to WoodWalkers through its published `tocraft.walkers.api` classes, looked up once at load. If a WoodWalkers update changes that API, Apoli logs a single warning and the shape types stop doing anything, instead of crashing the game.
