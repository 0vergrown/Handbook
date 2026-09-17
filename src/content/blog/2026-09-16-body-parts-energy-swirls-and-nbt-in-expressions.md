---
title: "Body parts, energy swirls and NBT in expressions"
description: "Apoli 1.85.0 works out which part of the body a hit lands on, moves groups of model parts as one piece, brings back the energy swirl, and lets expressions read enchantment levels and NBT."
date: 2026-09-16
author: Overgrown
---

Apoli **1.85.0** and Origins **1.38.0**. This one is mostly about bodies: where a hit lands on one,
how to move half of one at a time, and how to make one glow.

## Where did that hit land?

The new [`apoli:body_part`](/docs/datapack/damage-conditions/body_part) damage condition passes when
the damage hit a particular part of the body — the head, an arm, the chest, the back of a foot. It
drops into every damage condition field, so a headshot bonus is an ordinary
[`apoli:modify_damage_dealt`](/docs/datapack/powers/modify_damage) power:

```json
{
  "type": "apoli:modify_damage_dealt",
  "damage_condition": {
    "type": "apoli:body_part",
    "body_part": "head",
    "require_hit_data": true
  },
  "modifier": {
    "operation": "multiply_total",
    "amount": 1
  }
}
```

Arrows and other projectiles are traced along their flight path, a player's swing follows where they
are looking, and a mob's swing comes in at its own height, so a silverfish bites your feet. The trace
runs against the target's body in the pose it is actually in — crouched, swimming, drawing a bow, or
laid out flat by a `modify_model_parts` power — which is what separates it from a fixed height band:
a crouching player's head is not where a standing player's is. Damage with no direction, like fall
damage, is routed by the `#apoli:body_part/...` damage type tags, which packs can extend.

If you are coming from Sync's Body Part Damage Modifier: that power is a `modify_damage_taken` per
region with this condition in it, and the condition page has the multiple-region version written out.
Turn on [dev mode](/docs/datapack/commands/dev-mode) and every hit is reported in chat, which makes
tuning a region quick.

## Moving half a body

[`apoli:modify_model_parts`](/docs/datapack/powers/modify_model_parts) has five new part names:
`arms`, `legs`, `upper`, `lower` and `whole`. A group moves **as one piece** around the joint that
holds it on — the arms around the line between the shoulders, the upper body around the waist, the
whole model around the feet — so a `pitch` on `upper` is a bow from the waist rather than a head,
torso and two arms each tipping over on their own. A new `pivot` field puts the joint anywhere else.

The group names work everywhere a body part is named: `model_color` tints them, `custom_model_render`
restricts an overlay to them, and particles anchor between the limbs. Every one of those names now
comes from one list, documented on the new [Body Part](/docs/datapack/data-types/body-part) page,
along with regions such as `hands`, `chest` and `achilles_heel`.

## Energy swirls

[`apoli:custom_model_render`](/docs/datapack/powers/custom_model_render) has a new render type,
`energy_swirl` — the charged creeper's aura — with a `scroll_speed` to set how fast it drifts. Texture
overlays also draw on any living entity now, not only players, so a zombie can glow too. The old
`apoli:energy_swirl` id loads as this power with the swirl already configured, so packs that used it
work as they are.

## Enchantments and NBT in expressions

Two new [expression](/docs/datapack/data-types/expression) functions read what is in an entity's
hands and data:

```json
"amount": "10 + enchantment[minecraft:mending, weapon.mainhand, sum]"
```

reads an enchantment level from a slot, the armour, both hands or all equipment, summed or maxed like
the `apoli:enchantment` condition. And `nbt[...]` reads a number the way `/data get` does — from the
entity, an item slot, a block entity, a command storage, or the other side of a bi-entity action,
with `sum`, `max`, `min` and `count` for paths that match more than one value:

```json
"amount": "nbt[Inventory[{id:\"minecraft:arrow\"}].count, sum]"
```

Unknown body parts in the new condition, and malformed ranges, are load errors on every version of
the game rather than quietly matching every hit.
