---
title: "Status Effect Instance"
description: "An Object used to define a status effect with duration, amplifier, etc."
---

An [Object](/docs/datapack/data-types/object) used to define a status effect with duration, amplifier, etc.

> **NOTE**: To make the Status Effect Instance infinite, you can set the value of `duration` to `-1`.

> **ALIASES (1.21.1):** Apace renamed `effect` → `id` and `is_ambient` → `ambient` to match vanilla. Both spellings are accepted, so data packs from either era load unchanged.

## Fields
Field  | Type | Default | Description
-------|-----|---------------|-------------
`effect` | [Identifier](/docs/datapack/data-types/identifier) | | The identifier of the status effect. _Alias: `id`._
`duration` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `100` | Determines the duration of the status effect (in ticks). An Expression is evaluated against the entity the effect is applied to, at application time.
`amplifier` | [Integer](/docs/datapack/data-types/integer) or [Expression](/docs/datapack/data-types/expression) | `0` | Determines the strength of the status effect (0 being level 1). Accepts an Expression like `duration`.
`is_ambient` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Determines whether the particle effects of the status effect is less noticeable. _Alias: `ambient`._
`show_particles` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Determines whether the status effect should display particle effects on the entity.
`show_icon` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Determines whether the status effect would display an icon on the HUD.

## Examples

```json
"effect": {
    "effect": "minecraft:slowness",
    "amplifier": 1,
    "duration": -1
}
```
A Slowness II status with an infinite duration.

```json
"effect": {
    "effect": "minecraft:levitation",
    "duration": 200,
    "is_ambient": true,
    "show_particles": true,
    "show_icon": false
}
```
An ambient and mostly hidden status effect of Levitation I which lasts for 10 seconds.

```json
"effects": [
    {
        "effect": "minecraft:slow_falling",
        "duration": 400,
        "is_ambient": false,
        "show_particles": false,
        "show_icon": true
    },
    {
        "effect": "minecraft:slowness",
        "duration": 400,
        "is_ambient": false,
        "show_particles": false,
        "show_icon": true
    }
]
```
An [Array](/docs/datapack/data-types/array) of status effect instances with the Slowness I and Slow Falling I status effects that lasts for 20 seconds.

```json
"effect": {
    "effect": "minecraft:speed",
    "duration": "100 + health * 10",
    "amplifier": "clamp(my_pack:mana / 10, 0, 3)"
}
```
Speed whose duration scales with the target's current health and whose level is driven by a [apoli:resource](/docs/datapack/powers/resource) value, capped at Speed IV.
