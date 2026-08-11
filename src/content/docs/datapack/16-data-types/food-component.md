---
title: "Food Component (Data Type)"
description: "An Object which defines a new food component."
navigation_title: "Food Component"
---

An [Object](/docs/datapack/data-types/object) which defines a new food component.

> The actual food saturation level is determined by the `food * saturation * 2` formula.

## Fields

Field  | Type | Default | Description
-------|-----|---------------|-------------
`hunger` | Integer | | The amount of hunger shanks the food component recovers upon consumption.
`saturation` | Float | | The amount of saturation to give the player upon consumption.
`meat` | Boolean | `false` | Whether this food component counts as meat or not.
`always_edible` | Boolean | `false` | Whether this food component is edible at full hunger or not.
`snack` | Boolean | `false` | Whether this food component takes as long as dried kelp to eat (16 ticks) or not (32 ticks).
`effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) + `chance` | _optional_ | A status effect applied on consumption, plus the chance of it being applied.
`effects` | Array of the above | _optional_ | Several status effects applied on consumption, each with its own chance.

Every field of a [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) is written directly inside `effect`, alongside one extra field that only exists here:

Field  | Type | Default | Description
-------|-----|---------------|-------------
`chance` | Float | `1.0` | The probability that the effect is applied, from `0.0` (never) to `1.0` (always).

## Examples

```json
"food_component": {
    "hunger": 4,
    "saturation": 1.0
}
```

A food component that recovers 4 hunger and 8 saturation points.

```json
"food_component": {
    "hunger": 2,
    "saturation": 0.3,
    "meat": true,
    "effect": {
        "effect": "minecraft:hunger",
        "duration": 600,
        "amplifier": 0,
        "chance": 0.3
    }
}
```

Raw-chicken-like food: it applies Hunger for 30 seconds 30% of the time.
