---
title: "apoli:random_chance"
description: "Runs an action (or checks a condition) with a given probability (alias chance)."
---

Runs an action (or checks a condition) with a given probability (alias `chance`).

Type ID: `apoli:random_chance`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `chance` | expression | **required** |
| `action` | condition | **required** |
| `fail_action` | condition | _optional_ |

## Example

```json
{
  "type": "apoli:random_chance"
}
```
