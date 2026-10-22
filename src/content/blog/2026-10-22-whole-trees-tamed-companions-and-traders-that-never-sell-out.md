---
title: "Whole trees, tamed companions, and traders that never sell out"
description: "Apoli 1.119.0 and Origins 1.47.12: connected block groups and mining as the player, triggers for taming and breeding, shared status effects, merchant powers, projectile accuracy, enchantability, anvil repairs, sneaky movement, a working modify_xp_gain, and three bug fixes."
date: 2026-10-22
author: Overgrown
---

This is Apoli 1.119.0 and Origins 1.47.12, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. There are ten new power types, a new block action and a new bi-entity action, so update the client, the server and Origins together.

## Felling a tree with three pieces

A tree feller used to mean a recursive function or a big `area_of_effect` that also flattened log cabins. Now it is an [`apoli:action_on_block_break`](/docs/datapack/powers/action_on_block_break) with two new parts inside it:

```json
"block_action": {
  "type": "apoli:connected_blocks",
  "downward": false,
  "limit": 256,
  "neighbor_condition": {
    "type": "apoli:all_of",
    "conditions": [
      { "type": "apoli:in_tag", "tag": "minecraft:leaves" },
      { "type": "apoli:block_state", "property": "persistent", "value": false }
    ]
  },
  "block_action": { "type": "apoli:break_block", "mine": true }
}
```

[`apoli:connected_blocks`](/docs/datapack/block-actions/connected_blocks) finds the blocks joined to the one you broke. With no `block_condition` it follows the same block, so oak follows oak. `neighbor_condition` makes the whole group depend on what touches it, which is how a tree with natural leaves falls and a cabin built from the same logs doesn't. `"mine": true` on [`apoli:break_block`](/docs/datapack/block-actions/break_block) has the player mine each log themselves, so the axe wears down, its enchantments apply and claim mods get a say. A power never sets itself off with the blocks its own action breaks, so this can't loop.

If chopping a whole tree should take longer than one log, [`apoli:modify_break_speed`](/docs/datapack/powers/modify_break_speed) takes the same group as `connected_blocks` and hands its size to the modifiers as `count`. The new [`durability[slot]`](/docs/datapack/data-types/expression#durability) expression reads how many uses a tool has left, in case a nearly broken axe should be quicker about it.

## Animals

- [`apoli:action_on_tame`](/docs/datapack/powers/action_on_tame) fires when the player tames something, from a wolf taking a bone to a horse finally letting them stay on.
- [`apoli:action_on_breed`](/docs/datapack/powers/action_on_breed) fires when animals the player fed have a baby. It can act on the baby, or on the parents through `parents_action`, where the new [`apoli:breed`](/docs/datapack/bientity-actions/breed) action gives them another one. A 20% `random_chance` around it is twins.
- [`apoli:share_effects`](/docs/datapack/powers/share_effects) hands a copy of every status effect the player gains to nearby entities you pick, such as their own pets.

## Merchants

[`apoli:infinite_trades`](/docs/datapack/powers/infinite_trades) keeps the player's trades from using up an offer, so a villager never sells out for them. [`apoli:extra_trades`](/docs/datapack/powers/extra_trades) gives merchants trades that only players with the power can see. The items can be fixed or rolled from a loot table, and they are rolled once per merchant and saved with it.

## More new types

- [`apoli:modify_projectile_divergence`](/docs/datapack/powers/modify_projectile_divergence) changes how far shots stray from the aim. A `set_total` of `0` makes every arrow, snowball and pearl fly true.
- [`apoli:modify_enchantability`](/docs/datapack/powers/modify_enchantability) changes an item's enchantability at the enchanting table, for better rolls at the same level cost.
- [`apoli:modify_anvil`](/docs/datapack/powers/modify_anvil) changes how many pieces of material a repair takes and how much combining two items restores.
- [`apoli:sneaky`](/docs/datapack/powers/sneaky) makes the player count as sneaking for everything that cares how quiet they are: footsteps, vibrations, nameplates, mob detection and foxes. They keep walking at full speed.
- [`apoli:prevent_level_event`](/docs/datapack/powers/prevent_level_event) hides the world events a player causes, such as the cracking sound and particles of the blocks they break.

[`apoli:modify_xp_gain`](/docs/datapack/powers/modify_xp_gain) was listed on the site but did nothing until now. It changes the experience from orbs the player picks up, and with a `block_condition` it changes the experience from cooking in a matching furnace, smoker or blast furnace instead.

## Fixes

- On Fabric 1.20.1, [`apoli:action_on_block_use`](/docs/datapack/powers/action_on_block_use) powers that let the click through ran twice per click, and [`apoli:action_on_sending_message`](/docs/datapack/powers/action_on_sending_message) ran its actions twice for messages it let through. Both run once now.
- [`apoli:modify_food`](/docs/datapack/powers/modify_food) skipped its `entity_action` and `item_action` when the player ate the last item of a stack, which includes every bowl of stew. On 1.20.1 its `replace_stack` was skipped in the same case. Both work for the last item now.
- When a [custom status effect](/docs/datapack/introduction/custom-status-effects) ended, Apoli also took away every power granted from a source with the effect's ID. That included the sub-powers of an `apoli:multiple` that shared the ID. Effects now grant their powers from their own source, `apoli:effect/<namespace>/<path>`.
- The Enderian's thrown pearl now leaves from the same height as a vanilla ender pearl, so it follows exactly the same path.
