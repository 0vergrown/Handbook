---
title: "Light Level (Block Condition Type)"
description: "Compares the light level at the block's position with a number."
navigation_title: "Light Level"
---

Compares the light level at the block's position with a number.

Type ID: `apoli:light_level`

> [!NOTE]
> Without a `light_type`, the light level used is the higher of the block light level and the internal sky light level at the position.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `light_type` | [String](/docs/datapack/data-types/string) | _optional_ | Which kind of light to compare: `"sky"` or `"block"`. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the light level is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the light level is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:light_level",
    "light_type": "block",
    "comparison": ">",
    "compare_to": 10
}
```

This checks whether the block light at the position, the light given off by blocks, is above 10.
