---
title: "Temperature (Biome Condition Type)"
description: "Checks for the temperature of the biome the entity is currently in."
navigation_title: "Temperature"
---

Checks for the temperature of the biome the entity is currently in.

Type ID: `apoli:temperature`

> You can visit [Minecraft Wiki: Biome (List of Overworld climates)](https://minecraft.wiki/w/Biome#List_of_Overworld_climates) for a list of temperature values for the vanilla biomes.

## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the temperature value of the biome should be compared to the specified value.
`compare_to` | Float | | The value at which the temperature value of the biome will be compared to.

## Examples

```json
"condition": {
    "type": "apoli:biome",
    "condition": {
        "type": "apoli:temperature",
        "comparison": ">=",
        "compare_to": 2
    }
}
```

This example will check if the biome the entity is currently in has a temperature of 2 or more. (e.g: `minecraft:badlands`, `minecraft:desert`, etc.)
