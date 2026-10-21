---
title: "Destruction Type (Data Type)"
description: "A string that decides what an explosion does to the terrain."
navigation_title: "Destruction Type"
---

A [String](/docs/datapack/data-types/string) that decides what an explosion does to the terrain.

## Values

| Value | Description |
| --- | --- |
| `break` | The explosion destroys blocks and drops their loot. |
| `none` | The explosion doesn't destroy blocks or drop their loot. |
| `destroy` | The explosion destroys blocks and drops the loot of only some of them. The chance gets lower as the explosion's power goes up, and the `minecraft:survives_explosion` loot condition in loot tables is checked too. |
