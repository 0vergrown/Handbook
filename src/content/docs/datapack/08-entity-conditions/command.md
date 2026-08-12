---
title: "Command (Entity Condition Type)"
description: "Compares the result of the specified command to the specified value."
navigation_title: "Command"
---

Compares the result of the specified command to the specified value.

Type ID: `apoli:command`

> This entity condition type only operates on the **server-side**, meaning that it cannot be used in fields that are evaluated on the client-side.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`command` | String | |  The command to execute.
`comparison` | Comparison | | Determines how the result value (an integer) of the executed command should be compared to the specified value.
`compare_to` | Integer | | The value at which the result value (an integer) of the executed command will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:command",
    "command": "execute if score @s objective1 = @s objective2",
    "comparison": "==",
    "compare_to": 1
}
```
This example will check if the entity has the same score in the `objective1` and `objective2` scoreboard objectives.

```json
"condition": {
    "type": "apoli:command",
    "command": "execute if entity @e[type = #minecraft:skeletons, distance = ..64]",
    "comparison": ">=",
    "compare_to": 4
}
```

This example will check if there are 4 or more entities that are included in the `#minecraft:skeletons` (`data/minecraft/tags/entity_types/skeletons.json`) entity type tag within a 64 blocks spherical radius relative to the entity.
