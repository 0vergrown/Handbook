---
title: "Distance From Coordinates (Block Condition Type)"
description: "Compares the distance of the block's current position to the specified coordinates."
navigation_title: "Distance From Coordinates"
---

Compares the distance of the block's current position to the specified coordinates.

Type ID: `apoli:distance_from_coordinates`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`reference` | String | `"world_origin"` | The point to compare the distance to. Accepts `"world_origin"` or `"world_spawn"`.
`offset` | Vector | _optional_ | If specified, determines how much the reference point should be offset.
`ignore_x` | Boolean | `false` | Determines whether to consider the X axis to be 0.
`ignore_y` | Boolean | `false` | Determines whether to consider the Y axis to be 0.
`ignore_z` | Boolean | `false` | Determines whether to consider the Z axis to be 0.
`shape` | String | `"cube"` | Determines the shape of the check. Accepts `"cube"`, `"star"` or `"sphere"`.
`scale_reference_to_dimension` | Boolean | `true` | Determines whether to check for the reference point whilst considering the coordinate scale of the dimension.
`result_on_the_wrong_dimension` | Boolean | _optional_ | If specified, this value will override the result of the comparison if the block being tested is not in the reference's dimension.
`round_to_digit` | Integer | _optional_ | If specified, rounds the result to the closest number with the specified amount of digits after the comma. Negative numbers also work (e.g: `-2` rounds to multiples of 100).
`comparison` | Comparison | | Determines how the calculated distance (in blocks) should be compared to the specified value.
`compare_to` | Float | | The value at which the calculated distance (in blocks) will be compared to.

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

This example will check if the block is within an 8 blocks radius relative to the specified coordinates (X: 1024, Z: 512).
