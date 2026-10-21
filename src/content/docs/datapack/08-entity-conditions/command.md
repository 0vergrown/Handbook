---
title: "Command (Entity Condition Type)"
description: "Runs a command and compares its result with a number."
navigation_title: "Command"
---

Runs a command and compares its result with a number.

Type ID: `apoli:command`

> [!WARNING]
> This condition only works on the server, so it can't be used in fields that are evaluated on the client.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `command` | [String](/docs/datapack/data-types/string) | _required_ | The command to run. |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the command's result, an integer, is compared with `compare_to`. |
| `compare_to` | [Integer](/docs/datapack/data-types/integer) | _required_ | The number the result is compared with. |

## Examples

```json
"condition": {
    "type": "apoli:command",
    "command": "execute if score @s objective1 = @s objective2",
    "comparison": "==",
    "compare_to": 1
}
```

This checks whether the entity has the same score in the `objective1` and `objective2` scoreboard objectives.

```json
"condition": {
    "type": "apoli:command",
    "command": "execute if entity @e[type = #minecraft:skeletons, distance = ..64]",
    "comparison": ">=",
    "compare_to": 4
}
```

This checks whether there are 4 or more entities from the `#minecraft:skeletons` entity type tag (`data/minecraft/tags/entity_types/skeletons.json`) within 64 blocks of the entity.
