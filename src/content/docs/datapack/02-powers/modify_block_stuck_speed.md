---
title: "Modify Block Stuck Speed (Power Type)"
description: "Overrides how much a block such as a cobweb slows the entity down while it is inside it."
navigation_title: "Modify Block Stuck Speed"
---

Overrides how much a block slows the entity down while the entity is inside it. Vanilla uses this mechanic for cobwebs, sweet berry bushes and powder snow. Set `multiplier` to `1.0` to move through them as if they were air.

Type ID: `apoli:modify_block_stuck_speed`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, only blocks that pass this condition are affected. Without it, every block that slows the entity is affected. |
| `multiplier` | [Float](/docs/datapack/data-types/float), or an object with `x`, `y` and `z` | `1.0` | The movement multiplier for each axis, used instead of the block's own. `1.0` means no slowdown at all. Vanilla's cobweb uses `{"x": 0.25, "y": 0.05, "z": 0.25}`. |

The power replaces the block's multiplier instead of scaling it. A value of `1.0` frees the entity completely, and a value lower than the block's own (`0.02` against the cobweb's `0.25`) makes the block stickier. When several matching powers apply, the largest value on each axis wins, so the least restrictive power decides.

A multiplier of `1.0` or higher on every axis turns off vanilla's stuck-in-block handling entirely. It has to, because vanilla clears the entity's velocity whenever any stuck multiplier is set, so leaving the mechanic on with a multiplier of `1.0` would still stop the entity dead every tick. The block still breaks the entity's fall, as it would without the power.

> [!NOTE]
> Two vanilla mechanics are covered: being stuck inside a block (cobweb, sweet berry bush, powder snow), and a block's speed factor (soul sand, honey), which is read from the block at your feet or the one you are standing on. Ladders and vines are limited elsewhere, and water and lava use fluid movement. For swimming speed, use [apoli:modify_swim_speed](/docs/datapack/powers/modify_swim_speed).

## Examples

```json
{
    "type": "apoli:modify_block_stuck_speed",
    "block_condition": {
        "type": "apoli:in_tag",
        "tag": "origins:cobwebs"
    },
    "multiplier": 1.0
}
```

This lets the entity walk through cobwebs freely, while sweet berry bushes and powder snow still slow it as usual.
