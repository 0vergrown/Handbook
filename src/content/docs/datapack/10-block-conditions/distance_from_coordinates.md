---
title: "Distance From Coordinates (Block Condition Type)"
description: "Compares the block's distance from a point, such as the world origin or spawn, with a number."
navigation_title: "Distance From Coordinates"
---

Compares the distance between the block and a point, such as the world origin or the world spawn, with a number.

Type ID: `apoli:distance_from_coordinates`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `reference` | [String](/docs/datapack/data-types/string) | `"world_origin"` | The point to measure from: `"world_origin"` or `"world_spawn"`. |
| `offset` | [Vector](/docs/datapack/data-types/vector) | _optional_ | Moves the reference point by this much. |
| `ignore_x` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to treat the X axis as 0. |
| `ignore_y` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to treat the Y axis as 0. |
| `ignore_z` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to treat the Z axis as 0. |
| `shape` | [String](/docs/datapack/data-types/string) | `"cube"` | How the distance is measured. `"cube"` takes the largest axis, `"star"` adds the axes up, and `"sphere"` is the straight-line distance. A hollow shape name measures like its solid form, and any other name measures like `"sphere"`. |
| `scale_reference_to_dimension` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the reference point takes the dimension's coordinate scale into account. |
| `result_on_the_wrong_dimension` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | When set, this is the result whenever the block isn't in the reference point's dimension. |
| `round_to_digit` | [Integer](/docs/datapack/data-types/integer) | _optional_ | Rounds the distance to this many digits after the decimal point. Negative numbers work too, so `-2` rounds to multiples of 100. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the distance, in blocks, is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the distance is compared with. |

## Examples

```json
"block_condition": {
    "type": "apoli:distance_from_coordinates",
    "offset": {
        "x": 1024,
        "z": 512
    },
    "ignore_y": true,
    "comparison": "<",
    "compare_to": 8
}
```

This checks whether the block is within 8 blocks of X 1024, Z 512, ignoring height.
