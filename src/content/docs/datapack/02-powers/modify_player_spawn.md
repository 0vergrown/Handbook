---
title: "Modify Player Spawn (Power Type)"
description: "Moves the player's spawn point to a dimension, biome or structure."
navigation_title: "Modify Player Spawn"
---

Moves the player's spawn point to the dimension you choose, and optionally to a biome or structure in it.

Type ID: `apoli:modify_player_spawn`

The Minecraft Wiki lists the [structure IDs](https://minecraft.wiki/w/Generated_structures#ID) and the [biome IDs](https://minecraft.wiki/w/Biome#Biome_IDs).

> [!WARNING]
> Locating a structure is expensive, so it can take a second or two, or longer, before the player is teleported after choosing the power.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimension` | [Identifier](/docs/datapack/data-types/identifier) | | The dimension the player spawns in. |
| `biome` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the player only spawns in this biome. |
| `structure` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | If set, the player only spawns in this structure. The structure has to generate in the chosen dimension. |
| `spawn_strategy` | [String](/docs/datapack/data-types/string) | `"default"` | `"center"` spawns the player near the dimension's center (0, 0). `"default"` spawns them near the Overworld spawn point, scaled by `dimension_distance_multiplier`. |
| `dimension_distance_multiplier` | [Float](/docs/datapack/data-types/float) | _optional_ | The ratio of Overworld blocks to blocks in the chosen dimension, for example `0.125` for the Nether. Set it whenever `spawn_strategy` is `"default"`. |

## When it applies

- When the player chooses an origin that grants the power, they are teleported to the located spawn straight away.
- When the player dies with no respawn point, or their bed or respawn anchor is gone.

A player who has slept in a bed keeps that bed. The power only fills the gap vanilla would fill with the world spawn. The located spawn is stored as a forced respawn point, so the search runs once instead of on every death, and it is cleared if the player loses the power.

## Examples

```json
{
  "type": "apoli:modify_player_spawn",
  "dimension": "minecraft:the_end",
  "structure": "minecraft:end_city",
  "spawn_strategy": "center"
}
```

This makes the player spawn at an End City in the End.
