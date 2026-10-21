---
title: "Modify Jump (Power Type)"
description: "Changes how high the entity that has the power can jump."
navigation_title: "Modify Jump"
---

Changes how high the entity that has the power can jump.

Type ID: `apoli:modify_jump`

## Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `modifier` | [Attribute Modifier](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, this modifier is applied to the upward velocity of the jump. |
| `modifiers` | [Array](/docs/datapack/data-types/array) of [Attribute Modifiers](/docs/datapack/data-types/attribute-modifier) | _optional_ | If set, these modifiers are applied to the upward velocity of the jump. |
| `entity_action` | [Entity Action Type](/docs/datapack/entity-actions) | _optional_ | If set, this action runs on the entity with the power every time it jumps. |

## Examples

```json
{
    "type": "apoli:modify_jump",
    "modifier": {
        "operation": "addition",
        "value": 0.4
    },
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "particle cloud ~ ~ ~ 0.3 0.3 0.3 0.01 16 normal @a"
    }
}
```

This raises the entity's jump height to about 4 blocks and shows cloud particles at its feet when it jumps.
