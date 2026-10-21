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

`hardness_modifier` is applied to the block's hardness before vanilla divides by it, and `modifier` is applied to the progress made each tick. Both also run on the client, so the crack animation matches the server. The result of the hardness modifiers is never lower than `-1`, the hardness of an unbreakable block.

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
