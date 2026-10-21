---
title: "Fluid (Block Condition Type)"
description: "Checks the fluid at the block's position with a fluid condition."
navigation_title: "Fluid"
---

Checks the fluid at the block's position with a fluid condition.

Type ID: `apoli:fluid`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `fluid_condition` | [Fluid Condition Type](/docs/datapack/fluid-conditions) | _required_ | The fluid condition to check at the position. |

## Examples

```json
"block_condition": {
    "type": "apoli:fluid",
    "fluid_condition": {
        "type": "apoli:still"
    }
}
```

This checks whether the block is a fluid source.
