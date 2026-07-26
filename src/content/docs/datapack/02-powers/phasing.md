---
title: "apoli:phasing"
description: "Allows the entity that has the power to 'phase' (move) through blocks."
---

Allows the entity that has the power to "phase" (move) through blocks.

Type ID: `apoli:phasing`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`blacklist` | [Boolean](/docs/datapack/data-types/boolean) | `false` | If set to true, the `block_condition` field will define which blocks the player can **NOT** move through.
`block_condition` | Block Condition Type (Data Type) | _optional_ | If specified, the entity will only be able to move through these blocks (or **not** be able to move through these, depending on what `blacklist` is set to).
`render_type` | [String](/docs/datapack/data-types/string) | `"blindness"` | Determines how the environment is rendered when "phasing" through (moving) blocks. Accepts `"blindness"`, `"remove_blocks"` or `"none"`.
`view_distance` | [Float](/docs/datapack/data-types/float) | `10.0` | Determines how far the player can look through walls when "phasing" (moving) through blocks when `render_type` is set to `"blindness"`.
`phase_down_condition` | Entity Condition Type (Data Type) | _optional_ | If specified, the entity will only be able to "phase" (move) downwards if this condition is fulfilled.

## Examples

```json
{
  	"type": "apoli:phasing",
  	"blacklist": true,
  	"render_type": "blindness",
  	"view_distance": 10,
  	"block_condition": {
    	"type": "apoli:in_tag",
    	"tag": "apoli:unphasable"
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

This example will allow the player to phase through all blocks except for those in the `origins:unphasable` (`data/origins/tags/blocks/unphasable.json`) block tag. They can also phase down while sneaking, but will make a short stop at each block so they don't take fall damage.

