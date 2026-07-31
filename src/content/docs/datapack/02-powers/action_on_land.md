---
title: "Action On Land (Power Type)"
description: "Executes an Entity Action Type when the player lands on the ground after being airborne."
navigation_title: "Action On Land"
---

Executes an Entity Action Type when the player lands on the ground after being airborne.

Type ID: `apoli:action_on_land`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`entity_action` | Entity Action Type | | The action to execute on the player.

## Examples

```json
{
    "type": "apoli:action_on_land",
    "entity_action": {
        "type": "apoli:execute_command",
        "command": "fill ~1 ~-1 ~1 ~-1 ~-1 ~-1 minecraft:air replace minecraft:grass_block"
    },
    "condition": {
        "type": "apoli:fall_distance",
        "comparison": ">",
        "compare_to": 4
    }
}
```

This example will execute an [apoli:execute_command](/docs/datapack/entity-actions/execute_command) that will then execute a `/fill` command that will replace a 3x3 area of Grass Blocks with Air underneath the entity's feet if the entity in question has been falling for 4 or more blocks.
