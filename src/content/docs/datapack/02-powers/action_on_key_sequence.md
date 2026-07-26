---
title: "apoli:action_on_key_sequence"
description: "Runs an action when a sequence of keys is entered, like a combo."
---

Runs an action when a sequence of keys is entered, like a combo.

Type ID: `apoli:action_on_key_sequence`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `success_action` | entity action | _optional_ |
| `fail_action` | entity action | _optional_ |
| `cooldown` | integer | `0` |
| `hud_render` | HUD render | _optional_ |
| `keys` | list of key | **required** |
| `key_sequence` | list of string | **required** |

## Example

```json
{
  "type": "apoli:action_on_key_sequence"
}
```
