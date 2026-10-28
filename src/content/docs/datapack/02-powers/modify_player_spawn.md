---
title: "Modify Player Spawn (Power Type)"
description: "Moves the player's spawn point to a dimension, biome or structure."
navigation_title: "Modify Player Spawn"
---

Moves the player's spawn point to the dimension you choose. Inside it, the spawn can also be pulled to a biome or a structure, or limited to spots where a block condition passes.

Type ID: `apoli:modify_player_spawn`

The Minecraft Wiki lists the [structure IDs](https://minecraft.wiki/w/Generated_structures#ID) and the [biome IDs](https://minecraft.wiki/w/Biome#Biome_IDs).

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `dimension` | [Identifier](/docs/datapack/data-types/identifier) | _required_ | The dimension the player spawns in. |
| `biome` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The player spawns in the nearest biome with this ID. |
| `biome_condition` | [Biome Condition Type](/docs/datapack/biome-conditions) | _optional_ | The player spawns in the nearest biome that passes this condition. If `biome` is set too, a biome that matches either one counts. |
| `structure` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The player spawns at the nearest structure with this ID. The structure has to generate in the chosen dimension. |
| `structure_tag` | [Identifier](/docs/datapack/data-types/identifier) | _optional_ | The ID of a structure tag, such as `minecraft:village`. The player spawns at the nearest structure in the tag. The leading `#` is optional. If `structure` is set too, the nearest structure from either one is used. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | A spot is only accepted when this condition passes for the block at the player's feet. |
| `spawn_strategy` | [String](/docs/datapack/data-types/string) | `"default"` | `"center"` spawns the player near the dimension's center (0, 0). `"default"` spawns them near the Overworld spawn point, scaled by `dimension_distance_multiplier`. |
| `dimension_distance_multiplier` | [Float](/docs/datapack/data-types/float) | _optional_ | The ratio of Overworld blocks to blocks in the chosen dimension, for example `0.125` for the Nether. Set it whenever `spawn_strategy` is `"default"`. |
| `search_radius` | [Integer](/docs/datapack/data-types/integer) | `32` | How many blocks the search for a safe spot reaches in each direction from the point it starts at. It must be between `1` and `64`, and a value outside that range is clamped with a warning in the log. |

## How the spawn is found

1. The search starts at the point `spawn_strategy` picks.
2. With `biome` or `biome_condition`, it moves to the nearest matching biome within 6400 blocks. This is the same search `/locate biome` runs.
3. With `structure` or `structure_tag`, it then moves to the nearest matching structure within 100 chunks.
4. Around that point it checks every column within `search_radius` blocks, nearest first. Each column is scanned up and down from the middle of the dimension, and the first spot with room for the player, a floor to stand on and nothing harmful such as fire or lava, that also passes `block_condition`, becomes the spawn. The scan stays inside the dimension's logical height, so it never puts the player on top of the Nether's bedrock roof.

`block_condition` is tested on the block the player's feet are in, which is usually air, or water for a spot under water. To test the floor instead, wrap the condition in [apoli:offset](/docs/datapack/meta-conditions/offset) with `"y": -1`, as the last example does.

If no matching biome or structure is found, the player keeps their current spawn point and gets a chat message naming what was missing. If no column within `search_radius` has a safe spot, the player also keeps their spawn point, and the server log names the player and the point the search started from.

> [!WARNING]
> Finding a biome or a structure can take a second or two, and the server waits for it. The result is reused for every player with the same power until the data pack reloads, so the wait only happens once. A `block_condition` that few spots pass can make the safe-spot search scan every column within `search_radius`, which is why the radius is capped at 64. When that search finds nothing, it isn't tried again for five minutes.

## When it applies

- When the player chooses an origin that grants the power, they are teleported to the located spawn straight away.
- When the player dies with no respawn point, or their bed or respawn anchor is gone.
- When the player leaves the End through the exit portal, or [apoli:teleport_to_spawn](/docs/datapack/entity-actions/teleport_to_spawn) sends them to their spawn point, with no respawn point set.

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

```json
{
  "type": "apoli:modify_player_spawn",
  "dimension": "minecraft:overworld",
  "structure_tag": "minecraft:village"
}
```

This makes the player spawn at the village nearest the world spawn, whatever kind of village it is.

```json
{
  "type": "apoli:modify_player_spawn",
  "dimension": "minecraft:overworld",
  "biome_condition": {
    "type": "apoli:in_tag",
    "tag": "minecraft:is_forest"
  }
}
```

This makes the player spawn in the nearest forest biome.

```json
{
  "type": "apoli:modify_player_spawn",
  "dimension": "minecraft:overworld",
  "search_radius": 16,
  "block_condition": {
    "type": "apoli:offset",
    "y": -1,
    "condition": {
      "type": "apoli:block",
      "block": "minecraft:grass_block"
    }
  }
}
```

This keeps the player near the world spawn but only lets them spawn standing on a grass block, checking up to 16 blocks away.
