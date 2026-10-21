---
title: "Bonemeal (Block Action Type)"
description: "Uses bone meal on the block, as if a dispenser or a player had used Bone Meal on it."
navigation_title: "Bonemeal"
---

Uses bone meal on the block, as if a dispenser or a player had used a Bone Meal item on it.

Type ID: `apoli:bonemeal`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `effects` | [Boolean](/docs/datapack/data-types/boolean) | `true` | Whether the particles and other visual effects of using bone meal appear. |

## Examples

```json
"block_action": {
    "type": "apoli:bonemeal",
    "effects": false
}
```

This uses bone meal on the block without the visual effects.
