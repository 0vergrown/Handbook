---
title: "apoli:exhaust"
description: "Applies exhaustion to the entity, reducing saturation and hunger."
---

Applies exhaustion to the entity, reducing saturation and hunger.

Type ID: `apoli:exhaust`

> This entity action type will only work on players.


## Fields

Field  | Type | Default | Description
-------|------|---------|-------------
`amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) |  | The amount of exhaustion to apply to the player.


## Examples

```json
"entity_action": {
    "type": "apoli:exhaust",
    "amount": 0.4
}
```

This example will apply 0.4 exhaustion to the player, which is similar in effect to jumping 8 times (without sprinting).
