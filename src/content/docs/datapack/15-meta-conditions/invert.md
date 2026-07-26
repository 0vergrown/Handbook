---
title: "Invert"
description: "> There is no meta condition to invert the results of another condition."
---

> **There is no meta condition to invert the results of another condition.** However, **every** condition supports the following field, which can be used to achieve the same:

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`inverted` | Boolean Data Type) | `false` | If true, the condition acts inverted.

## Examples

```json
"condition": {
    "type": "apoli:sneaking",
    "inverted": true
}
```

This example will check if the player is **not** sneaking.

