---
title: "apoli:action_on_kill"
description: "Runs an action when this entity kills another."
---

Runs an action when this entity kills another.

Type ID: `apoli:action_on_kill`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `bientity_action` | bientity action | _optional_ |
| `self_action` | entity action | _optional_ |
| `target_action` | entity action | _optional_ |
| `bientity_condition` | bientity condition | _optional_ |
| `target_condition` | entity condition | _optional_ |
| `damage_condition` | damage condition | _optional_ |
| `cooldown` | integer | `1` |
| `hud_render` | HUD render | _optional_ |

## Example

```json
{
  "type": "apoli:action_on_kill"
}
```
