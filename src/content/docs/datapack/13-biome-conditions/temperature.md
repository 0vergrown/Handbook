---
title: "Temperature (Biome Condition Type)"
description: "Compares the biome's temperature with a number."
navigation_title: "Temperature"
---

Compares the biome's temperature with a number.

Type ID: `apoli:temperature`

> [!TIP]
> [Minecraft Wiki: Biome (List of Overworld climates)](https://minecraft.wiki/w/Biome#List_of_Overworld_climates) lists the temperature of each vanilla biome.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `comparison` | [Comparison](/docs/datapack/data-types/comparison) | _required_ | How the temperature is compared with `compare_to`. |
| `compare_to` | [Float](/docs/datapack/data-types/float) | _required_ | The number the temperature is compared with. |

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

This checks whether the biome the entity is in has a temperature of 2 or more, as `minecraft:badlands` and `minecraft:desert` do.
