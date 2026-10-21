---
title: "Action On Swap (Power Type)"
description: "Runs an entity action whenever the player swaps the origin they are wearing."
navigation_title: "Action On Swap"
---

Runs an entity action whenever the player swaps the origin they are wearing on the target layer of a [swappable layer](/docs/datapack/origins/swapping), in either direction, including back to the main origin.

Type ID: `origins:action_on_swap`

> [!NOTE]
> This power type comes from the Origins mod.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | Runs on the player when the swap happens. |
| `layer` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only runs for swaps on this target layer. |
| `from_origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only runs when swapping away from this origin. |
| `to_origin` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | Only runs when swapping to this origin. |

The action runs after the power state has changed, so conditions inside it see the new origin's powers.

## Examples

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

This power makes a puff of smoke and plays a sound on every swap.

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

This power gives the player Weakness for 100 ticks (5 seconds) when they swap back to `example:base`, as a cost for returning to their own origin.
