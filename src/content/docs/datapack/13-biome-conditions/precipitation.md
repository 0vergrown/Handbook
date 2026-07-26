---
title: "origins:precipitation"
description: "[Biome Condition Type](../biomeconditiontypes.md)"
---

Biome Condition Type

Checks for the precipitation type of the biome the entity is currently in.

Type ID: `origins:precipitation`


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`precipitation` | String | |  Which precipitation the biome has to have in order to succeed the check. Accepts `"none"`, `"rain"` or `"snow"`. Due to limitations with the system, this will check precipitation at a world height of 64.


## Examples

```json
"condition": {
    "type": "origins:biome",
    "condition": {
        "type": "origins:precipitation",
        "precipitation": "snow"
    }
}
```

This example will check if the biome the entity is currently in has a snowy precipitation. (e.g: `minecraft:snowy_taiga`, `minecraft:ice_spikes`, etc.)

