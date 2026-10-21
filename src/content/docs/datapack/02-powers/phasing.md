---
title: "Phasing (Power Type)"
description: "Lets the entity that has the power move through blocks."
navigation_title: "Phasing"
---

Lets the entity that has the power phase, meaning move, through blocks.

Type ID: `apoli:phasing`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `blacklist` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If `true`, `block_condition` lists the blocks the entity can't move through. |
| `block_condition` | [Block Condition Type](/docs/datapack/block-conditions) | _optional_ | If set, the entity can only move through blocks that pass this condition, or through every block except those, depending on `blacklist`. |
| `render_type` | [String](/docs/datapack/data-types/string) | `"blindness"` | How the surroundings render while phasing: `"blindness"`, `"remove_blocks"` or `"none"`. |
| `view_distance` | [Float](/docs/datapack/data-types/float) | `10.0` | How far the player can see through walls while phasing with `render_type` set to `"blindness"`. |
| `phase_down_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set, the entity can only phase downwards while this condition passes. |

## Examples

```json
{
  	"type": "apoli:phasing",
  	"blacklist": true,
  	"render_type": "blindness",
  	"view_distance": 10,
  	"block_condition": {
    	"type": "apoli:in_tag",
    	"tag": "origins:unphasable"
  	},
  	"phase_down_condition": {
    	"type": "apoli:and",
    	"conditions": [
      		{
        		"type": "apoli:sneaking"
      		},
      		{
        		"type": "apoli:on_block"
      		}
    	]
  	}
}
```

This lets the player phase through every block except those in the `origins:unphasable` block tag, which Origins ships in `data/origins/tags/block/unphasable.json`. The player can also phase down while sneaking, stopping briefly at each block so they don't take fall damage.
