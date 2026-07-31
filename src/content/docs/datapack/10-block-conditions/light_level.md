---
title: "Light Level (Block Condition Type)"
description: "Allows checking the light level at the block's position."
navigation_title: "Light Level"
---

Allows checking the light level at the block's position.

Type ID: `apoli:light_level`

> If no light type is specified in the `light_type` field, the highest light level between the block light level and **internal** sky light level will be used as the "resulting" light level of the position of the block.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`light_type` | String | _optional_ | If specified, determines the type of light level to compare. Accepts `"sky"` or `"block"`.
`comparison` | Comparison | | Determines how the light level should be compared to the specified value.
`compare_to` | Integer | | The value at which the light level will be compared to.

## Examples

```json
"block_condition": {
    "type": "apoli:light_level",
    "light_type": "block",
    "comparison": ">",
    "compare_to": 10
}
```

This example will check if the light level at the specified position is more than 10, and is emitted by a block.
