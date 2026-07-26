---
title: "Food Component"
description: "An Object which defines a new food component."
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
`effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) | _optional_ | A status effect and the chance of it triggering upon consuming something with this food component.
`effects` | Array of Status Effect Instances | _optional_ | A status effect and the chance of it triggering upon consuming something with this food component.

## Examples

```json
"food_component": {
    "hunger": 4,
    "saturation": 1.0
}
```

A food component that recovers 4 hunger and 8 saturation points.

