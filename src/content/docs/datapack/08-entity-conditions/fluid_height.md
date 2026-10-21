---
title: "Fluid Height (Entity Condition Type)"
description: "Compares how high a fluid reaches on the entity with a number."
navigation_title: "Fluid Height"
---

Compares how high a fluid reaches on the entity with a number. A fluid height of 0 means the entity isn't touching the fluid.

Type ID: `apoli:fluid_height`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `fluid` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The ID of the fluid tag to measure, most often `minecraft:water` or `minecraft:lava`. The leading `#` is optional. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the fluid height is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the fluid height is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:fluid_height",
    "fluid": "minecraft:lava",
    "comparison": "==",
    "compare_to": 0
}
```

This checks whether the entity isn't touching lava.
