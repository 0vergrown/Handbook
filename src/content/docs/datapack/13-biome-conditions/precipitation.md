---
title: "Precipitation (Biome Condition Type)"
description: "Checks whether the biome gets rain, snow or nothing."
navigation_title: "Precipitation"
---

Checks what kind of precipitation the biome has: rain, snow or none.

Type ID: `apoli:precipitation`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `precipitation` | [String](/docs/datapack/data-types/string) | _required_ | The precipitation the biome must have: `"none"`, `"rain"` or `"snow"`. Because of how the check works, precipitation is read at a world height of 64. |

## Examples

```json
"condition": {
    "type": "apoli:biome",
    "condition": {
        "type": "apoli:precipitation",
        "precipitation": "snow"
    }
}
```

This checks whether the biome the entity is in gets snow, as `minecraft:snowy_taiga` and `minecraft:ice_spikes` do.
