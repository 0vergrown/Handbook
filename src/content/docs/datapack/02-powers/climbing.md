---
title: "Climbing (Power Type)"
description: "Lets the entity that has the power climb."
navigation_title: "Climbing"
---

Lets the entity that has the power climb.

Type ID: `apoli:climbing`

> [!TIP]
> To climb walls the usual way, put an [`apoli:collided_horizontally`](/docs/datapack/entity-conditions/collided_horizontally) check in the power's `condition`.

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `allow_holding` | [Boolean](/docs/datapack/data-types/boolean) | `true` | If `true`, the entity can hold onto the block it is climbing. |
| `hold_condition` | [Entity Condition Type](/docs/datapack/entity-conditions) | _optional_ | If set and `allow_holding` is `true`, the entity holds onto the block (gravity stops pulling it down) while this condition passes. Without it, the entity holds on while sneaking. |

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

This lets the entity climb inside cobwebs. The `hold_condition` is the same cobweb check, so the entity holds its position whenever it is in a cobweb.
