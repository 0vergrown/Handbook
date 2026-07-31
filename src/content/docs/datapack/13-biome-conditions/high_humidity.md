---
title: "High Humidity (Biome Condition Type)"
description: "Checks whether the biome counts as an area with high humidity (downfall value of > 0.85)."
navigation_title: "High Humidity"
---

Checks whether the biome counts as an area with high humidity (downfall value of > 0.85).

> If you want functional equality to fire burning out quicker (which was defined via this value in previous Minecraft versions), you should check for the biome tag `minecraft:increased_fire_burnout` with an [In Tag (Biome Condition Type](/docs/datapack/entity-conditions/in_tag) instead.

Type ID: `apoli:high_humidity`

## Fields

_None._

## Examples

```json
"biome_condition": {
    "type": "apoli:high_humidity"
}
```
