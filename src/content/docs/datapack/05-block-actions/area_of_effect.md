---
title: "apoli:area_of_effect"
description: "Executes the provided Block Action Type on all blocks within the specified radius and shape."
---

Executes the provided Block Action Type on all blocks within the specified radius and shape.

Type ID: `apoli:area_of_effect`


## Fields

Field | Type | Default | Description
------|------|---------|------------
`radius` | [Vector](/docs/datapack/data-types/vector) | `16` | The size of the area — a single number (uniform on all axes) or `{"x":.., "y":.., "z":..}` for independent per-axis extents (e.g. a flat layer).
`shape` | [Shape](/docs/datapack/data-types/shape) | `"cube"` | The outline of the area: `cube`, `sphere`, `star`, or `cone`.
`block_action` | Block Action Type | | The block action to execute on the blocks within the specified radius.
`block_condition` | Block Condition Type | *optional* | If specified, the specified block action will only be executed on blocks that fulfill this block condition.


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

This example will make all waterloggable blocks not waterlogged within 16 blocks radius with a shape of a cube.

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

This example will replace all blocks that aren't included in the `#minecraft:dragon_immune` block tag with air within a 4 blocks radius with a shape of a diamond.

