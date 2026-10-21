---
title: "Area Of Effect (Block Action Type)"
description: "Runs a block action on every block in an area of a given size and shape."
navigation_title: "Area Of Effect"
---

Runs a block action on every block in an area of a given size and shape.

Type ID: `apoli:area_of_effect`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `radius` | [Vector](/docs/datapack/data-types/vector) | `16` | The size of the area: a single number for the same size on every axis, or `{"x":.., "y":.., "z":..}` for a separate size on each axis, such as a flat layer. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `"cube"` | The outline of the area: `cube`, `sphere`, `star`, `cone`, or a hollow one (`cube_hollow`, `sphere_hollow`, `star_hollow`, `cone_hollow`). |
| `hollow_thickness` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | How thick a hollow `shape` is, in blocks. Only world-level expression variables are available here. Ignored by the solid shapes. |
| `block_action` | [Block Action Type](/docs/datapack/block-actions) | _required_ | The block action to run on each block in the area. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | The action only runs on blocks that pass this condition. |

## Examples

```json
"block_action": {
    "type": "apoli:area_of_effect",
    "radius": 16,
    "shape": "cube",
    "block_action": {
        "type": "apoli:modify_block_state",
        "property": "waterlogged",
        "value": false
    }
}
```

This un-waterlogs every waterloggable block in a cube with a radius of 16 blocks.

```json
"block_action": {
    "type": "apoli:area_of_effect",
    "radius": 4,
    "shape": "star",
    "block_action": {
        "type": "apoli:set_block",
        "block": "minecraft:air"
    },
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:dragon_immune",
        "inverted": true
    }
}
```

This replaces every block that isn't in the `#minecraft:dragon_immune` block tag with air, within 4 blocks, in the `star` shape, which is a diamond.
