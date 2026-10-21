---
title: "Food Component (Data Type)"
description: "An object that describes food: how much it restores, how fast it is eaten and the effects it gives."
navigation_title: "Food Component"
---

An [Object](/docs/datapack/data-types/object) that describes a food component: how much it restores, how fast it is eaten and the effects it gives.

> [!NOTE]
> The saturation the player gets is worked out as `food * saturation * 2`.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `hunger` | [Integer](/docs/datapack/data-types/integer) | _required_ | How many hunger points the food restores. `nutrition` is accepted as an alias. |
| `saturation` | [Float](/docs/datapack/data-types/float) | _required_ | The saturation value of the food, used in the formula above. |
| `meat` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the food counts as meat. |
| `always_edible` | [Boolean](/docs/datapack/data-types/boolean) | `false` | Whether the food can be eaten at full hunger. `can_always_eat` is accepted as an alias. |
| `snack` | [Boolean](/docs/datapack/data-types/boolean) | `false` | A shorthand for `"eat_seconds": 0.8`, as quick to eat as dried kelp. Ignored when `eat_seconds` is given. |
| `eat_seconds` | [Float](/docs/datapack/data-types/float) | `1.6` | How long the food takes to eat, in seconds. `1.6` is vanilla's normal speed, and `0.8` matches `snack`. |
| `effect` | [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) plus `chance` | _optional_ | A status effect applied when the food is eaten, plus the chance of it applying. |
| `effects` | Array of the above | _optional_ | Several status effects applied when the food is eaten, each with its own chance. |

Every field of a [Status Effect Instance](/docs/datapack/data-types/status-effect-instance) is written directly inside `effect`, along with one extra field that only exists here:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `chance` | [Float](/docs/datapack/data-types/float) | `1.0` | The probability that the effect applies, from `0.0` (never) to `1.0` (always). |

### Legacy spellings

Food components can be written three ways, and all of them parse, so older data packs don't need converting:

| Legacy | Current | Notes |
| --- | --- | --- |
| `hunger` | `hunger` or `nutrition` | Both names read the same field. |
| `always_edible` | `always_edible` or `can_always_eat` | Both names read the same field. |
| `snack: true` | `snack: true` or `eat_seconds: 0.8` | `snack` still works, and `eat_seconds` wins if both are present. |
| `"effect": { "effect": {…}, "probability": 1.0 }` | `"effect": { …, "chance": 1.0 }` | The nested form, a Status Effect Instance under `effect` with `probability` beside it, is still accepted. In the current flat form the effect's own fields sit directly in `effect`, and the probability is called `chance`. |
| `"effect": "minecraft:x"` inside the instance | `"id": "minecraft:x"` | Both spellings of the effect ID work (see [Status Effect Instance](/docs/datapack/data-types/status-effect-instance)). |

## Examples

```json
"food_component": {
    "hunger": 4,
    "saturation": 1.0
}
```

Food that restores 4 hunger and 8 saturation points.

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

Food like raw chicken, which gives Hunger for 30 seconds 30% of the time.

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

The same kind of component written with the vanilla-style field names and the nested effect form. Both this and the flat form above load.
