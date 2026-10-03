---
title: "Zoom (Power Type)"
description: "Zooms the holder's view in like a spyglass or a zoom mod, with optional slower mouse turning and smoothing."
navigation_title: "Zoom"
---

Zooms the holder's view in while the power is active, like a spyglass or a zoom mod: the field of view narrows, mouse turning slows down to match, and the zoom eases in and out.

Type ID: `apoli:zoom`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `zoom` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `4` | Magnification. `4` shows a quarter of the normal field of view. Values below `1` widen the view instead. Clamped to `0.05` – `100`. |
| `scale_sensitivity` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Slow mouse turning by the same factor, so aiming feels the same at any zoom. |
| `cinematic` | Boolean | `false` | Smooth the mouse like vanilla's cinematic camera while zoomed. |
| `hide_hand` | Boolean | `false` | Hide the first-person hand while zoomed. |
| `speed` | Float | `0.5` | How quickly the zoom eases toward its target each tick, from `0.01` (slow glide) to `1` (instant). |

When several zoom powers are active, the strongest `zoom` wins.

Whether the power is active is decided on the server. `zoom` is read on the holder's client every tick, so an Expression in it follows a resource as soon as the resource changes.

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

### Scroll-wheel zoom

`zoom` takes an Expression, so a resource can hold the zoom level and [apoli:action_on_scroll_wheel](/docs/datapack/powers/action_on_scroll_wheel) can change it:

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

Hold the key and scroll to zoom between 1× and 10×; letting go of the key zooms back out. The scroll only changes the hotbar slot when the key is not held.
