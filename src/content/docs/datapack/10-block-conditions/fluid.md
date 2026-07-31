---
title: "Fluid (Block Condition Type)"
description: "Checks the fluid state of the current position with a Fluid Condition Type."
navigation_title: "Fluid"
---

Checks the fluid state of the current position with a Fluid Condition Type.

Type ID: `apoli:fluid`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`fluid_condition` | Fluid Condition Type | | The fluid condition type to check the fluid state at the position.

## Examples

```json
"block_condition": {
    "type": "apoli:fluid",
    "fluid_condition": {
        "type": "apoli:still"
    }
}
```

This example will check if the block is a source fluid.
