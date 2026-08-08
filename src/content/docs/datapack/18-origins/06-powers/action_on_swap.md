---
title: "Action On Swap (Power Type)"
description: "Power — runs an entity action whenever the player swaps their active origin."
navigation_title: "Action On Swap"
---

Runs an entity action whenever the player swaps the origin they are wearing on a [swappable layer's](/docs/datapack/origins/swapping) target layer — in either direction, including back to the main origin.

Type ID: `origins:action_on_swap` — a power type.

> **Needs the Origins mod.** Registered by Origins, not core Apoli.

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action](/docs/datapack/entity-actions) | _optional_ | Executed on the player when the swap happens. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only fire for swaps on this target layer. |
| `from_origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only fire when swapping *away from* this origin. |
| `to_origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only fire when swapping *to* this origin. |

The action runs after the power state has already changed, so conditions inside it see the new origin's powers.

## Examples

A puff of smoke and a sound on every swap:

```json
{
  "type": "origins:action_on_swap",
  "entity_action": {
    "type": "apoli:and",
    "actions": [
      {
        "type": "apoli:spawn_particles",
        "particle": "minecraft:large_smoke",
        "count": 20
      },
      {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.illusioner_mirror_move"
      }
    ]
  }
}
```

Punish returning to your own origin:

```json
{
  "type": "origins:action_on_swap",
  "to_origin": "example:base",
  "entity_action": {
    "type": "apoli:apply_effect",
    "effect": {
      "effect": "minecraft:weakness",
      "duration": 100
    }
  }
}
```
