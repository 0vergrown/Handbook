---
title: "Prevent Elytra Flight (Power Type)"
description: "Stops the entity from gliding with an Elytra or with apoli:elytra_flight."
navigation_title: "Prevent Elytra Flight"
---

Stops the entity that has the power from gliding, whether with an Elytra item or with a power that uses [apoli:elytra_flight](/docs/datapack/powers/elytra_flight).

Type ID: `apoli:prevent_elytra_flight`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the entity when it tries to glide with an Elytra or with a power that uses [apoli:elytra_flight](/docs/datapack/powers/elytra_flight). |

## Examples

```json
{
    "type": "apoli:prevent_elytra_flight",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "tellraw @s {\"text\": \"You cannot glide from this height!\", \"color\": \"red\"}"
    },
    "condition": {
        "type": "apoli:in_block",
        "block_condition": {
            "type": "apoli:height",
            "comparison": "<=",
            "compare_to": 64
        }
    }
}
```

This shows a warning and stops the entity from gliding while it is at Y=64 or lower.
