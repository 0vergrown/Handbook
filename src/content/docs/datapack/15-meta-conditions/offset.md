---
title: "Offset (Meta Condition Type)"
description: "Tests a block condition at an offset from this position (block conditions only)."
navigation_title: "Offset"
---

Tests a block condition at an offset from this position (block conditions only).

Type ID: `apoli:offset`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `condition` | block condition | **required** |
| `x` | integer | `0` |
| `y` | integer | `0` |
| `z` | integer | `0` |

## Example

```json
{
  "type": "apoli:offset"
}
```
