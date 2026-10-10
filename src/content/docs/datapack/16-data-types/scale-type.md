---
title: "Scale Type (Data Type)"
description: "The identifier of one axis of an entity's size, such as apoli:base or apoli:model_height."
navigation_title: "Scale Type"
---

A [Namespaced ID](/docs/datapack/data-types/identifier) naming one axis of an entity's size. Every entity has a value for each one, and every value starts at `1`.

A scale type is written `apoli:base`. A `pehkui:` namespace resolves to the matching Apoli type, so ids copied from a Pehkui pack keep working.

## Scale types

Each type multiplies the ones listed under **Built from**, so `apoli:base` is the single dial that moves everything.

| ID | What it changes | Built from |
|----|-----------------|------------|
| `apoli:base` | Everything below that lists it. | — |
| `apoli:width` | Hitbox and model width. | `base` |
| `apoli:height` | Hitbox and model height, and eye height. | `base` |
| `apoli:hitbox_width` | Hitbox width only — collision, not what you see. | `width` |
| `apoli:hitbox_height` | Hitbox height only. | `height` |
| `apoli:eye_height` | Where the camera and line of sight sit inside the hitbox. | `height` |
| `apoli:model_width` | Rendered model width only — every entity, players included. | `width` |
| `apoli:model_height` | Rendered model height only. | `height` |
| `apoli:third_person` | How far the third-person camera sits behind the entity. | `height` |
| `apoli:motion` | Walking and swimming speed. | `base` |
| `apoli:falling` | Fall damage. A value above `1` softens the landing. | 1 ÷ `motion` |
| `apoli:step_height` | How tall a block the entity walks up without jumping. | `motion` |
| `apoli:jump_height` | Jump strength. | `motion` |
| `apoli:visibility` | How easily mobs notice the entity. | `base` |
| `apoli:mining_speed` | How fast the entity breaks blocks. | — |
| `apoli:knockback` | Knockback the entity **receives**; above `1` means it is shoved less. | — |
| `apoli:attack` | Damage the entity deals. | — |
| `apoli:defense` | Damage the entity takes; above `1` means it takes less. | — |
| `apoli:held_item` | Size of the item the entity is holding, in first and third person. | — |
| `apoli:held_item_mainhand` | Size of the item in the entity's main hand only. | `held_item` |
| `apoli:held_item_offhand` | Size of the item in the entity's off hand only. | `held_item` |
| `apoli:doll` | Size of the entity's preview in the inventory and other menus. See [The inventory doll](#the-inventory-doll). | — |

Because `apoli:falling` is built from 1 ÷ `apoli:motion`, a bigger entity takes more fall damage and a smaller one takes less, without you wiring anything up.

`apoli:held_item` is deliberately not built from `apoli:base`. In third person the item is drawn inside the entity's model, so it already follows `apoli:model_width` / `apoli:model_height`; `apoli:held_item` is the extra multiplier on top, and it is the only thing that sizes the item in first person. `apoli:held_item_mainhand` and `apoli:held_item_offhand` narrow it to one hand: a left-handed player's main-hand item is the one in their left hand, and a mob that carries its item in its mouth uses `apoli:held_item_mainhand`.

## How the model is drawn

`apoli:model_width` and `apoli:model_height` scale the model along its own body, so the proportions hold whatever pose it is in. A tall, thin entity lying in a bed is long rather than thick, and a scaled entity that swims or glides with an elytra keeps its shape.

- **Sleeping.** A scaled sleeper lies on the mattress with its head on the pillow. A big one overhangs the foot of the bed rather than sinking into it.
- **Name tags** sit just above the drawn head at their usual size, whatever the scale — including for a scale that only changes the model, or only the hitbox.
- **Leads** run from the entity's leash point to whatever holds them, at any size.
- **Crouching** keeps a scaled entity's feet on the ground.

## The inventory doll

The preview of an entity in the inventory, the creative inventory and other menus is always drawn at normal size: none of the scale types above reach it, so a giant or a tiny entity can still see themselves. `apoli:doll` is the one scale that does. Give it a value and the preview grows or shrinks by that much:

```json
{
    "type": "apoli:scale",
    "scale_types": "apoli:doll",
    "scale": 2
}
```

The preview scales about its middle and stays clipped to its box. On Minecraft 1.20.1, which positions previews by their feet, it grows upwards from the feet instead.

## Easings

Anywhere a scale change takes `ticks`, an `easing` chooses how it is spread over them:

`linear`, `ease_in_sine`, `ease_out_sine`, `ease_in_out_sine`, `ease_in_quad`, `ease_out_quad`, `ease_in_out_quad`, `ease_in_cubic`, `ease_out_cubic`, `ease_in_out_cubic`, `ease_in_expo`, `ease_out_expo`, `ease_out_back`, `ease_out_bounce`.

## Where scales come from

Three sources multiply together:

1. the value stored on the entity (set by [/apoli:scale](/docs/datapack/commands/scale) or the [apoli:scale entity action](/docs/datapack/entity-actions/scale)), which persists;
2. every held [apoli:scale](/docs/datapack/powers/scale) power whose condition passes;
3. the parent scales in the table above.

Scales are clamped to the range `0.0001`–`10000`.

> When **Pehkui** is installed, Apoli hands its values to Pehkui rather than applying them itself, so the two mods agree on one size instead of multiplying each other. Pehkui has no per-hand type, so `apoli:held_item_mainhand` and `apoli:held_item_offhand` are still applied by Apoli, on top of the held item size Pehkui draws. The same goes for `apoli:doll`.
