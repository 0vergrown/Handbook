---
title: "apoli:climbing"
description: "Allows the entity that has the power to climb."
---

Allows the entity that has the power to climb.

Type ID: `apoli:climbing`

> To have the usual climbing effect, it is recommended to check for the Collided Horizontally (Entity Condition Type) inside the `condition` object of the power.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`allow_holding` | [Boolean](/docs/datapack/data-types/boolean) | `true` | If `true`, the entity that has the power is able to hold onto blocks.
`hold_condition` | Entity Condition Type | _optional_ | If specified and `allow_holding` is `true`, the entity that has the power will be able to 'hold onto the block' (not affected by gravity) if this condition is fulfilled, otherwise, defaults to if the entity is sneaking.

## Examples

```json
{
    "type": "apoli:climbing",
    "condition": {
		"type": "apoli:in_block_anywhere",
		"block_condition": {
			"type": "apoli:in_tag",
			"tag": "apoli:cobwebs"
		}
    },
    "hold_condition": {
		"type": "apoli:in_block_anywhere",
		"block_condition": {
			"type": "apoli:in_tag",
			"tag": "apoli:cobwebs"
		}
    }
}
```

This example will allow the entity to climb in cobwebs and hold onto them by sneaking.

