---
title: "apoli:prevent_powers"
description: "Suppresses other powers on the entity while active."
---

Suppresses other powers on the entity while active.

Type ID: `apoli:prevent_powers`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `powers` | list of identifier | **required** |
| `update_rate` | integer | `5` |

## Example

```json
{
  "type": "apoli:prevent_powers"
}
```
