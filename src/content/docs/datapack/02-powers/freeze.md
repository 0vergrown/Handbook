---
title: "Freeze (Power Type)"
description: "Freezes the entity that has the power, as if they're in a Powder Snow block."
navigation_title: "Freeze"
---

Freezes the entity that has the power, as if they're in a Powder Snow block.

Type ID: `apoli:freeze`

## Fields

_None._

## Examples

```json
{
    "type": "apoli:freeze"
}
```

This example will freeze the entity that has the power.

```json
{
    "type": "apoli:freeze",
    "condition": {
        "type": "apoli:biome",
        "condition": {
            "type": "apoli:precipitation",
            "precipitation": "snow"
        }
    }
}
```

This example will freeze the entity that has the power if the entity is in a biome that snows.
