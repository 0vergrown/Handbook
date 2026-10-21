---
title: "Shape Type (Data Type)"
description: "A string that decides which block shape a raycast collides with."
navigation_title: "Shape Type"
---

A [String](/docs/datapack/data-types/string) that decides which shape of a block a raycast collides with.

## Values

| Value | Description |
| --- | --- |
| `collider` | The ray only stops at blocks with collision, meaning blocks you can't walk through. |
| `outline` | The ray follows the shape of the block and only stops where it hits one of the block's faces. |
| `visual` | The ray only stops at blocks that aren't transparent, meaning blocks you can't see through. |
