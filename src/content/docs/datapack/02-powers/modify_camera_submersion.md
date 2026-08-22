---
title: "Modify Camera Submersion (Power Type)"
description: Swaps one camera submersion type for another, such as water for none.
navigation_title: "Modify Camera Submersion"
aliases: ["modify_camera_submersion_type"]
---

Lies to the camera about what it is submerged in. It changes the fog, the overlay and the underwater sound filter — everything the game decides from "what is my head in" — without changing the block or how you move through it.

Type ID: `apoli:modify_camera_submersion` (alias `apoli:modify_camera_submersion_type`)

## Fields

Field | Type | Default | Description
------|------|---------|-------------
`from` | [String](/docs/datapack/data-types/string) | **required** | The submersion to replace: `none`, `water`, `lava` or `powder_snow`.
`to` | [String](/docs/datapack/data-types/string) | **required** | What to report instead. Same four values.

Several of these chain: a power turning `water` into `none` and another turning `none` into `lava` will, together, report lava while you are in water. Order is not guaranteed, so avoid overlapping pairs.

## Examples

See underwater as if you were in open air — no blue fog, no muffled sound:

```json
{
  "type": "apoli:modify_camera_submersion",
  "from": "water",
  "to": "none"
}
```

The opposite, as a curse — the world looks flooded even on dry land:

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

> This is purely visual and audible. You still drown in water and still burn in lava; use [`apoli:water_breathing`](/docs/datapack/powers/water_breathing) or [`apoli:invulnerability`](/docs/datapack/powers/invulnerability) for the rest.
