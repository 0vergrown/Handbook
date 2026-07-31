---
title: "Advancement (Entity Action Type)"
description: "Grants or revokes an advancement (aliases grant_advancement, revoke_advancement)."
navigation_title: "Advancement"
---

Grants or revokes an advancement (aliases `grant_advancement`, `revoke_advancement`).

Type ID: `apoli:advancement`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `advancement` | identifier | _optional_ |
| `criteria` | list of string | _optional_ |
| `criterion` | string | _optional_ |
| `selection` | Selection | _optional_ |
| `revoke` | boolean | _optional_ |

## Example

```json
{
  "type": "apoli:advancement"
}
```
