---
title: "Block In Radius (Entity Condition Type)"
description: "Counts the blocks around the entity that pass a condition and compares the count with a number."
navigation_title: "Block In Radius"
---

Counts the blocks within an area around the entity's feet that pass a block condition, and compares the count with a number.

Type ID: `apoli:block_in_radius`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The condition a block must pass to be counted. |
| `radius` | [Vector](/docs/datapack/data-types/vector) | _required_ | The size of the area to check: a single number for every axis, or `{"x":.., "y":.., "z":..}` for each axis. |
| `shape` | [Shape](/docs/datapack/data-types/shape) | `"cube"` | The shape of the area: `cube`, `sphere`, `star`, `cone`, or a hollow one (`cube_hollow`, `sphere_hollow`, `star_hollow`, `cone_hollow`). |
| `hollow_thickness` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | How thick a hollow `shape` is, in blocks. Ignored by the solid shapes. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | `">="` | How the count is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `1` | The number the count is compared with. |

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

This checks whether 4 or more blocks from the [`origins:natural_stone`](https://github.com/apace100/origins-fabric/blob/master/src/main/resources/data/origins/tags/blocks/natural_stone.json) block tag (`data/origins/tags/blocks/natural_stone.json`) are within 1 block of the entity.

## Cost

The condition stops as soon as the count passes `compare_to`, so a `">=" 1` check is cheap when the block is there. Proving a block isn't there always costs the whole area: a radius of 5 is 1331 positions, every time the condition is tested.

> [!WARNING]
> That matters most where a condition is tested every tick instead of on an action. [apoli:shader](/docs/datapack/powers/shader) resolves its condition once per player per tick, and a power's own `condition` is checked on every tick of a power that ticks. Keep the radius small on those, or drive them from a resource that a cheaper power updates on an interval.

## An expression threshold

`compare_to` accepts a full [expression](/docs/datapack/data-types/expression), so the threshold doesn't have to be a fixed number. It is evaluated against the entity holding the power each time the condition is tested:

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
