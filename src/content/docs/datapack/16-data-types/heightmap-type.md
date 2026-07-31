---
title: "Heightmap Type (Data Type)"
description: "A String used for various game calculations to determine the highest Y level of a coordinate in a world."
navigation_title: "Heightmap Type"
---

A [String](/docs/datapack/data-types/string) used for various game calculations to determine the highest Y level of a coordinate in a world.

##	Values

Value | Description
------|------------
`world_surface` 			|	Queries the Y level of the highest non-air block.
`world_surface_wg`			|	Queries the Y level of the highest non-air block (**only used on world generation**.)
`ocean_floor`				|	Queries the Y level of the highest block that has collision, except carpets.
`ocean_floor_wg`			|	Queries the Y level of the highest block that has collision, except carpets (**only used on world generation**.)
`motion_blocking`			|	Queries the Y level of the highest block that has collision or contains a fluid (e.g: water, lava, or fluidlogged blocks.)
`motion_blocking_no_leaves`	|	Queries the Y level of the highest block that has collision or contains a fluid, except leaves (e.g: water, lava, or fluidlogged blocks.)
