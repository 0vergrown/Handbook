---
title: "Modify Cursor Speed (Power Type)"
description: "Scales how fast the player's view turns with the mouse."
navigation_title: "Modify Cursor Speed"
aliases: ["modify_mouse_sensitivity", "modify_mouse_speed", "modify_look_sensitivity"]
---

Scales how far the camera turns for a given amount of mouse movement, which works like a mouse sensitivity multiplier for each power.

Type ID: `apoli:modify_cursor_speed`

Aliases: `apoli:modify_mouse_sensitivity`, `apoli:modify_mouse_speed`, `apoli:modify_look_sensitivity`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | A single modifier applied to a base of `1.0`. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | Several modifiers applied to a base of `1.0`. |
| `horizontal` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Scales turning left and right. |
| `vertical` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Scales looking up and down. |

The modifiers apply to a base value of `1.0`, and the result multiplies the raw mouse movement. `1.0` is normal speed, less than `1.0` is slower and more is faster. A result of `0` freezes the view.

Turn off `horizontal` or `vertical` to change one axis only. A character with a heavy head could look side to side normally but struggle to look up.

## Examples

Quarter speed, for slow and heavy movement:

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

Looking up or down is slow, but turning is unaffected:

```json
{
  "type": "apoli:modify_cursor_speed",
  "horizontal": false,
  "modifier": { "operation": "multiply_total", "value": -0.6 }
}
```

## Notes

- This power runs on the client. It only affects the player who has it, so granting it to a mob does nothing.
- Several active `modify_cursor_speed` powers stack multiplicatively.
- The value is worked out once per client tick, not every frame, so it costs nothing while rendering.
- Players without Apoli installed are unaffected. The server never falls out of sync because of it, since only the local view speed changes.
