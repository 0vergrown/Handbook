---
title: "Delay (Meta Action Type)"
description: "Executes the provided action after a set amount of ticks."
navigation_title: "Delay"
---

Executes the provided action after a set amount of ticks.

Type ID: `apoli:delay`

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`action` | Action Type | | The action which will be executed after the delay.
`ticks` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | | The amount of ticks until the action is executed. `0` or less runs it straight away. An expression is worked out once, when the delay starts — see [Expressions](#expressions).

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

## Expressions

`ticks` can be an [Expression](/docs/datapack/data-types/expression), worked out when the delay starts. Its variables read the entity the action runs on — the actor, in a bi-entity action; the entity that caused a block action; the holder of the item, in an item action.

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
