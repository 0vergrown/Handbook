---
title: "apoli:xp"
description: "Compares the entity's experience (aliases xp_levels, xp_points)."
---

Compares the entity's experience (aliases `xp_levels`, `xp_points`).

Type ID: `apoli:xp`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `unit` | Unit | _optional_ |
| `comparison` | comparison | **required** |
| `compare_to` | integer | **required** |

## Example

```json
{
  "type": "apoli:xp"
}
```
