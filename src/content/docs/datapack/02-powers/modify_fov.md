---
title: "Modify FOV (Power Type)"
description: "Changes the holder's field of view, the same way speed effects and sprinting do."
navigation_title: "Modify FOV"
---

Changes the holder's field of view, the same way speed effects and sprinting do — so the change eases in and out over a few frames instead of snapping.

Type ID: `apoli:modify_fov`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the field-of-view multiplier. |
| `modifiers` | Array of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in their usual order. |
| `affected_by_fov_effect_scale` | [Boolean](/docs/datapack/data-types/boolean) | `true` | `true` scales the change by the player's *FOV Effects* accessibility slider, like vanilla speed effects. `false` always applies it in full. |

The modifiers work on a **multiplier**, not on degrees: `1` is the player's own FOV setting, `0.5` halves it, `1.2` widens it by a fifth. The multiplier is the one vanilla builds from flying, speed and drawing a bow, so this stacks with those, and vanilla keeps it between `0.1` and `1.5`.

Whether the power is active is decided on the server; the FOV change happens on the holder's client.

## Examples

A narrow, focused view while sneaking:

```json
{
  "type": "apoli:modify_fov",
  "modifier": {
    "operation": "multiply_total_multiplicative",
    "value": -0.3
  },
  "condition": {
    "type": "apoli:sneaking"
  }
}
```

A wide view that ignores the FOV Effects slider:

```json
{
  "type": "apoli:modify_fov",
  "affected_by_fov_effect_scale": false,
  "modifier": {
    "operation": "set_total",
    "value": 1.3
  }
}
```

> For zooming further than vanilla's limit, for a scroll-wheel zoom, or for slower mouse turning while zoomed, use [apoli:zoom](/docs/datapack/powers/zoom). For an FOV that is animated with the camera, use the `fov` field of [apoli:modify_camera](/docs/datapack/powers/modify_camera).
