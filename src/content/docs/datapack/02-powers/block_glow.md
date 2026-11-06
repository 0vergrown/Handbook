---
title: "Block Glow (Power Type)"
description: "Highlights the blocks around the player that pass a block condition, for that player only."
navigation_title: "Block Glow"
---

Highlights the blocks near the player that pass a block condition, with a colored outline or by drawing them through walls. Only the player with the power sees the glow.

Type ID: `apoli:block_glow`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _required_ | The blocks that glow. |
| `red` | [Float](/docs/datapack/data-types/float) | `1.0` | Red part of the color, from `0` to `1`. `r` is accepted as an alias. |
| `green` | [Float](/docs/datapack/data-types/float) | `1.0` | Green part of the color, from `0` to `1`. `g` is accepted as an alias. |
| `blue` | [Float](/docs/datapack/data-types/float) | `1.0` | Blue part of the color, from `0` to `1`. `b` is accepted as an alias. |
| `mode` | [String](/docs/datapack/data-types/string) | `"outline"` | `"outline"` draws a colored outline that shows through walls. `"glow"` draws the blocks themselves in front of every other block. |
| `respect_bounding` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true`, the glow follows each block's own shape. With `false`, it is a full cube. |
| `distance` | [Float](/docs/datapack/data-types/float) | `16` | How far from the player, in blocks, blocks can glow. Values above `64` are treated as `64`. |

The modes and `respect_bounding` look the same as on the [apoli:glow](/docs/datapack/block-actions/glow#modes) block action.

## How blocks are found

The player's own game looks through the chunks around them for blocks that pass `block_condition`, a few sections at a time, so a large `distance` fills in over a few moments instead of all at once. Each part of the world is looked at again when a block in it changes and every five seconds, so a new matching block starts glowing shortly after it appears, and a block that is mined stops glowing at once.

The power's own `condition` is decided by the server, so it can use any entity condition.

> [!NOTE]
> `block_condition` runs on the player's game, so it only sees what the game knows about the world: block IDs and states, tags, light levels, heights and the blocks around it. Block entity data the server doesn't send to players, such as what is inside a chest, isn't there, so a condition on it never passes.

> [!TIP]
> The cost grows with `distance` and with how much work `block_condition` does for every block. A single block ID or tag over 16 to 32 blocks is cheap. Leave large distances for rare blocks, where few of them are drawn.

## Examples

```json
{
    "type": "apoli:block_glow",
    "block_condition": {
        "type": "apoli:block",
        "block": "minecraft:diamond_ore"
    },
    "r": 0,
    "g": 1,
    "b": 1,
    "mode": "outline",
    "distance": 25
}
```

The player sees a cyan outline around every diamond ore within 25 blocks, through any stone in the way.

```json
{
    "type": "apoli:block_glow",
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "minecraft:logs"
    },
    "mode": "glow",
    "distance": 12,
    "condition": {
        "type": "apoli:sneaking"
    }
}
```

While the player sneaks, every log within 12 blocks is drawn through walls at full brightness.
