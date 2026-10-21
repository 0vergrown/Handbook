---
title: "Exhaust (Entity Action Type)"
description: "Adds exhaustion to a player, which drains saturation and then hunger."
navigation_title: "Exhaust"
---

Adds exhaustion to the player, which drains saturation and then hunger.

Type ID: `apoli:exhaust`

> [!NOTE]
> This action only works on players.

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | [Float](/docs/datapack/data-types/float) or [Expression](/docs/datapack/data-types/expression) | _required_ | How much exhaustion to add. |

## Examples

```json
"entity_action": {
    "type": "apoli:exhaust",
    "amount": 0.4
}
```

This adds 0.4 exhaustion, about the same as jumping 8 times without sprinting.
