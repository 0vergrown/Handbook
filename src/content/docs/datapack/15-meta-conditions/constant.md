---
title: "Constant (Meta Condition Type)"
description: "Always passes or always fails, depending on its value."
navigation_title: "Constant"
---

Always passes or always fails, depending on its value. It is mostly there as a fallback where a power, action or condition type requires a condition.

Type ID: `apoli:constant`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | [Boolean](/docs/datapack/data-types/boolean) | _required_ | With `true`, the condition always passes. With `false`, it never does. |

## Examples

```json
"condition": {
    "type": "apoli:constant",
    "value": true
}
```

This always passes.
