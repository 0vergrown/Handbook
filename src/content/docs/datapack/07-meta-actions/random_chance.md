---
title: "Random Chance (Meta Action Type)"
description: "Runs an action (or checks a condition) with a given probability (alias chance)."
navigation_title: "Random Chance"
aliases: ["chance"]
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
