---
title: "Bonemeal (Block Action Type)"
description: "Applies bone meal to the target block as if a dispenser or a player used a Bone Meal item to it."
navigation_title: "Bonemeal"
---

Applies bone meal to the target block as if a dispenser or a player used a Bone Meal item to it.

Type ID: `apoli:bonemeal`

## Fields

Field | Type | Default | Description
------|------|---------|------------
`effects` | Boolean | `true` | Determines if the particle and other visual effects of the bonemeal-ing action should appear.

## Examples

```json
"block_action": {
    "type": "apoli:bonemeal",
    "effects": false
}
```

This example will apply bonemeal to the target block of the block action without the visual effects.
