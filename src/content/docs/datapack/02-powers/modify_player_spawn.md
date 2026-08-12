---
title: "Modify Player Spawn (Power Type)"
description: "Modifies the location of the player's spawnpoint to the specified dimension, biome and/or structure."
navigation_title: "Modify Player Spawn"
---

Modifies the location of the player's spawnpoint to the specified dimension, biome and/or structure.

Type ID: `apoli:modify_player_spawn`

> See [Minecraft Wiki: Generated structures (IDs)](https://minecraft.wiki/w/Generated_structures#ID) and [Minecraft Wiki: Biome (Biome IDs)](https://minecraft.wiki/w/Biome#Biome_IDs) for a list of structure IDs and biome IDs respectively.


> Keep in mind that structure location is costly and it might take one or two seconds (or longer) before the player gets teleported when choosing the power.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`dimension` | Identifier | | The namespace and ID of the dimension the player should spawn in.
`biome` | Identifier | _optional_ | If specified, the player will only spawn in the biome that matches the specified namespace and ID.
`structure` | Identifier | _optional_ | If specified, the player will only spawn in the specified namespace and ID of the structure. **The structure needs to generate in the specified dimension.**
`spawn_strategy` | String | `"default"` | Determines whether the player should spawn near the world spawnpoint (0, 0) of the dimension (`"center"`) or near the coordinates of the Overworld spawnpoint (whilst considering the value of the `dimension_distance_multiplier` field) (`"default"`).
`dimension_distance_multiplier` | Float | _optional_ | Defines the ratio of Overworld blocks to blocks in the specified dimension. e.g: for The Nether dimension, this would be set to `0.125`. **This needs to be set when `spawn_strategy` is set to `"default"`**

## When it applies

- **On choosing an origin** that grants the power, the player is teleported to the located spawn straight away.
- **On death**, if the player has no respawn point, or their bed or respawn anchor is gone.

A player who has slept in a bed keeps that bed — the power only fills the gap vanilla would fill with the world spawn. The located spawn is stored as a forced respawn point, so the search runs once rather than on every death, and it is cleared again if the player loses the power.

## Examples

```json
{
  "type": "apoli:modify_player_spawn",
  "dimension": "minecraft:the_end",
  "structure": "minecraft:end_city",
  "spawn_strategy": "center"
}
```

This example will let players spawn at an End City in The End dimension.
