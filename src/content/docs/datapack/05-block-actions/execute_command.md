---
title: "apoli:execute_command"
description: "Executes a command at the position of the block."
---

Executes a command at the position of the block.

Type ID: `apoli:execute_command`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`command` | String |  | The command to execute.


## Examples

```json
"block_action": {
    "type": "apoli:execute_command",
    "command": "summon minecraft:item ~ ~ ~ {Item:{id:\"minecraft:wheat\",Count:1}}"
}
```

This example will summon a Wheat item entity at the position of the block action type.

