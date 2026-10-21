---
title: "Heightmap Type (Data Type)"
description: "A string that picks which kind of highest block the game looks for at a position."
navigation_title: "Heightmap Type"
---

A [String](/docs/datapack/data-types/string) that picks a heightmap, which the game uses to find the highest Y level at a position in a world.

## Values

| Value | Description |
| --- | --- |
| `world_surface` | The Y level of the highest block that isn't air. |
| `world_surface_wg` | The Y level of the highest block that isn't air, only used during world generation. |
| `ocean_floor` | The Y level of the highest block with collision, except carpets. |
| `ocean_floor_wg` | The Y level of the highest block with collision, except carpets, only used during world generation. |
| `motion_blocking` | The Y level of the highest block that has collision or contains a fluid, such as water, lava or a waterlogged block. |
| `motion_blocking_no_leaves` | The Y level of the highest block that has collision or contains a fluid, except leaves. |
