---
title: "Modify Jump (Power Type)"
description: "Modifies how high the entity that has the power can jump."
navigation_title: "Modify Jump"
---

Modifies how high the entity that has the power can jump.

Type ID: `apoli:modify_jump`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`modifier` | Attribute Modifier | _optional_ | If specified, this modifier will be applied to the upwards velocity.
`modifiers` | Array of Attribute Modifiers | _optional_ | If specified, these modifiers will be applied to the upwards velocity.
`entity_action` | Entity Action Type | _optional_ | If specified, this action will be executed on the entity that has the power whenever the entity jumps.

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

This example will increase the entity that has the power's jump height to 4 blocks and display a cloud particle at the entity's feet upon jumping.
