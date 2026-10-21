---
title: "Invert (Meta Condition Type)"
description: "There is no meta condition to invert the results of another condition."
navigation_title: "Invert"
---

Apoli has no meta condition that inverts another condition. Every condition supports the `inverted` field instead, which does the same.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | With `true`, the condition's result is flipped. |

## Examples

```json
"condition": {
    "type": "apoli:sneaking",
    "inverted": true
}
```

This checks whether the player isn't sneaking.
