---
title: "Block In Radius (Entity Condition Type)"
description: "Checks whether there is a specified number of blocks that fulfills the specified Block Condition Type within a specified radius relative to the entity's feet."
navigation_title: "Block In Radius"
---

Checks whether there is a specified number of blocks that fulfills the specified Block Condition Type within a specified radius relative to the entity's feet.

Type ID: `apoli:block_in_radius`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | |  The block condition type to check for.
`radius` | Integer | | The radius of the area to check how many blocks fulfill the `block_condition`.
`shape` | String | `"cube"` | Determines the shape of the radius. Accepts `"cube"`, `"star"` or `"sphere"`.
`comparison` | Comparison | `">="` | Determines how the amount of blocks which fulfill `block_condition` block condition should be compared to the specified value.
`compare_to` | [Integer](/docs/datapack/data-types/integer) OR [Expression](/docs/datapack/data-types/expression) | `1` | The value at which the amount of blocks which fulfill `block_condition` will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:block_in_radius",
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "origins:natural_stone"
    },
    "radius": 1,
    "shape": "cube",
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if 4 or more blocks that is included in the [`origins:natural_stone`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/tags/blocks/natural_stone.json) (`data/origins/tags/blocks/natural_stone.json`) block tag is within a 1 block radius relative from the entity.

## Cost

The condition stops as soon as the count passes `compare_to`, so a `">=" 1` check is cheap when the block is there. Proving a block is **absent** always costs the whole radius: a radius of 5 is 1331 positions, every time the condition is tested.

> That matters most where a condition is tested every tick rather than on an action. [apoli:shader](/docs/datapack/powers/shader) resolves its condition once per player per tick, and a power's own `condition` is checked on every tick of a ticking power. Keep the radius small on those, or drive them from a resource that a cheaper power updates on an interval.

## An Expression threshold

`compare_to` accepts a full [Expression](/docs/datapack/data-types/expression), so the threshold does not have to be a literal. It is evaluated against the entity holding the power each time the condition is tested:

```json
"condition": {
  "type": "apoli:block_in_radius",
  "radius": 4,
  "block_condition": {
    "type": "apoli:block",
    "block": "minecraft:water"
  },
  "comparison": ">=",
  "compare_to": "example:crowd_threshold"
}
```
