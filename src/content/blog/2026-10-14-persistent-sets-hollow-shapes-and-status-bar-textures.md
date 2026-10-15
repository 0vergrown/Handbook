---
title: "Persistent sets, hollow shapes and status bar textures"
description: "Apoli 1.116.0 and Origins 1.47.9: entity sets that survive death, logout and restarts, offline players in set actions, hollow shapes, an action for releasing a key, item costs for skills, power tags in the power conditions, and the status_bar_texture power."
date: 2026-10-14
author: Overgrown
---

Apoli **1.116.0** and Origins **1.47.9**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1. Update both sides together: a client and a server on different builds cannot connect.

## Persistent entity sets

[`apoli:entity_set`](/docs/datapack/powers/entity_set) has a new `persistent` option. A persistent set keeps its members when they die or log out, stays on the server while its owner is offline, and is saved with the world, so it comes back after a restart. The only ways out are [`apoli:remove_from_entity_set`](/docs/datapack/bientity-actions/remove_from_entity_set), a `time_limit`, or revoking the power. That makes a permanent link between players a single power instead of a set mirrored into command tags.

Normal sets keep their behaviour, with one change: a set owned by a mob is now deleted when that mob dies, instead of staying in memory until the server stops. Sets also no longer carry over from one singleplayer world into the next.

## Offline players in set actions

[`apoli:action_on_entity_set`](/docs/datapack/entity-actions/action_on_entity_set) has `include_offline`. With it, a member or owner who is offline is visited as an offline copy loaded from their saved data, so a member can check conditions against an owner who is away, or leave their set. [`apoli:online`](/docs/datapack/entity-conditions/exists) is the new name you can use for `apoli:exists`, which is `false` for an offline copy.

## Hollow shapes

Every [shape](/docs/datapack/data-types/shape) has a hollow version — `cube_hollow`, `sphere_hollow`, `star_hollow` and `cone_hollow` — and everything that takes a `shape` takes a `hollow_thickness` (a number or an expression, `1` by default). A block [`apoli:area_of_effect`](/docs/datapack/block-actions/area_of_effect) with `sphere_hollow` builds a sealed dome; [`apoli:entity_in_radius`](/docs/datapack/entity-conditions/entity_in_radius) with it counts the entities in a ring around you.

## Acting when a key is released

[`apoli:action_on_key_press`](/docs/datapack/powers/action_on_key_press) has `entity_action_released`, which runs when the key comes back up after a press. While it runs, the expression variable `held_ticks` is how long the key was held, so a charged ability is one power.

## Paying for skills with items

A skill's `cost` can now ask for items as well as points: `{"points": 20, "item": "minecraft:dirt", "count": 2}`, or an `items` list with an optional `item_condition` on each. A refund gives back exactly what was paid. See [Paying with items](/docs/datapack/skill-tree/skill-tree-power-data#paying-with-items).

## Power tags in the power conditions

[`apoli:power`](/docs/datapack/entity-conditions/power) and [`apoli:power_active`](/docs/datapack/entity-conditions/power_active) take `tags`, the same free-form labels `suppress_power` and `transfer` already understand. "Has any power tagged `mypack.flight`" no longer needs a list of every flight power.

## Status bar textures

[`apoli:status_bar_texture`](/docs/datapack/powers/status_bar_texture) replaces the status bar textures — health, hunger, armor, air, experience and the rest — from a sprite sheet in the classic `icons.png` layout, from a `texture_map` of sprite names, or both. Sheets made for Apace's Apoli work as they are. Several powers combine by `priority`, sprite by sprite, so one can restyle the hearts while another restyles the hunger bar. The same sprite names work on 1.20.1 and 1.21.1.
