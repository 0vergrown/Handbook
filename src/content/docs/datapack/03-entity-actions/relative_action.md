---
title: "apoli:relative_action"
description: "Runs an action on a related entity such as a rider or vehicle (aliases passenger_action, riding_action)."
---

Runs an action on a related entity such as a rider or vehicle (aliases `passenger_action`, `riding_action`).

Type ID: `apoli:relative_action`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `target` | Target | _optional_ |
| `action` | entity action | _optional_ |
| `bientity_action` | bientity action | _optional_ |
| `bientity_condition` | bientity condition | _optional_ |
| `recursive` | boolean | `false` |

## Example

```json
{
  "type": "apoli:relative_action"
}
```
