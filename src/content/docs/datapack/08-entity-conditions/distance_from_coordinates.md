---
title: "Distance From Coordinates (Entity Condition Type)"
description: "Compares the entity's distance from a point, such as the world origin or spawn, with a number."
navigation_title: "Distance From Coordinates"
---

Compares the distance between the entity and a point, such as the world origin or the world spawn, with a number.

Type ID: `apoli:distance_from_coordinates`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `reference` | [String](/docs/datapack/data-types/string) | `"world_origin"` | The point to measure from: `"world_origin"` or `"world_spawn"`. |
| `offset` | [Vector](/docs/datapack/data-types/vector) | _optional_ | Moves the reference point by this much. |
| `ignore_x` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to treat the X axis as 0. |
| `ignore_y` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to treat the Y axis as 0. |
| `ignore_z` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether to treat the Z axis as 0. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `"cube"` | How the distance is measured. `"cube"` takes the largest axis, `"star"` adds the axes up, and `"sphere"` is the straight-line distance. `"cone"` measures like `"sphere"`, and a hollow shape measures like its solid form. |
| `scale_reference_to_dimension` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the reference point takes the dimension's coordinate scale into account. |
| `result_on_the_wrong_dimension` | [Boolean](/docs/datapack/data-types/boolean) | _optional_ | When set, this is the result whenever the entity isn't in the reference point's dimension. |
| `round_to_digit` | [Integer](/docs/datapack/data-types/integer) | _optional_ | Rounds the distance to this many digits after the decimal point. Negative numbers work too, so `-2` rounds to multiples of 100. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the distance is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the distance is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:distance_from_coordinates",
    "offset": {
        "x": 256,
        "y": 64,
        "z": 32
    },
    "shape": "sphere",
    "comparison": "<",
    "compare_to": 8
}
```

This checks whether the entity is within 8 blocks of the point at X 256, Y 64, Z 32.

```json
"condition": {
    "type": "apoli:distance_from_coordinates",
    "reference": "world_spawn",
    "shape": "cube",
    "ignore_y": true,
    "comparison": "<",
    "compare_to": 4
}
```

This checks whether the player is within 4 blocks of the world spawn horizontally, measured as a square.
