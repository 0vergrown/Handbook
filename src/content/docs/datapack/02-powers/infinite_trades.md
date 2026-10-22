---
title: "Infinite Trades (Power Type)"
description: "Trades the player makes don't use up the merchant's offer, so it never runs out of stock for them."
navigation_title: "Infinite Trades"
---

Trades the player with the power makes don't use up the merchant's offer, so villagers and wandering traders never run out of stock for them.

Type ID: `apoli:infinite_trades`

## Fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `bientity_condition` | [Bi-entity Condition Type](/docs/datapack/bientity-conditions) | _optional_ | If set, the power only applies to merchants that pass this condition. The actor is the player and the target is the merchant. |

## How it behaves

The offer keeps the use count it had before the trade, and the player's screen is refreshed right away so the offer never shows as sold out. Everything else about the trade happens as usual: the villager still gains trading experience, can level up and rewards the player with experience orbs.

Trades made by other players still count toward the offer's limit. Because the player's trades never raise the use count, they don't push the offer's price up when the villager restocks either.

## Examples

```json
{
    "type": "apoli:infinite_trades",
    "bientity_condition": {
        "type": "apoli:target_condition",
        "condition": {
            "type": "apoli:entity_type",
            "entity_type": "minecraft:wandering_trader",
            "inverted": true
        }
    }
}
```

Villagers never run out of stock for the player, while wandering traders still sell out as usual.
