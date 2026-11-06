---
title: "Glow (Block Action Type)"
description: "Highlights a block with a colored outline or by drawing it through walls, for the players you choose."
navigation_title: "Glow"
---

Highlights the block at the action's position. It either gets a colored outline that shows through other blocks, like an entity with the Glowing effect, or the block itself is drawn in front of everything else. The glow can be limited to the players who pass an entity condition.

Type ID: `apoli:glow`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `red` | [Float](/docs/datapack/data-types/float) | `1.0` | Red part of the color, from `0` to `1`. `r` is accepted as an alias. |
| `green` | [Float](/docs/datapack/data-types/float) | `1.0` | Green part of the color, from `0` to `1`. `g` is accepted as an alias. |
| `blue` | [Float](/docs/datapack/data-types/float) | `1.0` | Blue part of the color, from `0` to `1`. `b` is accepted as an alias. |
| `mode` | [String](/docs/datapack/data-types/string) | `"outline"` | `"outline"` draws a colored outline around the block. `"glow"` draws the block itself in front of every other block. See [Modes](#modes). |
| `respect_bounding` | [Boolean](/docs/datapack/data-types/boolean) | `true` | With `true`, the glow follows the block's own shape. With `false`, it is a full cube whatever the block is. |
| `entity_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, only players who pass this condition see the glow. |
| `duration` | [Integer](/docs/datapack/data-types/integer) | `20` | How many ticks the glow lasts. `0` or less keeps it until the block changes. |

## Modes

`"outline"` draws an outline in the glow's color around the block, and the outline shows through walls and other blocks. It looks like the Glowing effect on an entity, and glowing blocks of the same color that touch share one outline. With `respect_bounding` on, the outline follows the same shape as the box you see when you aim at the block, so a torch, a slab or a fence gets an outline that fits it. A block with no box of its own, such as a fluid, gets a full cube.

`"glow"` draws the block in front of everything else at full brightness, so you see the real block, with its texture, through any wall between you and it. Blocks that render as block entities, such as chests, signs and beds, are drawn too, facing the way they face in the world. The color tints the block, and the default white leaves it as it is. With `respect_bounding` off, a cube with the block's texture is drawn instead of the block's own model.

## Who sees it and for how long

Without `entity_condition`, every player in the dimension sees the glow. With it, the server checks each player every quarter of a second, and players start or stop seeing the glow as they pass or fail the condition. The condition runs on the server, so any entity condition works.

A glow ends when its `duration` runs out, or straight away when the block at its position changes into a different block, for example when it is mined or replaced. A change of state on the same block, such as a furnace lighting up, keeps it glowing. Running the action again on a glowing block replaces the old glow with the new one. Glows are saved with the world, so a glow with no time limit is still there after a restart, and a timed one carries on counting down.

> [!WARNING]
> A player's game draws at most 8192 outlined blocks and 2048 glow mode blocks at once, and each of them costs a little every frame. Keep the `block_condition` of an [apoli:area_of_effect](/docs/datapack/block-actions/area_of_effect) narrow, such as one kind of ore, instead of glowing every block in a large radius.

## Examples

```json
{
    "type": "apoli:action_on_key_press",
    "key": "key.origins.primary_active",
    "cooldown": 200,
    "entity_action": {
        "type": "apoli:block_action_at",
        "block_action": {
            "type": "apoli:area_of_effect",
            "radius": 25,
            "shape": "sphere",
            "block_condition": {
                "type": "apoli:block",
                "block": "minecraft:diamond_ore"
            },
            "block_action": {
                "type": "apoli:glow",
                "r": 0,
                "g": 1,
                "b": 1,
                "mode": "outline",
                "duration": 100
            }
        }
    }
}
```

Pressing the primary key outlines every diamond ore within 25 blocks in cyan for 5 seconds, and every player sees it.

```json
"block_action": {
    "type": "apoli:glow",
    "mode": "glow",
    "duration": 0,
    "entity_condition": {
        "type": "apoli:sneaking"
    }
}
```

This draws the block through walls until it is mined or replaced, and only players who are sneaking can see it.
