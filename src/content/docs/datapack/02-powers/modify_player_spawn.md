---
title: "origins:modify_player_spawn"
description: "[Power Type](../powertypes.md)"
---

Power Type

Modifies the location of the player's spawnpoint to the specified dimension, biome and/or structure.

Type ID: `origins:modify_player_spawn`


!!! note

    See [Minecraft Wiki: Generated structures (IDs)](https://minecraft.wiki/w/Generated_structures#ID) and [Minecraft Wiki: Biome (Biome IDs)](https://minecraft.wiki/w/Biome#Biome_IDs) for a list of structure IDs and biome IDs respectively.

!!! warning

    Keep in mind that structure location is costly and it might take one or two seconds (or longer) before the player gets teleported when choosing the power.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`dimension` | Identifier | | The namespace and ID of the dimension the player should spawn in.
`biome` | Identifier | _optional_ | If specified, the player will only spawn in the biome that matches the specified namespace and ID.
`structure` | Identifier | _optional_ | If specified, the player will only spawn in the specified namespace and ID of the structure. **The structure needs to generate in the specified dimension.**
`spawn_strategy` | String | `"default"` | Determines whether the player should spawn near the world spawnpoint (0, 0) of the dimension (`"center"`) or near the coordinates of the Overworld spawnpoint (whilst considering the value of the `dimension_distance_multiplier` field) (`"default"`).
`dimension_distance_multiplier` | Float | _optional_ | Defines the ratio of Overworld blocks to blocks in the specified dimension. e.g: for The Nether dimension, this would be set to `0.125`. **This needs to be set when `spawn_strategy` is set to `"default"`**


## Examples

```json
{
  "type": "origins:modify_player_spawn",
  "dimension": "minecraft:the_end",
  "structure": "minecraft:end_city",
  "spawn_strategy": "center"
}
```

This example will let players spawn at an End City in The End dimension.

