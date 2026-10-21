---
title: "Shape (Data Type)"
description: "The outline of a region around a centre point."
navigation_title: "Shape"
---

The outline of a region around a centre point. Area of effect powers and conditions that scan blocks use it together with a `radius`, and it is written as a string.

Sizing each axis separately isn't part of the shape itself. It comes from the `radius` field next to it, which is a [Vector](/docs/datapack/data-types/vector): give `radius` a single number for an even region, or `{ "x": .., "y": .., "z": .. }` to size each axis on its own, where x is left and right, y is up and down, and z is forward and back.

## Values

| `shape` | Region | Rule with one radius | Rule per axis (radius `rx`, `ry`, `rz`) |
| --- | --- | --- | --- |
| `cube` | Box aligned to the axes | `\|dx\| ≤ r`, `\|dy\| ≤ r`, `\|dz\| ≤ r` | `\|dx\| ≤ rx`, `\|dy\| ≤ ry`, `\|dz\| ≤ rz` (a box) |
| `sphere` | Ball | `dx² + dy² + dz² ≤ r²` | `(dx/rx)² + (dy/ry)² + (dz/rz)² ≤ 1` (an ellipsoid) |
| `star` | Octahedron | `\|dx\| + \|dy\| + \|dz\| ≤ r` | `\|dx\|/rx + \|dy\|/ry + \|dz\|/rz ≤ 1` (a stretched octahedron) |
| `cone` | Vertical cone | apex at the centre, opening upward to height `r`, with a base radius that grows with height | apex at the centre, opening upward to height `ry`, with the x and z spread reaching `rx` and `rz` at the top |
| `cube_hollow` | Box shell | the part of `cube` within `hollow_thickness` of its faces | the same, per axis |
| `sphere_hollow` | Ball shell | `r - t < √(dx² + dy² + dz²) ≤ r`, where `t` is `hollow_thickness` | the part of the ellipsoid within `t` of its surface |
| `star_hollow` | Octahedron shell | the part of `star` within `t` of its faces | the same, on the stretched octahedron |
| `cone_hollow` | Cone shell | the part of `cone` within `t` of its slanted side or its top | the same, on the stretched cone |

For powers that work on blocks, the size of each axis is rounded up to whole blocks.

## Hollow shapes

The four `_hollow` shapes keep only the outer layer of their solid shape. A position is inside when it is inside the solid shape and less than `hollow_thickness` from its surface. Everything that takes a `shape` also takes the thickness next to it:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `hollow_thickness` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | `1` | How thick the shell is, in blocks. Ignored by the solid shapes. |

- With a thickness of `1` or more, a hollow shape filled with blocks is sealed, so no block inside touches a block outside face to face. A `sphere_hollow` with a thickness of `1` is a dome or bubble one block thick.
- The thickness is read once each time the action or condition runs. In an entity action or condition, the expression reads the entity's variables, so a shell can grow with a resource. In a block action, only world-level variables are available.
- A thickness of `0` or less selects nothing, and a thickness larger than the radius gives back the solid shape.
- The shell is measured from the surface of the shape the `radius` describes, so on a stretched shape (a `radius` with different x, y and z) it follows the stretched surface.

> [!NOTE]
> `cone` always points straight up, with the apex at the centre and widening as it rises, and it doesn't turn with the entity's facing. For a cone in front of an entity, use the `cone_angle` of [apoli:raycast](/docs/datapack/entity-actions/raycast).

## Examples

```json
"shape": "sphere",
"radius": 6
```

```json
"shape": "cube",
"radius": { "x": 8, "y": 3, "z": 8 }
```

The second makes a flat 17×7×17 slab, a `cube` outline with each axis sized separately through `radius`, which suits area effects that hug the ground.

```json
"shape": "sphere_hollow",
"radius": 8,
"hollow_thickness": 1
```

The third is a hollow ball one block thick. As a [block area of effect](/docs/datapack/block-actions/area_of_effect) that places glass where there is air, it builds a sealed glass dome around the centre.

## Used by

- [apoli:area_of_effect](/docs/datapack/entity-actions/area_of_effect)
- [apoli:area_of_effect](/docs/datapack/block-actions/area_of_effect)
- [apoli:block_in_radius](/docs/datapack/entity-conditions/block_in_radius)
- [apoli:entity_in_radius](/docs/datapack/entity-conditions/entity_in_radius)
- [apoli:modify_tick_rate](/docs/datapack/powers/modify_tick_rate)
- [apoli:distance_from_coordinates](/docs/datapack/entity-conditions/distance_from_coordinates), which measures distance with the shape instead of filling it, so a hollow shape measures like its solid form
