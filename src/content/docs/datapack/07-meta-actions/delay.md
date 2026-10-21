---
title: "Delay (Meta Action Type)"
description: "Runs an action after a number of ticks."
navigation_title: "Delay"
---

Runs an action after a number of ticks.

Type ID: `apoli:delay`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | Action type | _required_ | The action to run after the delay. |
| `ticks` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | _required_ | How many ticks to wait before running the action. `0` or less runs it straight away. An expression is worked out once, when the delay starts (see [Expressions](#expressions)). |

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

This gives Speed II after 1 second.

## Expressions

`ticks` can be an [expression](/docs/datapack/data-types/expression), worked out when the delay starts. Its variables read the entity the action runs on: the actor in a bi-entity action, the entity that caused a block action, and the holder of the item in an item action.

```json
"entity_action": {
    "type": "apoli:delay",
    "ticks": "rUnid(10, 40)",
    "action": {
        "type": "apoli:play_sound",
        "sound": "minecraft:entity.lightning_bolt.thunder"
    }
}
```

The thunder rolls somewhere between half a second and two seconds later, different every time.
