---
title: "origins:block_in_radius"
description: "[Entity Condition Type](../entityconditiontypes.md)"
---

Entity Condition Type

Checks whether there is a specified number of blocks that fulfills the specified Block Condition Type within a specified radius relative to the entity's feet.

Type ID: `origins:block_in_radius`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | |  The block condition type to check for.
`radius` | Integer | | The radius of the area to check how many blocks fulfill the `block_condition`.
`shape` | String | `"cube"` | Determines the shape of the radius. Accepts `"cube"`, `"star"` or `"sphere"`.
`comparison` | Comparison | `">="` | Determines how the amount of blocks which fulfill `block_condition` block condition should be compared to the specified value.
`compare_to` | Integer | `1` | The value at which the amount of blocks which fulfill `block_condition` will be compared to.


## Examples

```json
"condition": {
    "type": "origins:block_in_radius",
    "block_condition": {
        "type": "origins:in_tag",
        "tag": "origins:natural_stone"
    },
    "radius": 1,
    "shape": "cube",
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if 4 or more blocks that is included in the [`origins:natural_stone`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/tags/blocks/natural_stone.json) (`data/origins/tags/blocks/natural_stone.json`) block tag is within a 1 block radius relative from the entity.
