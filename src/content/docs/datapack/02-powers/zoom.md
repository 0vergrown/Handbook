---
title: "Zoom (Power Type)"
description: "Zooms the player's view in like a spyglass or a zoom mod, with optional slower mouse turning and smoothing."
navigation_title: "Zoom"
---

Zooms the view of the player with the power while it is active, like a spyglass or a zoom mod. The field of view narrows, mouse turning slows down to match, and the zoom eases in and out.

Type ID: `apoli:zoom`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `zoom` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `4` | The magnification. `4` shows a quarter of the normal field of view, and values below `1` widen the view instead. Clamped between `0.05` and `100`. |
| `scale_sensitivity` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Slows mouse turning by the same factor, so aiming feels the same at any zoom. |
| `cinematic` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Smooths the mouse like vanilla's cinematic camera while zoomed. |
| `hide_hand` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Hides the first-person hand while zoomed. |
| `speed` | [Float](/docs/datapack/data-types/float) | `0.5` | How quickly the zoom eases toward its target each tick, from `0.01` (a slow glide) to `1` (instant). |

When several zoom powers are active, the strongest `zoom` wins.

The server decides whether the power is active. The player's client reads `zoom` every tick, so an expression in it follows a resource as soon as the resource changes.

## Examples

Zoom while a key is held:

```json
{
  "type": "apoli:zoom",
  "zoom": 4,
  "hide_hand": true,
  "condition": {
    "type": "apoli:key_pressed",
    "key": "key.origins.secondary_active"
  }
}
```

### Scroll wheel zoom

`zoom` takes an expression, so a resource can hold the zoom level and [apoli:action_on_scroll_wheel](/docs/datapack/powers/action_on_scroll_wheel) can change it:

```json
{
  "type": "apoli:multiple",
  "level": {
    "type": "apoli:resource",
    "min": 1,
    "max": 10,
    "start_value": 2
  },
  "scope": {
    "type": "apoli:zoom",
    "zoom": "resource(*:*_level)",
    "condition": {
      "type": "apoli:key_pressed",
      "key": "key.origins.secondary_active"
    }
  },
  "zoom_in": {
    "type": "apoli:action_on_scroll_wheel",
    "direction": "up",
    "prevent_hotbar_change": true,
    "entity_action": {
      "type": "apoli:modify_resource",
      "resource": "*:*_level",
      "modifier": {
        "operation": "add_base_early",
        "value": 1
      }
    },
    "condition": {
      "type": "apoli:key_pressed",
      "key": "key.origins.secondary_active"
    }
  },
  "zoom_out": {
    "type": "apoli:action_on_scroll_wheel",
    "direction": "down",
    "prevent_hotbar_change": true,
    "entity_action": {
      "type": "apoli:modify_resource",
      "resource": "*:*_level",
      "modifier": {
        "operation": "add_base_early",
        "value": -1
      }
    },
    "condition": {
      "type": "apoli:key_pressed",
      "key": "key.origins.secondary_active"
    }
  }
}
```

Hold the key and scroll to zoom between 1 and 10 times, and let go of the key to zoom back out. Scrolling only changes the hotbar slot while the key isn't held.
