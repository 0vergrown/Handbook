---
title: "Modify Cursor Speed (Power Type)"
description: "Scales how fast the holder's view turns with the mouse."
navigation_title: "Modify Cursor Speed"
aliases: ["modify_mouse_sensitivity", "modify_mouse_speed", "modify_look_sensitivity"]
---

Scales how far the camera turns for a given amount of physical mouse movement — effectively a per-power mouse sensitivity multiplier.

Type ID: `apoli:modify_cursor_speed`

Aliases: `apoli:modify_mouse_sensitivity`, `apoli:modify_mouse_speed`, `apoli:modify_look_sensitivity`

## Fields

| Field | Type | Default | Purpose |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to a base of `1.0`. |
| `modifiers` | Array of Attribute Modifier | _optional_ | Several modifiers applied to a base of `1.0`. |
| `horizontal` | Boolean | `true` | Scale left/right turning. |
| `vertical` | Boolean | `true` | Scale up/down turning. |

The modifiers are applied to a base value of `1.0`, and the result multiplies the raw look delta. `1.0` is normal speed, below `1.0` is slower, above is faster. A result of `0` freezes the view.

Set only one of `horizontal` / `vertical` to skew a single axis — a heavy-headed character can look side to side normally but struggle to look up.

## Examples

Quarter speed — sluggish, heavy movement:

```json
{
  "type": "apoli:modify_cursor_speed",
  "modifier": { "operation": "multiply_total", "value": -0.75 }
}
```

Double speed while sprinting:

```json
{
  "type": "apoli:modify_cursor_speed",
  "condition": { "type": "apoli:sprinting" },
  "modifier": { "operation": "multiply_total", "value": 1.0 }
}
```

Can't look up or down quickly, but turning is unaffected:

```json
{
  "type": "apoli:modify_cursor_speed",
  "horizontal": false,
  "modifier": { "operation": "multiply_total", "value": -0.6 }
}
```

## Notes

- This is a **client-side** power. It only affects the player who holds it — granting it to a mob does nothing.
- Several active `modify_cursor_speed` powers stack multiplicatively.
- The value is recomputed once per client tick, not per frame, so it costs nothing on the render path.
- Players without Apoli installed are unaffected. The server never desyncs from it — only the local view speed changes.
