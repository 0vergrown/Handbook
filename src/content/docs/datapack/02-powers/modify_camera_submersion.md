---
title: "Modify Camera Submersion (Power Type)"
description: "Swaps one camera submersion type for another, such as water for none."
navigation_title: "Modify Camera Submersion"
aliases: ["modify_camera_submersion_type"]
---

Changes what the camera thinks it is submerged in. That controls the fog, the overlay and the underwater sound filter, which the game all decides from what the player's head is in, without changing the block or how the player moves through it.

Type ID: `apoli:modify_camera_submersion` (alias `apoli:modify_camera_submersion_type`)

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `from` | [String](/docs/datapack/data-types/string) | _required_ | The submersion to replace: `none`, `water`, `lava` or `powder_snow`. |
| `to` | [String](/docs/datapack/data-types/string) | _required_ | What to report instead, using the same four values. |

Several of these chain. A power that turns `water` into `none` and another that turns `none` into `lava` together report lava while you are in water. The order is not guaranteed, so avoid overlapping pairs.

## Examples

See underwater as if in open air, with no blue fog or muffled sound:

```json
{
  "type": "apoli:modify_camera_submersion",
  "from": "water",
  "to": "none"
}
```

The opposite as a curse, where the world looks flooded even on dry land:

```json
{
  "type": "apoli:modify_camera_submersion",
  "from": "none",
  "to": "water",
  "condition": {
    "type": "apoli:resource",
    "resource": "mypack:madness",
    "comparison": ">=",
    "compare_to": 8
  }
}
```

> [!NOTE]
> This only changes what you see and hear. You still drown in water and burn in lava. Use [`apoli:water_breathing`](/docs/datapack/powers/water_breathing) or [`apoli:invulnerability`](/docs/datapack/powers/invulnerability) for those.
