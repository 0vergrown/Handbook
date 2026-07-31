---
title: "Execute Command (Entity Action Type)"
description: "Executes a command with the entity as the source (i.e."
navigation_title: "Execute Command"
---

Executes a command with the entity as the source (i.e. `@s` will select the entity itself).

Type ID: `apoli:execute_command`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`command` | [String](/docs/datapack/data-types/string) |  | The command to execute on the entity.

## Examples

```json
"entity_action": {
    "type": "apoli:execute_command",
    "command": "tellraw @a {\"text\": \"Hello world!\", \"color\": \"green\"}"
}
```

This example will execute a `/tellraw` command that will print a green-colored "Hello world!" message to all players.
