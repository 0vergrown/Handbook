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
`hunger` | Integer | | The amount of hunger shanks the food component recovers upon consumption. Also accepted as `nutrition`.
`saturation` | Float | | The amount of saturation to give the player upon consumption.
`meat` | Boolean | `false` | Whether this food component counts as meat or not.
`always_edible` | Boolean | `false` | Whether this food component is edible at full hunger or not. Also accepted as `can_always_eat`.
`snack` | Boolean | `false` | Shorthand for `"eat_seconds": 0.8` — as quick to eat as dried kelp. Ignored when `eat_seconds` is given.
`eat_seconds` | Float | `1.6` | How long the food takes to eat, in seconds. `1.6` is vanilla's normal speed; `0.8` matches `snack`.
`effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) + `chance` | _optional_ | A status effect applied on consumption, plus the chance of it being applied.
`effects` | Array of the above | _optional_ | Several status effects applied on consumption, each with its own chance.

Every field of a [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) is written directly inside `effect`, alongside one extra field that only exists here:

Field  | Type | Default | Description
-------|-----|---------------|-------------
`chance` | Float | `1.0` | The probability that the effect is applied, from `0.0` (never) to `1.0` (always).

### Legacy spellings

Food components have been written three different ways across Apoli's history, and all three still parse — you do not have to convert an older data pack:

Legacy | Current | Notes
-------|---------|------
`hunger` | `hunger` or `nutrition` | Both names read the same field.
`always_edible` | `always_edible` or `can_always_eat` | Both names read the same field.
`snack: true` | `snack: true` or `eat_seconds: 0.8` | `snack` is still honoured; `eat_seconds` wins if both are present.
`"effect": { "effect": {…}, "probability": 1.0 }` | `"effect": { …, "chance": 1.0 }` | The nested form (a Status Effect Instance under `effect`, with `probability` beside it) is still accepted. In the current flat form the effect's own fields sit directly in `effect` and the probability is called `chance`.
`"effect": "minecraft:x"` inside the instance | `"id": "minecraft:x"` | Both spellings of the effect id work — see [Status Effect Instance](/docs/datapack/data-types/status-effect-instance).

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

```json
"food_component": {
    "nutrition": 4,
    "saturation": 0.04,
    "can_always_eat": true,
    "eat_seconds": 0.8,
    "effect": {
        "effect": {
            "id": "minecraft:jump_boost",
            "duration": 200,
            "amplifier": 2
        },
        "probability": 1.0
    }
}
```

The same component written with the newer vanilla-style field names and the nested effect form. Both this and the flat form above load.
