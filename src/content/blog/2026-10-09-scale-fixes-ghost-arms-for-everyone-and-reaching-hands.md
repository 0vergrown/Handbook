---
title: "Scale fixes, ghost arms for everyone, and hands that reach"
description: "Apoli 1.113.0: scaled entities sleep, wear name tags and pull leads properly, the inventory doll keeps its size, ghost arms show in third person, model parts can turn held items and reach for a point, and a new action moves status effects between entities."
date: 2026-10-09
author: Overgrown
---

Apoli **1.113.0**, on Fabric 1.20.1, Fabric 1.21.1 and NeoForge 1.21.1, with Origins **1.47.4** built against it.

## Scale

A few things drawn around a scaled entity were scaled twice. They now line up with the body:

- **Name tags** float just above the head at their usual size. With `apoli:height` they used to drift far above a tall entity, stretched.
- **Sleeping** while scaled puts the head on the pillow. A big sleeper was pushed most of the way off the bed and sank into the floor; a tall, thin one lay short and thick.
- **Leads** on a scaled mob or boat reach whatever holds them instead of stretching off into the sky.
- **Crouching** keeps a scaled entity's feet on the ground.

The model now scales along its own body, so lying down, swimming or gliding keeps its proportions — see [How the model is drawn](/docs/datapack/data-types/scale-type#how-the-model-is-drawn).

The **inventory doll** is always drawn at normal size, so a giant or a speck can still see themselves. To size it on purpose there is a new scale type, [`apoli:doll`](/docs/datapack/data-types/scale-type#the-inventory-doll):

```json
{
    "type": "apoli:scale",
    "scale_types": "apoli:doll",
    "scale": 2
}
```

## Ghost arms in third person

[`apoli:show_both_arms`](/docs/datapack/powers/show_both_arms) ghost arms now trail the swinging arms on the body itself, so other players see them, and so do you in third person, in previews and through camera powers. When [`apoli:swing_hand`](/docs/datapack/entity-actions/swing_hand) swings both hands at once, both arms leave a trail. The new `ghost_perspectives` field picks the views; it defaults to both.

## Held items and reaching

[Model part transformations](/docs/datapack/data-types/model-part-transformation) can now aim at the items in an entity's hands — `main_hand_item`, `off_hand_item`, `right_item`, `left_item` or `items` — to turn, grow, move or hide them.

The new `reach` type points a limb at a `target` point and stretches or shortens it so the hand or foot lands right on it. On `arms`, both hands meet at the point:

```json
{
    "model_part": "arms",
    "type": "reach",
    "target": [0, 8, -8]
}
```

## Moving status effects

[`apoli:transfer_effects`](/docs/datapack/bientity-actions/transfer_effects) is a bi-entity action that steals, gives or copies status effects, custom ones included. It can filter by effect or category, change the duration and amplifier on the way, and split an effect so both entities keep half.

## fire_projectile

The [`apoli:fire_projectile`](/docs/datapack/powers/fire_projectile) pages (power and action) listed `speed`, `divergence` and `count` as plain numbers. All three take an [Expression](/docs/datapack/data-types/expression) too, and the pages now say so. `speed` and `divergence` are worked out for every projectile, so a volley can spread each shot differently.
