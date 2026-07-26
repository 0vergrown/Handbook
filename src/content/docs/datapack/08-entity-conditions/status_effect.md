---
title: "apoli:status_effect"
description: "Checks whether the entity has a specified status effect with a specified amplifier, and/or duration range."
---

Checks whether the entity has a specified status effect with a specified amplifier, and/or duration range.

Type ID: `apoli:status_effect`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`effect` | [Identifier](/docs/datapack/data-types/identifier) | | The namespace and ID of the status effect to check for.
`min_amplifier` | [Integer](/docs/datapack/data-types/integer) | `0` | The minimum amplifier the status effect should have in order to pass the check.
`max_amplifier` | [Integer](/docs/datapack/data-types/integer) | `2147483647` | The maximum amplifier the status effect should have in order to pass the check.
`min_duration` | [Integer](/docs/datapack/data-types/integer) | `-1` | The minimum duration in ticks the status effect should have left in order to pass the check.
`max_duration` | [Integer](/docs/datapack/data-types/integer) | `2147483647` | The maximum duration in ticks the status effect should have left in order to pass the check.


## Examples

```json
"condition": {
    "type": "apoli:status_effect",
    "effect": "minecraft:speed",
    "min_amplifier": 1
}
```

This example will check if the entity has the Speed II status effect.
