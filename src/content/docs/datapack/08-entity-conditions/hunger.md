---
title: "apoli:hunger"
description: "Compares the entity's hunger level (alias food_level)."
---

Compares the entity's hunger level (alias `food_level`).

Type ID: `apoli:hunger`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `kind` | Kind | _optional_ |
| `comparison` | comparison | **required** |
| `compare_to` | number | **required** |

## Example

```json
{
  "type": "apoli:hunger"
}
```
