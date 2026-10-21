---
title: "Modify FOV (Power Type)"
description: "Changes the player's field of view, the same way speed effects and sprinting do."
navigation_title: "Modify FOV"
---

Changes the field of view of the player with the power, the same way speed effects and sprinting do, so the change eases in and out over a few frames instead of snapping.

Type ID: `apoli:modify_fov`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Applied to the field of view multiplier. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers, applied in their usual order. |
| `affected_by_fov_effect_scale` | [Boolean](/docs/datapack/data-types/boolean) | `true` | `true` scales the change by the player's FOV Effects accessibility slider, like vanilla speed effects. `false` always applies it in full. |

The modifiers act on a multiplier, not on degrees: `1` is the player's own FOV setting, `0.5` halves it and `1.2` widens it by a fifth. It is the same multiplier vanilla builds from flying, speed and drawing a bow, so the power stacks with those, and vanilla keeps it between `0.1` and `1.5`.

The server decides whether the power is active, and the FOV change happens on the player's client.

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

> [!TIP]
> To zoom further than vanilla's limit, zoom with the scroll wheel or slow mouse turning while zoomed, use [apoli:zoom](/docs/datapack/powers/zoom). For an FOV animated together with the camera, use the `fov` field of [apoli:modify_camera](/docs/datapack/powers/modify_camera).
