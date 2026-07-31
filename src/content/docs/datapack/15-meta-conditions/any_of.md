---
title: "Any Of (Meta Condition Type)"
description: "Passes when any listed condition passes (alias or)."
navigation_title: "Any Of"
aliases: ["or"]
---

Passes when any listed condition passes (alias `or`).

Type ID: `apoli:any_of`

## Fields

| Field | Type | Default |
|-------|------|---------|
| `conditions` | list of condition | **required** |

## Example

```json
{
  "type": "apoli:any_of"
}
```
