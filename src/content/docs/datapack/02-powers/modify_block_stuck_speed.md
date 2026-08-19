---
title: "Modify Block Stuck Speed (Power Type)"
description: "Overrides how much a block slows the entity down while it is inside it, such as cobwebs."
navigation_title: "Modify Block Stuck Speed"
---

Overrides how much a block slows the entity down while it is inside it. This is the mechanic vanilla uses for **cobwebs**, **sweet berry bushes** and **powder snow** — set `multiplier` to `1.0` to move through them as if they were air.

Type ID: `apoli:modify_block_stuck_speed`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`block_condition` | Block Condition Type | *optional* | If specified, only blocks that fulfil this condition are affected. Without it, every block that slows the entity is affected.
`multiplier` | Float, or an object with `x`/`y`/`z` | `1.0` | The per-axis movement multiplier used **instead of** the block's own. `1.0` means no slowdown at all; vanilla cobweb uses `{"x": 0.25, "y": 0.05, "z": 0.25}`.

> This **replaces** the block's multiplier rather than scaling it, so a value of `1.0` frees the entity completely — and a value *below* the block's own (`0.02` against cobweb's `0.25`) makes it stickier. When several matching powers apply, the largest value on each axis wins — the least restrictive power decides. Before Apoli 1.38.0 the block's own multiplier was folded into that comparison, so any value under vanilla's was silently ignored.

> A multiplier of `1.0` or higher on every axis skips vanilla's stuck-in-block handling outright, not just its multiplication. It has to: vanilla wipes the entity's velocity whenever *any* stuck multiplier is set, so leaving the mechanic switched on with a multiplier of `1.0` would still stop the entity dead each tick. The block still breaks the entity's fall, exactly as it would without the power.

> Two vanilla mechanics are covered: being **stuck inside** a block (cobweb, sweet berry bush, powder snow) and a block's **speed factor** (soul sand, honey), which is read from the block at your feet or the one you are standing on. Ladders and vines are clamped elsewhere, and water and lava use fluid movement — for swimming speed use [apoli:modify_swim_speed](/docs/datapack/powers/modify_swim_speed) instead.

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

Lets the holder walk through cobwebs unimpeded, while sweet berry bushes and powder snow still slow them normally.
