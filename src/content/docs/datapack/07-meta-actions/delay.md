---
title: "apoli:delay"
description: "Executes the provided action after a set amount of ticks."
---

Executes the provided action after a set amount of ticks.

Type ID: `apoli:delay`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Action Type | | The action which will be executed after the delay.
`ticks` | [Integer](/docs/datapack/data-types/integer) | | The amount of ticks until the action is executed.


## Examples

```json
"entity_action": {
    "type": "apoli:delay",
    "ticks": 20,
    "action": {
        "type": "apoli:apply_effect",
        "effect": {
            "effect": "minecraft:speed",
            "amplifier": 1,
            "duration": 80
        }
    }
}
```
This example will apply a Speed II status effect after 1 second.

