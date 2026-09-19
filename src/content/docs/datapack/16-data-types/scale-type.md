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

Because `apoli:falling` is built from 1 ÷ `apoli:motion`, a bigger entity takes more fall damage and a smaller one takes less, without you wiring anything up.

`apoli:held_item` is deliberately not built from `apoli:base`. In third person the item is drawn inside the entity's model, so it already follows `apoli:model_width` / `apoli:model_height`; `apoli:held_item` is the extra multiplier on top, and it is the only thing that sizes the item in first person.

## Easings

Anywhere a scale change takes `ticks`, an `easing` chooses how it is spread over them:

`linear`, `ease_in_sine`, `ease_out_sine`, `ease_in_out_sine`, `ease_in_quad`, `ease_out_quad`, `ease_in_out_quad`, `ease_in_cubic`, `ease_out_cubic`, `ease_in_out_cubic`, `ease_in_expo`, `ease_out_expo`, `ease_out_back`, `ease_out_bounce`.

## Where scales come from

Three sources multiply together:

1. the value stored on the entity (set by [/apoli:scale](/docs/datapack/commands/scale) or the [apoli:scale entity action](/docs/datapack/entity-actions/scale)), which persists;
2. every held [apoli:scale](/docs/datapack/powers/scale) power whose condition passes;
3. the parent scales in the table above.

Scales are clamped to the range `0.0001`–`10000`.

> When **Pehkui** is installed, Apoli hands its values to Pehkui rather than applying them itself, so the two mods agree on one size instead of multiplying each other.
