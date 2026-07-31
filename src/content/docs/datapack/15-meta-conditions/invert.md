---
title: "Invert (Meta Condition Type)"
description: "There is no meta condition to invert the results of another condition."
navigation_title: "Invert"
---

> **There is no meta condition to invert the results of another condition.** However, **every** condition supports the following field, which can be used to achieve the same:

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`inverted` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If true, the condition acts inverted.

## Examples

```json
"condition": {
    "type": "apoli:sneaking",
    "inverted": true
}
```

This example will check if the player is **not** sneaking.
