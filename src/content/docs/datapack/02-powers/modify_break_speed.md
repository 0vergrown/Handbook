---
title: "Modify Break Speed (Power Type)"
description: "Changes how fast the player that has the power breaks blocks."
navigation_title: "Modify Break Speed"
---

Changes how fast the player that has the power breaks blocks.

Type ID: `apoli:modify_break_speed`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the modifiers only apply to blocks that pass this condition. |
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the break speed. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the break speed. |
| `hardness_modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the block's effective hardness while the break speed is worked out. |
| `hardness_modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the block's effective hardness while the break speed is worked out. |
| `connected_blocks` | [Connected Blocks](/docs/datapack/data-types/connected-blocks) | _optional_ | If set, the [expression](/docs/datapack/data-types/expression) variable `count` in the modifiers is the number of blocks connected to the one being broken, found the same way as in [apoli:connected_blocks](/docs/datapack/block-actions/connected_blocks). |

`hardness_modifier` is applied to the block's hardness before vanilla divides by it, and `modifier` is applied to the progress made each tick. Both also run on the client, so the crack animation matches the server. The result of the hardness modifiers is never lower than `-1`, the hardness of an unbreakable block.

When several matching powers set `connected_blocks`, `count` comes from the first of them, and every modifier of every matching power sees that number. The group is worked out at most once per tick for a block.

## Examples

```json
{
	"type": "apoli:modify_break_speed",
	"block_condition": {
		"type": "apoli:block",
		"block": "minecraft:netherrack"
	},
	"modifier": {
		"operation": "multiply_base",
		"value": 0.5
	}
}
```

This lets the player break netherrack 50% faster than usual.

```json
{
	"type": "apoli:modify_break_speed",
	"block_condition": {
		"type": "apoli:hardness",
		"comparison": ">=",
		"compare_to": 0
	},
	"modifier": {
		"operation": "multiply_base",
		"value": -0.9
	},
	"hardness_modifier": {
		"operation": "min_total",
		"value": 0.1
	}
}
```

This makes the player break blocks 90% slower than usual. Blocks that normally break instantly have a hardness of `0`, so `min_total` raises their hardness to `0.1` and the slowdown reaches them too. The `block_condition` leaves unbreakable blocks, with a hardness of `-1`, alone.

```json
{
	"type": "apoli:modify_break_speed",
	"block_condition": {
		"type": "apoli:in_tag",
		"tag": "minecraft:logs"
	},
	"connected_blocks": {
		"downward": false,
		"limit": 256
	},
	"modifier": {
		"operation": "multiply_total_multiplicative",
		"value": "1 / max(1, ceil(0.75 * count)) - 1"
	}
}
```

Breaking a log takes longer the more logs of the same kind are connected above and beside it: with eight more above it, it takes six times as long. A log on its own breaks at the usual speed. Paired with an [apoli:action_on_block_break](/docs/datapack/powers/action_on_block_break) that fells the same logs, chopping a whole tree takes about three quarters of the time its logs would take one by one.
