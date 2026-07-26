---
title: "apoli:constant"
description: "Provides a constant state where it's either true or false."
---

Provides a constant state where it's either true or false. Mainly added as a backup case in case a condition is required in some power/action/condition types.

Type ID: `apoli:constant`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`value` | [Boolean](/docs/datapack/data-types/boolean) | | If true, the condition is always fulfilled. If false, the condition is never fulfilled.


## Examples

```json
"condition": {
    "type": "apoli:constant",
    "value": true
}
```

This example is always true.

