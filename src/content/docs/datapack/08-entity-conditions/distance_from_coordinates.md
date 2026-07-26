---
title: "origins:distance_from_coordinates"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Compares the distance of the entity's current position to the specified coordinates.

Type ID: `origins:distance_from_coordinates`


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
`result_on_the_wrong_dimension` | Boolean | _optional_ | If specified, this value will override the result of the comparison if the entity being tested is not in the reference's dimension.
`round_to_digit` | Integer | _optional_ | If specified, rounds the result to the closest number with the specified amount of digits after the comma. Negative numbers also work (e.g: `-2` rounds to multiples of 100).
`comparison` | Comparison | | Determines how the calculated distance should be compared to the specified value.
`compare_to` | Float | | The value at which the calculated distance is compared to.


## Examples

```json
"condition": {
    "type": "origins:distance_from_coordinates",
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

This example will check if the entity is within an 8 blocks radius relative to the specified coordinates (X: 256, Y: 64, Z: 32).



```json
"condition": {
    "type": "origins:distance_from_coordinates",
    "reference": "world_spawn",
    "shape": "cube",
    "ignore_y": true,
    "comparison": "<",
    "compare_to": 4
}
```

This example will check if the player is within a 4 blocks radius relative to the world spawn.

