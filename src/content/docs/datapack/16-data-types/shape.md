---
title: "Shape (Data Type)"
description: "The outline of a region around a centre point."
navigation_title: "Shape"
---

The outline of a region around a centre point. Used by area-of-effect powers and block-scanning conditions together with a `radius`. Written as a string.

Per-axis sizing is not part of the shape itself — it comes from the companion `radius` field, which is a [Vector](/docs/datapack/data-types/vector): give `radius` a single number for a uniform region, or `{ "x": .., "y": .., "z": .. }` to size each axis independently (x = left/right, y = up/down, z = forward/back).

## Values

`shape` | Region | Uniform rule | Per-axis rule (radius `rx`, `ry`, `rz`)
--------|--------|--------------|----------------------------------------
`cube` | Axis-aligned box | `\|dx\| ≤ r`, `\|dy\| ≤ r`, `\|dz\| ≤ r` | `\|dx\| ≤ rx`, `\|dy\| ≤ ry`, `\|dz\| ≤ rz` (a box)
`sphere` | Ball | `dx² + dy² + dz² ≤ r²` | `(dx/rx)² + (dy/ry)² + (dz/rz)² ≤ 1` (an ellipsoid)
`star` | Octahedron | `\|dx\| + \|dy\| + \|dz\| ≤ r` | `\|dx\|/rx + \|dy\|/ry + \|dz\|/rz ≤ 1` (a stretched octahedron)
`cone` | Vertical cone | apex at the centre, opening **upward** to height `r`, base radius growing with height | apex at centre, opening upward to height `ry`; the x/z spread reaches `rx`/`rz` at the top

Per-axis extents are rounded up to whole blocks for block-based powers.

> `cone` is oriented straight up (apex at the centre, widening as it rises). It is not yet aimed by the entity's facing — for a forward-facing cone, orient your effect another way for now.

## Examples

```json
"shape": "sphere",
"radius": 6
```

```json
"shape": "cube",
"radius": { "x": 8, "y": 3, "z": 8 }
```

The second makes a flat 17×7×17 slab — a `cube` outline sized independently per axis via `radius` — useful for ground-hugging area effects.

## Used by

- [apoli:area_of_effect](/docs/datapack/entity-actions/area_of_effect)
- [apoli:area_of_effect](/docs/datapack/block-actions/area_of_effect)
- `apoli:block_in_radius` (entity condition)
