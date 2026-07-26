---
title: "origins:temperature"
description: "[Biome Condition Type](../biomeconditiontypes.md)"
---

Biome Condition Type

Checks for the temperature of the biome the entity is currently in.

Type ID: `origins:temperature`

> You can visit [Minecraft Wiki: Biome (List of Overworld climates)](https://minecraft.wiki/w/Biome#List_of_Overworld_climates) for a list of temperature values for the vanilla biomes.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`comparison` | Comparison | | Determines how the temperature value of the biome should be compared to the specified value.
`compare_to` | Float | | The value at which the temperature value of the biome will be compared to.


## Examples

```json
"condition": {
    "type": "origins:biome",
    "condition": {
        "type": "origins:temperature",
        "comparison": ">=",
        "compare_to": 2
    }
}
```

This example will check if the biome the entity is currently in has a temperature of 2 or more. (e.g: `minecraft:badlands`, `minecraft:desert`, etc.)

