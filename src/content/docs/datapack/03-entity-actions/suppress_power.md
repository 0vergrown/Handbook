---
title: "Suppress Power (Entity Action Type)"
description: "Temporarily disables a power without removing it."
navigation_title: "Suppress Power"
---

Temporarily disables a power without removing it.

Type ID: `apoli:suppress_power`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `power` | identifier | **required** |
| `source` | identifier | _optional_ |

## Example

```json
{
  "type": "apoli:suppress_power"
}
```
